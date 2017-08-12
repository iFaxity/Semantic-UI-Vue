<template lang="pug">
i(:class=`[name, "flag"]`)
</template>

<script>
export default {
  name: "UiFlag",
  props: {
    name: String
  }
};
</script>