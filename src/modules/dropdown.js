/*TODO LIST
* [X] Support multiple
* [ ] Support sub menues
* [ ] Support search-in-menu somehow (maybe not) search is enough
*/
function getValue(node) {
  let value = node.data.attrs && node.data.attrs["data-value"];

  if(!value) {
    node.children.some(child => {
      if(!child.tag) {
        value = child.text;
        return true;
      }
    });
  }
  return value || null;
}

export default {
  name: "UiDropdown",
  props: {
    selection: Boolean,
    upward: Boolean,
    multiple: Boolean,
    text: String,
    name: String,
    search: Boolean,
    value: [String, Array],

    // other types
    left: Boolean,
    fluid: Boolean,
    compact: Boolean,
    scrolling: Boolean,
    disabled: Boolean,
    error: Boolean,
    loading: Boolean,
    floating: Boolean,
    inline: Boolean,
    labeled: Boolean,
    // icon button?
    pointing: String, // ["top", "bottom", "right", "left", "top right", "top left", "bottom right", "bottom left"]
  },
  model: {
    prop: "value",
    event: "change"
  },
  data() {
    return { open: false };
  },
  mounted() {
    // Add event listener to unfocus the dropdown when clicking elsewhere
    document.addEventListener("click", e => { this.open = false; });
  },
  computed: {
    getText() {
      const text = this.text || "";
      // dont show this.value in multiple selection dropdown
      return this.multiple ? text : this.value || text;
    }
  },
  methods: {
    select(e) {
      const { target } = e;
      const text = target.dataset.value || target.textContent;

      if (target.className === "menu") {
        // Open the menu
        target.classList.add("transition visible");
      } else {
        let value;
        if (this.multiple) {
          value = this.value.concat(text);
        } else {
          //TODO: remove the other value in the render function
          if(this.$refs.search) {
            this.$refs.search.value = "";
            this.$refs.text.classList.remove("filtered");
          }
          value = text;
          this.open = false;
        }

        this.$emit("change", value);
      }
    },
    input(e) {
      // Required to not fuck up
      if(!this.$refs.menu) {
        return;
      }

      const { children } = this.$refs.menu;
      const value = e.target.value.toLowerCase();

      if(value) {
        this.$refs.text.classList.add("filtered");
      } else {
        this.$refs.text.classList.remove("filtered");
      }

      for(let child of children) {
        if (child.classList.contains("item")) {
          const text = child.textContent.toLowerCase();
          
          if (text.startsWith(value)) {
            child.classList.remove("filtered");
          } else {
            child.classList.add("filtered");
          }
        }
      }
    },
    click(e) {
      e.stopPropagation();
      const isRoot = e.target === e.currentTarget;
      const isRootChild = e.target.parentNode === e.currentTarget;

      if(isRoot || isRootChild) {
        if(this.search && isRoot || e.target === this.$refs.search) {
          this.$refs.search.focus();
          this.open = true;
        } else {
          this.open = !this.open;
        }
      }
    }
  },
  render(h) {
    let items = this.$slots.default; // may be altered if multiple
    const $children = [
      h("ui-icon", { props: { icon: "dropdown" } })
    ];

    // Add hidden input if we got a name to it
    if (this.name) {
      $children.push(h("input", {
        attrs: { type: "hidden", name: this.name }
      }));
    }

    // Render labels if multiple
    if(!this.multiple) {
      if(this.value && items) {
        items.some(child => {
          // Activate the selected item
          if(this.value === getValue(child)) {
            child.data.staticClass += " active selected";
          }
        });
      }
    }
    else if(this.$slots.default && this.value && this.value.length > 0) {
      // Multiple selection labels (Skip if nothing is chosen)
      items = [];
      this.$slots.default.forEach(child => {
        const index = this.value.indexOf(getValue(child));
        const deselect = e => {
          // Remove element when clicked (only works with multiple)
          const value = this.value.slice(0);
          value.splice(index, 1);
          this.$emit("change", value);
        };
        
        // Move over to label if selected otherwise add to dropdown list
        if(index >= 0) {
          const icon = h("ui-icon", { props: { icon: "delete" } });
          const label = h("ui-label", { on: { click: deselect } }, child.children.concat(icon));
          $children.push(label);
        } else {
          items.push(child);
        }
      });
    }

    // Search box
    if (this.search) {
      $children.push(h("input", {
        staticClass: "search",
        ref: "search",
        attrs: {
          autocomplete: "off",
          tabindex: "0"
        },
        on: { input: this.input }
      }));
    }

    // Default text element
    $children.push(h("div", {
      ref: "text",
      class: [{ default: this.text === this.getText }, "text"]
    }, this.getText));

    // Menu container
    const menu = h("div", {
      staticClass: "menu",
      ref: "menu",
      on: { click: this.select }
    }, items);
    $children.push(h("ui-transition", {
      props: { name: "slide down" }
    }, this.open ? [ menu ] : null));

    // Render root dropdown element
    return h("div", {
      staticClass: "ui",
      class: [{
        active: this.open,
        search: this.search,
        selection: this.selection,
        upward: this.upward,
        multiple: this.multiple
      }, "dropdown"],
      on: { click: this.click }
    }, $children);
  }
};