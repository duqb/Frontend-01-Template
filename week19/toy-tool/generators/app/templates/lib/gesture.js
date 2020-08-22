export function enableGesture(element) {
  let context = Object.create(null);

  let MOUSE_SYMBOL = Symbol("mouse");

  if (document.ontouchstart !== null) {
    element.addEventListener("mousedown", () => {
      context[MOUSE_SYMBOL] = Object.create(null);
      start(event, context[MOUSE_SYMBOL]);
      let mousemove = (event) => {
        move(event, context[MOUSE_SYMBOL]);
      };
      let mouseend = (event) => {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseend);
        end(event, context[MOUSE_SYMBOL]);
        delete context[MOUSE_SYMBOL]; 
      };
      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseend);
    });
  }

  element.addEventListener("touchstart", (event) => {
    for (let touch of event.changedTouches) {
      context[touch.identifier] = Object.create(null);
      start(touch, context[touch.identifier]);
    }
  });

  element.addEventListener("touchmove", (event) => {
    for (let touch of event.changedTouches) {
      move(touch, context[touch.identifier]);
    }
  });

  element.addEventListener("touchend", (event) => {
    for (let touch of event.changedTouches) {
      end(touch, context[touch.identifier]);
      delete context[touch.identifier];
    }
  });

  // 意外中断，如有系统消息、
  element.addEventListener("touchcancel", (event) => {
    for (let touch of event.changedTouches) {
      cancel(touch, context[touch.identifier]);
      delete context[touch.identifier];
    }
  });

  // tap
  // pan panstart panmove panend
  // flick
  // press pressstart pressend

  let start = (point, context) => {
    element.dispatchEvent(
      new CustomEvent("start", {
        detail: {
          startX: point.clientX,
          startY: point.clientY,
          clientX: point.clientX,
          clientY: point.clientY,
        },
      })
    );
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.moves = [];
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;

    context.timeoutHandler = setTimeout(() => {
      if (context.isPan) return;

      context.isTap = false;
      context.isPan = false;
      context.isPress = true;
      element.dispatchEvent(new CustomEvent("pressStart", {}));
    }, 500);
  };

  let move = (point, context) => {
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;

    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if (context.isPress) {
        element.dispatchEvent(new CustomEvent("pressCancel", {}));
      }
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;
      element.dispatchEvent(
        new CustomEvent("panStart", {
          detail: {
            startX: context.startX,
            startY: context.startX,
            clientX: point.clientX,
            clientY: point.clientY,
          },
        })
      );
    }

    if (context.isPan) {
      context.moves.push({ dx, dy, t: Date.now() });
      context.moves = context.moves.filter((record) => Date.now() - record.t < 300);

      element.dispatchEvent(
        new CustomEvent("panMove", {
          detail: {
            startX: context.startX,
            startY: context.startX,
            clientX: point.clientX,
            clientY: point.clientY,
          },
        })
      );
    }
  };

  let end = (point, context) => {
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;
    if (context.isPan) {
      let record = context.moves[0];
      let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);
      let isFlick = speed > 2.5;

      if (isFlick) {
        element.dispatchEvent(
          new CustomEvent("flick", {
            detail: {
              startX: context.startX,
              startY: context.startX,
              clientX: point.clientX,
              clientY: point.clientY,
              speed: speed,
            },
          })
        );
      }
      element.dispatchEvent(
        new CustomEvent("panEnd", {
          detail: {
            startX: context.startX,
            startY: context.startX,
            clientX: point.clientX,
            clientY: point.clientY,
            speed: speed,
            isFlick: isFlick,
          },
        })
      );
    }
    if (context.isTap) {
      element.dispatchEvent(new CustomEvent("tap", {}));
    }
    if (context.isPress) {
      element.dispatchEvent(new CustomEvent("pressEnd", {}));
    }

    clearTimeout(context.timeoutHandler);
  };

  let cancel = (point, context) => {
    element.dispatchEvent(new CustomEvent("canceled", {}));
    clearTimeout(context.timeoutHandler);
  };
}