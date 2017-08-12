<template lang="pug">
i(v-on="$listeners", :class=`[{disabled, circular, bordered, corner}, size, color, {inverted, fitted}, getFlipped, getRotated, icon, {loading, link}, "icon"]`)
</template>

<script>
import { Color, Size } from "../mixins";

export default {
  name: "UiIcon",
  mixins: [Color(), Size()],
  props: {
    disabled: Boolean,
    loading: Boolean,
    fitted: Boolean,
    link: Boolean,
    circular: Boolean,
    bordered: Boolean,
    inverted: Boolean,
    corner: Boolean,
    
    rotated: String,
    flipped: String,

    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    getFlipped() {
      if(this.flipped) {
        return `${this.flipped} flipped`;
      }
    },
    getRotated() {
      if(this.rotated) {
        return `${this.rotated} rotated`;
      }
    }
  }
};
</script>
