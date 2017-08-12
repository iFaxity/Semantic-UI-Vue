<script>
import { Attach, Align, Color, Float, Size } from "../mixins";

export default {
  name: "UiHeader",
  mixins: [Attach("top", "bottom"), Align(), Color(), Float(), Size()],
  props: {
    disabled: Boolean,
    dividing: Boolean,
    block: Boolean,
    inverted: Boolean,
    icon: Boolean,

    level: {
      type: [Number, String],
      validator: value => value > 0 && value < 7
    }
  },
  render(h) {
    const {disabled, dividing, block, size, getAttach, getFloat, getAlign, color, inverted, icon} = this;
    const classes = [{ disabled, dividing, block }, size, getAttach, getFloat, getAlign, color, { inverted, icon }, "header"];
    let tag = "div";

    if(this.level > 0 && this.level < 7) {
      tag = `h${this.level}`;
    }
    return h(tag, {staticClass: "ui", class: classes}, this.$slots.default);
  }
};
</script>