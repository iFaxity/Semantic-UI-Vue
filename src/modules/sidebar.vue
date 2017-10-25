<template lang="pug">
  ui-transition(name="uncover")
    ui-menu(v-show="show", :class=`[width, attach, "sidebar"]` v-bind="$attrs" v-on="$listeners")
</template>

<script>
import { ATTACHMENTS } from "../constants";
const WIDTHS = ["thin", "very thin", "wide", "very wide"];

export default {
  name: "UiSidebar",
  props: {    
    show: Boolean,
    width: {
      type: String,
      validator: value => WIDTHS.includes(value)
    },
    attach: {
      type: String,
      validator: value => ATTACHMENTS.includes(value)
    }
  }
};
</script>