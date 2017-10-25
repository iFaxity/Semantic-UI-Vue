import {TRANSITIONS} from "../constants";

export default {
  name: "UiTransition",
  functional: true,
  props: {
    name: {
      type: String,
      validator: value => TRANSITIONS.includes(value),
      default: "fade"
    },
    duration: String
  },
  render(h, ctx) {
    const {props, data} = ctx;
    let show, hide, showing, hidden;
    let duration = props.duration;

    if (data && data.on) {
      show = data.on.show;
      showing = data.on.showing;
      hide = data.on.hide;
      hidden = data.on.hidden;
    }

    // Modify the props and events to pass on to the vue transition component
    data.props = {
      type: "animation",
      enterActiveClass: `animating ${props.name} in`,
      leaveActiveClass: `transition animating ${props.name} out`,
      enterClass: null,
      leaveClass: null,
      enterToClass: null,
      leaveToClass: null
    };
    data.on = {
      beforeEnter(el) {
        el.classList.add("transition", "visible");
        if(duration) {
          el.style.animationDuration = duration;
        }
        
        if (typeof show === "function") {
          show(el);
        }
      },
      afterEnter(el) {
        if (duration) {
          el.style.animationDuration = "";
        }

        if (typeof showing === "function") {
          showing(el);
        }
      },
      beforeLeave(el) {
        if (duration) {
          el.style.animationDuration = duration;
        }

        if (typeof hide === "function") {
          hide(el);
        }
      },
      afterLeave(el) {
        el.classList.remove("visible");
        if (duration) {
          el.style.animationDuration = "";
        }

        if (typeof hidden === "function") {
          hidden(el);
        }
      }
    };
    return h("transition", data, ctx.children);
  }
}
