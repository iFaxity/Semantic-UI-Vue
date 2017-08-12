import { Size, Align, Float } from "../mixins";
import { SIZES } from "../constants";


export default {
  name: "UiImage",
  mixins: [ Size(...SIZES, "medium"), Align(), Float() ],
  props: {
    hidden: Boolean,
    disabled: Boolean,
    bordered: Boolean,
    fluid: Boolean,
    rounded: Boolean,
    circular: Boolean,
    centered: Boolean,

    spaced: {
      type: String,
      validator: value => value === "left" || value === "right"
    },
    link: String,
    avatar: String
  },
  computed: {
    getSpaced() {
      if(this.spaced) {
        return `${this.spaced} spaced`
      }
    }
  },
  render(h) {
    const {disabled, hidden, size, getFloat, getAlign, getSpaced, bordered, rounded, circular, centered, fluid, avatar} = this;
    const data = {
      staticClass: "ui",
      class: [{ disabled, hidden }, size, getFloat, getAlign, getSpaced, { bordered, rounded, circular, centered, fluid, avatar }, "image"]
    };
    let tag = "div";
    let children = this.$slots.default;

    if (avatar) {
      // Img tags are self closing
      tag = "img";
      data.attrs = {src: this.avatar};
      children = null;
    } else if (this.link) {
      tag = "a";
      data.attrs = {href: this.link};
    }

    return h(tag, data, children);
  }
};