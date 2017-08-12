import { ALIGNMENTS } from "../constants";

export default (...args) => {
  let alignments = ALIGNMENTS;
  if(args.length) {
    alignments = ALIGNMENTS.concat(args);
  }

  return {
    props: {
      align: {
        type: String,
        validator: value => alignments.includes(value)
      }
    },
    computed: {
      getAlign() {
        if (this.align) {
          if (this.align === "justify") {
            return "justified";
          }
          return `${this.align} aligned`;
        }
      }
    }
  };
};

