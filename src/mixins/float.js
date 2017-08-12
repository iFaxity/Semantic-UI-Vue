import {FLOATS} from "../constants";

export default (...args) => {
  const floats = args.length ? args : FLOATS;

  return {
    props: {
      float: {
        type: String,
        validator: value => floats.includes(value)
      }
    },
    computed: {
      getFloat() {
        if (typeof this.float === "string") {
          return `${this.float} floated`;
        }
      }
    }
  };
};
