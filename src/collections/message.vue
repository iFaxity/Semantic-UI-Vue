<template lang="pug">

ui-transition(:name="transition")
  .ui(v-if="open", :class=`[
      {hidden, visible, floating, compact},
      getAttach, {warning, info, positive, success, negative, error},
      {icon}, size, color, "message"
  ]`)
    ui-icon(v-if="icon", :icon="icon")
    .content
      slot
    // Dismiss/Close icon
    ui-icon(v-if="dismiss" icon="close" @click="onDismiss")  
</template>

<script>
import { Color, Size, Attach } from "../mixins";

export default {
  name: "UiMessage",
  mixins: [Color(), Size(), Attach("top", "bottom")],
  props: {
    dismiss: Boolean,
    hidden: Boolean,
    visible: Boolean,
    floating: Boolean,
    compact: Boolean,
    // Variations
    warning: Boolean,
    info: Boolean,
    positive: Boolean,
    success: Boolean,
    negative: Boolean,
    error: Boolean,

    icon: String,
    transition: {
      type: String,
      default: "fade"
    },
  },
  data() {
    return {open: true};
  },
  methods: {
    onDismiss() {
      this.$emit("dismiss", this);
      this.open = false;
    }
  }
};
</script>