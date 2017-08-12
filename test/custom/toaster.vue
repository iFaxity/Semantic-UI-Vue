<template lang="pug">
div.ui.toaster()
  template(v-for="toast in toasts")
    ui-message(:transition="transition"
               :header="toast.header"
               :icon="toast.icon"
               :color="toast.color"
    ) {{toast.message}}
</template>

<script>
export default {
  props: {
    toasts: Array,
    max: {
      type: Number,
      default: 5
    },
    transition: {
      type: String,
      default: "slide right"
    }
  },
  computed: {
    toasts() {
      if (this.maximum) {
        return toasts.slice(0, this.maximum);
      }
      return toasts;
    }
  },
  methods: {
    dismiss() {

    }
  }
};
</script>