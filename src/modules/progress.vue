<template lang="pug">
.ui(:class=`[getAttach, {indicating}, size, color, {inverted, disabled, active}, "progress", {success, error, warning}]`, :data-percent="progress")
  .bar(:style="style")
    .progress(v-if="getRatio") {{getRatio}}
  .label(v-if="hasLabel")
    slot
</template>

<script>
import { Color, Size, Attach } from "../mixins";

export default {
  name: "UiProgress",
  mixins: [Color(), Size(), Attach("top", "bottom")],
  props: {
    indicating: Boolean,
    active: Boolean,
    success: Boolean,
    warning: Boolean,
    error: Boolean,
    disabled: Boolean,
    inverted: Boolean,

    ratio: String,

    value: {
      type: [String, Number],
      default: 0
    },
    duration: {
      type: [String, Number],
      default: 500
    },
    total: {
      type: [String, Number],
      default: 100
    }
  },
  computed: {
    hasLabel() {
      return !!this.$slots.default;
    },
    style() {
      return {
        width: `${this.progress}%`,
        transitionDuration: `${this.duration}ms`
      };
    },
    getRatio() {
      const props = {
        value: this.value,
        progress: this.progress,
        total: this.total
      };

      if(this.ratio) {
        return this.ratio.replace(/{([a-z]+)}/g, (match, prop) => {
          const value = props[prop];
          return value ? value : "";
        });
      }
    },
    progress() {
      if(this.value) {
        const progress = ((this.value / this.total) * 100).toFixed();
        this.$emit("progress", progress);

        if (progress === 100) {
          this.$emit("done");
        }
        return progress;
      }
    }
  }
};
</script>