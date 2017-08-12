<template lang="pug">
div(:class=`[getFloat, getAlign, color, getWidth, "column"]`)
  slot
</template>

<script>
import { WIDTHS } from "../constants";
import { Color, Float, Align } from "../mixins";

export default {
  name: "UiColumn",
  mixins: [Color(), Float(), Align("middle", "justified")],
  props: {
    width: {
      type: [Number, String],
      validator: value => value >= 1 && value <= 16
    }
  },
  computed: {
    getWidth() {
      const width = WIDTHS[this.width];
      return width ? width + " wide" : null;
    }
  }
};
</script>