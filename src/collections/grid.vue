<template lang="pug">
.ui(:class=`[getFloat, getAlign, getReversed, getColumns, {equalWidth, centered}, getRelaxed, getDivided, getCelled,
  getPadded, {doubling, stackable}, "grid", {container}]`)
  slot
</template>

<script>
import { Float, Align, Padded } from "../mixins";
import { WIDTHS } from "../constants";

export default {
  name: "UiGrid",
  mixins: [Float(), Align("middle", "justified"), Padded()],
  props: {
    equalWidth: Boolean,
    centered: Boolean,
    doubling: Boolean,
    stackable: Boolean,
    container: Boolean,

    //TODO: add full support for reversed
    reversed: String,
    divided: {
      type: String,
      validator: value => value => value === "" || value === "vertically"
    },
    celled: {
      type: String,
      validator: value => value => value === "" || value === "internally"
    },
    relaxed: {
      type: String,
      validator: value => value => value === "" || value === "very"
    },

    columns: {
      type: [Number, String],
      validator: value => value >= 1 && value <= 16
    }
  },
  computed: {
    getReversed() {
      if(typeof this.reversed === "string") {
        return this.reversed ? `${this.reversed} reversed` : "reversed";
      }
    },
    getRelaxed() {
      if(typeof this.relaxed === "string") {
        return this.relaxed ? `${this.relaxed} relaxed` : "relaxed";
      }
    },
    getCelled() {
      if(typeof this.celled === "string") {
        return this.celled ? `${this.celled} celled` : "celled";
      }
    },
    getDivided() {
      if(typeof this.divided === "string") {
        return this.divided ? `${this.divided} divided` : "divided";
      }
    },
    getColumns() {
      const width = WIDTHS[this.columns];
      if(width) {
        return `${width} column`;
      }
    }
  }
};
</script>