<template lang="pug">
.ui(:class=`[{disabled, loading, basic, secondary, tertiary}, color,
  getAttach, {compact, circular, raised, piled, vertical, inverted, clear},
  getFloat, getAlign, getPadded, getStack, "segment"]`)
  slot
</template>

<script>
import { Float, Color, Align, Attach, Padded } from "../mixins";

export default {
  name: "UiSegment",
  mixins: [Float(), Color(), Align(), Attach("top", "bottom"), Padded("very")],
  props: {
    disabled: Boolean,
    loading: Boolean,
    basic: Boolean,
    secondary: Boolean,
    tertiary: Boolean,
    compact: Boolean,
    circular: Boolean,
    raised: Boolean,
    piled: Boolean,
    vertical: Boolean,
    inverted: Boolean,
    clear: Boolean,

    stack: {
      type: String,
      validator: value => value === "" || value === "tall"
    }
  },
  computed: {
    getStack() {
      if(this.stack) {
        return this.stack === "tall" ? "tall stacked" : "stacked";
      }
    }
  }
};
</script>