//TODO: Add indeterminate to both radio and checkbox
export default theme => {
  return {
    props: {
      readOnly: Boolean,
      fitted: Boolean,
      slider: Boolean,
      toggle: Boolean,
      indeterminate: Boolean,

      value: String,
      checked: [String, Array, Boolean]
    },
    model: {
      event: "input",
      prop: "checked"
    },
    computed: {
      indetermined() {
        throw new Error("Not implemented yet");
      },
      model: {
        get() {
          return this.checked;
        },
        set(value) {
          this.$emit("input", value);
        }
      },
      theme() {
        if (this.toggle) {
          return "toggle";
        } else if (this.slider) {
          return "slider";
        }
        return theme;
      }
    }
  };
}
