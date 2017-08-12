<template lang="pug">
.ui(:class=`[size, {star, heart}, "rating", {disabled}]` @mouseleave="mouseLeave" @mouseover="mouseOver")
  template(v-for="value in values")
    i.icon(:class=`{active: value <= rating}` @click="click")
</template>

<script>
import { Size } from "../mixins";

export default {
  name: "UiRating",
  mixins: [Size()],
  model: {
    prop: "rating",
    event: "input"
  },
  props: {
    heart: Boolean,
    star: Boolean,
    disabled: Boolean,

    maxRating: {
      type: [Number, String],
      default: 4
    },
    rating: {
      type: [Number, String],
      default: 0
    }
  },
  methods: {
    click() {
      if(this.disabled) {
        return;
      }
      this.input = this.value;
    },
    mouseLeave(e) {
      if(this.disabled) {
        return;
      }

      const {childNodes} = e.target;
      childNodes.forEach(child => child.classList.remove("selected"));
    },
    mouseOver(e) {
      if(this.disabled) {
        return;
      }

      const {childNodes} = e.target.parentNode;
      childNodes.reduce((found, child) => {
        if(found) {
          child.classList.remove("selected");
        } else {
          found = child === target;
          child.classList.add("selected");
        }
        return found;
      }, false);
    }
  },
  computed: {
    input: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    values() {
      const arr = [];
      for(let n = 1; n <= this.maxRating; n++) {
        arr.push(n);
      }
      return arr;
    }
  },
};
</script>