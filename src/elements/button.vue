<template lang="pug">
.ui(:class=`[
  {active: isActive, disabled, loading}, size, social,
  {primary, secondary, positive, negative, basic}, color,
  getAttach, {inverted,compact, fluid, circular, toggle},
  getFloat, getLabeled, {icon}, getAnimated, "button"]` @click="click" tabindex="0"
  )
  template(v-if="getAnimated")
    .visible.content
      slot
    .hidden.content
      slot(name="hidden" class="kek")
  template(v-else)
    slot

</template>

<script>
//TODO: support button and a (href buttons)
import { Color, Size, Attach, Float } from "../mixins";

export default {
  name: "UiButton",
  mixins: [Color(), Size(), Attach(), Float()],
  props: {
    primary: Boolean,
    secondary: Boolean,
    positive: Boolean,
    negative: Boolean, 
    compact: Boolean,
    fluid: Boolean,
    circular: Boolean,
    active: Boolean,
    disabled: Boolean,
    loading: Boolean,
    basic: Boolean,
    inverted: Boolean,
    icon: Boolean,
    toggle: Boolean,
    
    animated: String,
    social: String,
    labeled: String,
  },
  methods: {
    click(e) {
      if(this.toggle) {
        this.toggled = !this.toggled;
      }
      this.$emit("click", e);
    }
  },
  data() {
    return {toggled: false};
  },
  computed: {
    isActive() {
      return this.active || (this.toggle && this.toggled);
    },
    getLabeled() {
      if(typeof this.labeled === "string") {
        return this.labeled ? `${this.labeled} labeled` : "labeled";
      }
    },
    getAnimated() {
      if(this.animated === "") {
        return "animated";
      } else if(this.animated === "vertical") {
        return "vertical animated";
      } else if(this.animated === "fade") {
        return "animated fade";
      }
    }
  }
};
</script>