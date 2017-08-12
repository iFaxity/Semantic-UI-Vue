import {COLORS} from "../constants";

export default (...args) => {
  const colors = args.length ? args : COLORS;

  return {
    props: {
      color: String,
      validator: value => colors.includes(value)
    }
  };
};


