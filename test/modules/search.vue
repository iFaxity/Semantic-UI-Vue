<template lang="pug">
  .ui(:class=`[{category}, "search"]`)
    ui-input.prompt(@focus="onFocus" @blur="onBlur")

    ui-transition(name="scale")
      .results(v-if="show" @click="onClick")
        template(v-if="empty")
          .message.empty
            .header No Results
            .description Your search returned no results
        template(v-else)
          // Show results in categories
          template(v-if="category")
            .category(v-for="(category, name) in result")
              .name {{name}}
              a.result(v-for="category in category")
                .content
                  .title {{item.title}}
                  .description {{item.descripion}}
          // Show results        
          template(v-else)     
            a.result(v-for="item in result")
              .content
                .title {{item.title}}
                .description {{item.descripion}}

</template>

<script>
// Simple filter for result
function parseResult(arr, value, full) {
  return arr.filter(item => {
    const {title} = item;
    return (full ? title.contains : title.startsWith)(value);
  });
}

export default {
  name: "UiSearch",
  props: {
    category: Boolean,
    loading: Boolean,
    fluid: Boolean,
    full: {
      type: Boolean,
      default: false
    },

    align: String,
    source: [Array, Object],
  },
  model: {
    prop: "value",
    event: "search"
  },
  data() {
    return { results: [], show: false, empty: false };
    // Items. contains objects of title and optional description
    const arr = [
      {title: "kek", description: "Some kek stuff"},
      {title: "lol"},
      {title: "Such stuff", description: "Stuffs for all of people"}
    ];

    // Categories
    const obj = {
      // Categories are just result arrays wapped in an object
      passwords: arr
    };
  },
  computed: {
    search: {
      get() {
        return this.value;
      },
      set(value) {
        let results;

        if(value) {
          // Parse array result
          if(Array.isArray(value)) {
            const arr = parseResult(this.items, value, this.full);
            if(arr.length) {
              results = arr;
            }
          } else if(typeof value === "object") {
            // Parse object result
            results = {};
            Object.keys(this.items).forEach(key => {
              const arr = parseResult(this.items[key], value, this.full);
              if(arr.length) {
                results[key] = arr;
              }
            });
          } else {
            // item error
            throw new Error("Search error");
          }

          if(results) {
            this.results = results;
            this.empty = false;
          } else {
            this.empty = true;
          }

          this.show = true;
        } else {
          this.show = false;
        }

        this.$emit("search", value);
      }
    }
  },
  methods: {
    onClick(e) {
      const value = e.target.children[0].textContent;
      this.emit("search", value);
    },
    onFocus() {
      this.show = !!this.value;
    },
    onBlur() {
      this.show = false;
    }
  },
};
</script>