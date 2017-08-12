<template lang="pug">
.ui(:class=`[{readOnly, disabled, fitted}, theme, "checkbox"]`)
  input(type="radio" tabindex="0" v-bind="$attrs" v-model="model"
    :value="value"
  )
  label
    slot
</template>

<script>
import { Inputbox } from "../mixins";

export default {
  name: "UiRadio",
  mixins: [Inputbox("radio")]
};
</script>