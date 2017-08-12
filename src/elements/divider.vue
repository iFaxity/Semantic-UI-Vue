<template lang="pug">
.ui(:class=`[{vertical, horizontal, inverted, fitted, hidden, clearing, section}, "divider", {header}]`)
  slot
</template>

<script>
export default {
  name: "UiDivider",
  props: {
    vertical: Boolean,
    horizontal: Boolean,
    inverted: Boolean,
    fitted: Boolean,
    hidden: Boolean,
    section: Boolean,
    clearing: Boolean,
    header: Boolean,
  }
};
</script>