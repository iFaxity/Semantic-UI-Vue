import { Color, Size, Attach } from "../mixins";
import { POINTINGS } from "../constants";

const ATTACHMENTS = ["top", "bottom", "top right", "top left", "bottom right", "bottom left"];

export default {
  name: "UiLabel",
  mixins: [Color(), Size(), Attach(...ATTACHMENTS)],
  props: {
    image: Boolean,
    basic: Boolean,
    tag: Boolean,
    horizontal: Boolean,
    floating: Boolean,

    link: String,
    ribbon: {
      type: String,
      validator: value => value === "" || value === "right"
    },
    circular: {
      type: String,
      validator: value => value === "" || value === "empty"
    },
    corner: {
      type: String,
      validator: value => value === "left" || value === "right"
    },
    pointing: {
      type: String,
      validator : value => value === "" || POINTINGS.includes(value)
    }
  },
  computed: {
    getRibbon() {
      if(typeof this.ribbon === "string") {
        return this.ribbon ? `${this.ribbon} ribbon` : "ribbon";
      }
    },
    getCircular() {
      if(typeof this.circular === "string") {
        return this.circular ? "empty circular" : "circular";
      }
    },
    getCorner() {
      if(this.corner) {
        return `${this.corner} corner`;
      }
    },
    getPointing() {
      const value = this.pointing;

      if(value) {
        if(value === "below") {
          return "pointing below";
        }
        return `${value} pointing`;
      } else if(value === "") {
        return "pointing";
      }
    }
  },
  render(h) {
    const {size, color, basic, horizontal, image, tag, getAttach, getRibbon, getCircular, getPointing, getCorner, floating} = this;
    const data = {
      staticClass: "ui",
      class: [size, color, { basic, horizontal, image, tag }, getAttach, getRibbon, getCircular, getPointing, getCorner, "label", { floating }]
    }

    if(this.link) {
      data.props = {href: this.link};
    }
    return h(this.link ? "a" : "div", data, this.$slots.default);
  }
};