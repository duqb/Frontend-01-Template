export class Timeline {
  constructor() {
    this.animations = new Set();
    this.animationStartTimes = new Map();
    this.requestID = null;
    this.state = "initialed";
  }

  tick() {
    let t = Date.now() - this.startTime;
    for (let animation of this.animations) {
      let { object, property, template, duration, delay, timingFunction } = animation;

      let startTime = this.animationStartTimes.get(animation);
      if (t < delay + startTime) {
        continue;
      }

      let time = (t - delay - startTime) / duration;
      let progression = timingFunction(time); // 0 ~ 1 之间的一个数

      if (t - delay - startTime > duration) {
        progression = 1;
        this.animations.delete(animation);
      }

      let value = animation.valueFromProgression(progression);
      object[property] = template(value);
    }
    this.requestID = this.animations.size ? requestAnimationFrame(() => this.tick()) : null;
  }

  add(animation, addStartTime) {
    this.animations.add(animation);

    if (this.state === "playing") {
      this.animationStartTimes.set(animation, addStartTime !== void 0 ? addStartTime : Date.now() - this.startTime);
      // 处理所有动画已经播完了，但是新增了动画
      if (this.requestID === null) this.tick();
    } else {
      this.animationStartTimes.set(animation, addStartTime !== void 0 ? addStartTime : 0);
    }
  }

  start() {
    if (this.state !== "initialed") return;
    this.state = "playing";
    this.startTime = Date.now();
    this.tick();
  }

  pause() {
    if (this.state !== "playing") return;
    this.state = "paused";
    this.pauseTime = Date.now();
    if (this.requestID !== null) {
      cancelAnimationFrame(this.requestID);
      this.requestID = null;
    }
  }

  resume() {
    if (this.state !== "paused") return;
    this.state = "playing";
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  reset() {
    if (this.state === "playing") {
      this.pause();
    }
    this.animations.clear();
    this.animationStartTimes.clear();
    this.state = "initialed";
    this.requestID = null;
    this.startTime = Date.now();
    this.pauseTime = null;
  }
}

export class Animation {
  constructor(option) {
    let { object, property, template, start, end, duration, delay, timingFunction } = option;
    this.object = object;
    this.property = property;
    this.template = template;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    this.timingFunction = timingFunction;
  }

  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start);
  }
}

export class RGBAAnimation extends Animation {
  constructor(option) {
    super(option);
    let { template } = option;
    this.template = template || ((v) => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
  }

  valueFromProgression(progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a),
    };
  }
}
