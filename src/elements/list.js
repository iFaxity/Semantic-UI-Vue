import { Size } from "../mixins";

export default {
  name: "UiList",
  mixins: [Size()],
  props: {
    bulleted: Boolean,
    ordered: Boolean,
    link: Boolean,

    horizontal: Boolean,
    inverted: Boolean,
    selection: Boolean,
    animated: Boolean,
    divided: Boolean,
    celled: Boolean,

    relaxed: String,
  },
  computed: {
    getRelaxed() {
      if(typeof this.relaxed === "string") {
        return this.relaxed ? `${this.relaxed} relaxed` : "relaxed";
      }
    }
  },
  render(h) {
    const {size, link, horizontal, inverted, selection, animated, divided, celled, getRelaxed} = this;
    const data = {
      staticClass: "ui",
      class: [size, getRelaxed, {inverted, horizontal, divided, celled, selection, animated, link}, "list"]
    };
    let tag = "div";

    if(this.bulleted) {
      tag = "ul";
    } else if(this.ordered) {
      tag = "ol";
    }


    return h(tag, data, this.$slots.default);
  }
};