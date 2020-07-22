import {createElement, Text, Wrapper} from "./createElement.js";
import { Carousel } from "./carousel.view";

// class Carousel {
//     constructor(config) {
//         this.children = [];
//         this.attributes = new Map();
//         this.properties = new Map();
//     }
//     setAttribute(name, value) { //attribute
//         this.attributes.set(name, value);
//     }
//     appendChild(child) {
//         this.children.push(child);
//     }
//     render() {
//         return <div class="carousel">
//             {this.data.map(url => {
//                 let element = <img src={url} />;
//                 element.addEventListener("dragstart", (event) =>
//                     event.preventDefault()
//                 );
//                 return element;
//             })}
//         </div>
//     }
//     mountTo(parent) {
//         this.render().mountTo(parent)
//     }
// }

/*let component = <div id="a" cls="b" style="width:100px;height:100px;background-color:lightgreen">
      <div></div>
      <p></p>
      <div></div>
      <div></div>
  </div>*/

let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]} />

component.mountTo(document.body);

/*
var component = createElement(
  Parent, 
  {
      id: "a",
      "class": "b"
  }, 
  createElement(Child, null), 
  createElement(Child, null), 
  createElement(Child, null)
);
*/

console.log(component);

//componet.setAttribute("id", "a");

