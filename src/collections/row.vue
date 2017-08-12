<template lang="pug">
div(:class=`[getFloat, getAlign, color, getColumns, "row"]`)
  slot
</template>

<script>
import { WIDTHS } from "../constants";
import { Color, Float, Align } from "../mixins";

export default {
  name: "UiRow",
  mixins: [Color(), Float(), Align("middle", "justified")],
  props: {
    columns: {
      type: [Number, String],
      validator: value => value >= 1 && value <= 16
    }
  },
  computed: {
    getColumns() {
      const width = WIDTHS[this.columns];
      return width ? width + " column" : null;
    }
  }
};
</script>