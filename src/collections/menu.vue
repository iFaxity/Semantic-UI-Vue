<template lang="pug">
  .ui(:class=`[
    size, color, {inverted, secondary, pointing, text},
    getItems, getAttach, {vertical, fluid, stackable, compact, borderless, pagination},
    getTabular, getFixed, "menu"]` v-on="$listeners")
    slot
</template>


<script>
import { Attach, Color, Size } from "../mixins";
import { WIDTHS, ATTACHMENTS, FLOATS } from "../constants";

export default {
  name: "UiMenu",
  mixins: [Attach("top", "bottom"), Color(), Size()],
  props: {
    text: Boolean,
    pointing: Boolean,
    vertical: Boolean,
    fluid: Boolean,
    stackable: Boolean,
    compact: Boolean,
    borderless: Boolean,
    pagination: Boolean,
    secondary: Boolean,
    inverted: Boolean,

    items: {
      type: [Number, String],
      validator: value => value >= 1 && value <= 12
    },
    fixed: {
      type: String,
      validator: value => ATTACHMENTS.includes(value)
    },
    tabular: {
      type: String,
      validator: value => value === "" || FLOATS.includes(value)
    },
    icon: {
      type: String,
      validator: value => value === "" || value === "labeled"
    }
  },
  computed: {
    getTabular() {
      if (typeof this.tabular === "string") {
        return this.tabular ? `${this.tabular} tabular` : "tabular";
      }
    },
    getIcon() {
      if(typeof this.icon === "string") {
        return this.icon ? `${this.icon} icon` : "icon";
      }
    },
    getFixed() {
      if (typeof this.fixed === "string") {
        return this.fixed ? `${this.fixed} fixed` : null;
      }
    },
    getItems() {
      const items = WIDTHS[this.item];
      return items ? items + " item" : null;
    }
  },
};
</script>