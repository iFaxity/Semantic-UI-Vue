function normalize(index, active) {
  if(active >= 0) {
    return active === index || active === index - 1;
  }
  return false;
}

export default {
  name: "UiAccordion",
  props: {
    styled: Boolean,
    inverted: Boolean,
    fluid: Boolean,
    menu: Boolean,
    field: Boolean
  },
  data() {
    return {active: -1};
  },
  render(h) {
    const { styled, fluid, inverted, menu, field } = this;
    const children = this.$slots.default;

    children.forEach((child, index) => {
      const { data } = child;
      const list = data.staticClass.split(" ");
      data.class = {
        active: normalize(index, this.active)
      };

      // Add click event on title element
      if(list.includes("title")) {
        data.on = {
          click: () => {
            this.active = this.active === index ? -1 : index;
          }
        };
      }
    });


    return h("div", {
      staticClass: "ui",
      on: this.$listeners,
      class: [{ styled, fluid, inverted, field, "vertical menu": menu }, "accordion"]
    }, children);
  }
};