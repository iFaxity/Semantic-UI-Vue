<template lang="pug">
.ui(:class=`[{disabled, fluid, transparent, inverted}, getSize, getLabeled, getIcon, "input", {error, focus, loading}]`)
  input(v-model="input" v-bind="$attrs" v-on="$listeners")
  slot
</template>

<script>
import { Size } from "../mixins";

export default {
  name: "UiInput",
  mixins: [Size()],
  inheritAttrs: false,
  props: {
    focus: Boolean,
    loading: Boolean,
    disabled: Boolean,
    error: Boolean,
    transparent: Boolean,
    inverted: Boolean,
    fluid: Boolean,

    labeled: String,
    icon: String,
    value: String
  },
  computed: {
    input: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    getLabeled() {
      if(this.labeled) {
        return this.labeled ? `${this.labeled} labeled` : "labeled";
      }
    },
    getIcon() {
      if(this.icon) {
        return this.icon ? `${this.icon} icon` : "icon";
      }
    }
  },
};
</script>