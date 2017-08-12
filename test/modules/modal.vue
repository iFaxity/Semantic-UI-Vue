<template lang="pug">
ui-transition(name="fade")
  .ui.page.dimmer(v-if="show")
    // Transition on modal itself  aswell
    ui-transition(:name="transition")
      .ui(v-if="show", :class=`[{basic, fullscreen}, size, "modal"]` @click="onClick")
        ui-icon(v-if="dismiss" icon="close" @click="onDismiss")
        slot

</template>
<script>
//TODO: add dimmer to background and body of the document
function hasClass(target, ...classes) {
  return classes.some(item => target.classList.contains(item));
}

export default {
  name: "UiModal",
  props: {
    show: Boolean,
    basic: Boolean,
    fullscreen: Boolean,
    dismiss: Boolean,

    size: String,
    transition: {
      type: String,
      default: "scale"
    }

    // Experimental
    //approve: [Array, String],
    //deny: [Array, String]
  },
  data() {
    return {showing: false};
  },
  methods: {
    onDismiss(e) {
      this.showing = false;
      this.$emit("dismiss", e);
    },
    onClick(e) {
      const {target} = e;

      if (hasClass(target, "positive", "approve", "ok")) {
        this.$emit("approve", e);
      } else if (hasClass(target, "negative", "deny", "cancel")) {
        this.$emit("deny", e);
      } else {
        this.$emit("action", e);
      }
    }
  },
};
</script>