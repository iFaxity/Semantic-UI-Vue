import {PADDINGS} from "../constants";

export default (...args) => {
  // Use one or the other
  const paddings = args.length ? args : PADDINGS;

  return {
    props: {
      padded: {
        type: String,
        validator: value => value === "" || paddings.includes(value)
      }
    },
    computed: {
      getPadded() {
        if (typeof this.padded === "string") {
          return this.padded ? `${this.padded} padded` : "padded";
        }
      }
    }
  };
};