export default (prop = "columns", name = "column") => {
  const mixin = {
    props: {},
    computed: {
      getColumns() {
        
        const width = WIDTHS[this[prop]];
        if (width) {
          return `${width} ${name}`;
        }
      }
    }
  };

  mixin.props[prop] = {
    type: [Number, String],
    validator: value => value >= 1 && value <= 16
  }

  return mixin;
};