<template lang="pug">
div.ui.dropdown(:class="[{active: open}, {selection}, {upward}]" @click="click")
  input(v-if="name" type="hidden", :name="name")
  
  .default.text(v-if="!value && text") {{text}}
  .text(v-else) {{value}}
  ui-icon(icon="dropdown")
  ui-transition(name="slide down")
    .menu(v-if="open" @click="itemClick")
      slot
</template>

<script>
export default {
  name: "UiDropdown",
  props: {
    selection: Boolean,
    upward: Boolean,
    //multiple: Boolean,
    text: String,
    name: String
  },
  model: {
    prop: "value",
    event: "change"
  },
  data() {
    return { open: false, value: null };
  },
  methods: {
    itemClick(e) {
      const text = e.target.textContent;

      debugger;
      if (this.multiple) {
        this.value.push(text);
      } else {
        this.value = text;
      }

      this.$emit("change", this.value);
    },
    click(e) {
      this.open = !this.open; // invert open because clicking changes state
    }
  }
};
</script>
