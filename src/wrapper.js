// Wrapper component for every component to use default stuff like as and such

export default {
  functional: true,
  props: {
    tag: {
      type: String,
      required: true
    }
  },
  render(h, ctx) {
    let tag = ctx.props.tag || "div";
    return h(tag, ctx.children);
  }
};