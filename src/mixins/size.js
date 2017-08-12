import {SIZES} from "../constants";

export default (...args) => {
  // Use one or the other
  const sizes = args.length ? args : SIZES;

  return {
    props: {
      size: {
        type: String,
        validator: value => sizes.includes(value)
      }
    }
  };
};