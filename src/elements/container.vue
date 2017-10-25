<template lang="pug">
.ui(:class=`[getAlign, {fluid, text}, "container"]`)
  slot
</template>

<script>
import { Align } from "../mixins";

export default {
  name: "UiContainer",
  mixins: [Align("justified")],
  props: {
    fluid: Boolean,
    text: Boolean
  }
};
</script>
