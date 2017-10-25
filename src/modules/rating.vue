<template lang="pug">
.ui(:class=`[size, {star, heart}, "rating", {disabled}]` @mouseleave="onMouseLeave" @mouseover="onMouseOver")
  template(v-for="value in ratings")
    i.icon(:class=`{active: value <= model}` @click="onClick(value)")
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
    onClick(value) {
      if(this.disabled) return;
      this.model = this.model === value ? 0 : value;
    },
    onMouseLeave(e) {
      if(this.disabled) return;

      const {childNodes} = e.target;
      childNodes.forEach(child => child.classList.remove("selected"));
    },
    onMouseOver(e) {
      if(this.disabled) return;

      const {childNodes} = e.target.parentNode;
      let found = false;

      childNodes.forEach(child => {
        if(found) {
          child.classList.remove("selected");
        } else {
          found = child === e.target;
          child.classList.add("selected");
        }
      });
    }
  },
  computed: {
    model: {
      get() {
        return this.rating;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    ratings() {
      const arr = [];
      for(let n = 1; n <= this.maxRating; n++) {
        arr.push(n);
      }
      return arr;
    }
  },
};
</script>