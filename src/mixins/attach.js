import {ATTACHMENTS} from "../constants";

export default (...args) => {
  // Use one or the other
  const attachments = args.length ? args : ATTACHMENTS;

  return {
    props: {
      attach: {
        type: String,
        validator: value => value === "" || attachments.includes(value)
      }
    },
    computed: {
      getAttach() {
        if(typeof this.attach === "string") {
          return this.attach ? `${this.attach} attached` : "attached";
        }
      }
    }
  };
};