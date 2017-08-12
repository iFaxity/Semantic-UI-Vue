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
    let show, hide, duration = props.duration;

    if (data && data.on) {
      show = data.on.show;
      hide = data.on.hide;
    }

    // Modify the props and events to pass on to the vue transition component
    data.props = {
      type: "animation",
      enterActiveClass: `animating ${props.name} in`,
      leaveActiveClass: `transition animating ${props.name} out`
    };
    data.on = {
      beforeEnter(el) {
        el.classList.add("transition")
        el.classList.add("visible");
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
      },
      beforeLeave(el) {
        if (duration) {
          el.style.animationDuration = duration;
        }
      },
      afterLeave(el) {
        el.classList.remove("visible");
        if (duration) {
          el.style.animationDuration = "";
        }

        if (typeof hide === "function") {
          hide(el);
        }
      }
    };
    return h("transition", data, ctx.children);
  }
}
