<template lang="pug">
ui-transition(name="fade" @hide="onHide" @show="onShow" @showing="onShowing" @hidden="onHidden")
  .ui.page.dimmer(v-show="model", :class="{active}" @click="onClick")
    // Transition on modal itself aswell
    ui-transition(:name="transition")
      .ui(v-show="model", :class=`[{basic, fullscreen}, size, "modal"]`)
        ui-icon(v-if="dismiss" icon="close" @click="onDismiss")
        slot  
</template>
<script>
import { Size } from "../mixins";
const { body } = document;

export default {
  name: "UiModal",
  mixins: [Size("mini", "tiny", "small", "large")],
  props: {
    show: Boolean,
    basic: Boolean,
    fullscreen: Boolean,
    dismiss: Boolean,
    image: Boolean,

    scrolling: Boolean,
    transition: {
      type: String,
      default: "scale"
    }
  },
  data() {
    return {active: false};
  },
  model: {
    event: "input",
    prop: "show"
  },
  computed: {
    model: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    onHide: e => body.classList.remove("dimmable", "dimmed"),
    onShow: e => body.classList.add("dimmable", "dimmed"),
    onHidden(e) {
      this.active = false;
    },
    onShowing(e) {
      this.active = true;
    },
    onDismiss(e) {
      this.model = false;
      this.$emit("dismiss", e);
    },
    onClick(e) {
      const { classList } = e.target;
      let event, action;

      if(classList.contains("dimmer")) {
        event = "dismiss";
      } else if (classList.contains("positive", "approve", "ok")) {
        event = "action";
        action = "approve";
      } else if (classList.contains("negative", "deny", "cancel")) {
        event = "action";
        action = "deny";
      }

      // Emit the event
      if(event) {
        this.$emit(event, e, action);
        if (!e.defaultPrevented) {
          this.model = false;
        }
      }
    }
  },
};
</script>