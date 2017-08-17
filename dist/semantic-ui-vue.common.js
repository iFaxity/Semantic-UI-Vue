'use strict';

var SIZES = [
  "mini", "tiny", "small", "large", "big", "huge", "massive"
];

var COLORS = [
  "red", "orange", "yellow", "olive", "green", "teal", "blue",
  "violet", "purple", "pink", "brown", "grey", "black"
];

var TRANSITIONS = [
  "fade", "fade up", "fade down", "fade left", "fade right",
  "fly left", "fly right", "fly up", "fly down",
  "swing left", "swing right", "swing top", "swing down",
  "slide down", "slide up", "slide left", "slide right",
  "scale", "drop", "jiggle", "flash", "shake", "pulse", "tada", "bounce",
  "horizontal flip", "vertical flip",
  "browse", "browse right" ];

var WIDTHS = [
  null, // zero width is not a thing. So lets just lazy pad the array
  "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen"
];

var FLOATS = ["left", "right"];
var ALIGNMENTS = ["right", "center", "left"];
var ATTACHMENTS = ["top", "bottom", "right", "left"];
var PADDINGS = ["horizontally", "vertically"];
var POINTINGS = ["left", "right", "below"];

var Align = function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var alignments = ALIGNMENTS;
  if(args.length) {
    alignments = ALIGNMENTS.concat(args);
  }

  return {
    props: {
      align: {
        type: String,
        validator: function (value) { return alignments.includes(value); }
      }
    },
    computed: {
      getAlign: function getAlign() {
        if (this.align) {
          if (this.align === "justify") {
            return "justified";
          }
          return ((this.align) + " aligned");
        }
      }
    }
  };
};

var Attach = function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  // Use one or the other
  var attachments = args.length ? args : ATTACHMENTS;

  return {
    props: {
      attach: {
        type: String,
        validator: function (value) { return value === "" || attachments.includes(value); }
      }
    },
    computed: {
      getAttach: function getAttach() {
        if(typeof this.attach === "string") {
          return this.attach ? ((this.attach) + " attached") : "attached";
        }
      }
    }
  };
};

var Color = function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var colors = args.length ? args : COLORS;

  return {
    props: {
      color: String,
      validator: function (value) { return colors.includes(value); }
    }
  };
};

var Float = function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var floats = args.length ? args : FLOATS;

  return {
    props: {
      float: {
        type: String,
        validator: function (value) { return floats.includes(value); }
      }
    },
    computed: {
      getFloat: function getFloat() {
        if (typeof this.float === "string") {
          return ((this.float) + " floated");
        }
      }
    }
  };
};

//TODO: Add indeterminate to both radio and checkbox
var Inputbox = function (theme) {
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
      indetermined: function indetermined() {
        throw new Error("Not implemented yet");
      },
      model: {
        get: function get() {
          return this.checked;
        },
        set: function set(value) {
          this.$emit("input", value);
        }
      },
      theme: function theme$1() {
        if (this.toggle) {
          return "toggle";
        } else if (this.slider) {
          return "slider";
        }
        return theme;
      }
    }
  };
};

var Padded = function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  // Use one or the other
  var paddings = args.length ? args : PADDINGS;

  return {
    props: {
      padded: {
        type: String,
        validator: function (value) { return value === "" || paddings.includes(value); }
      }
    },
    computed: {
      getPadded: function getPadded() {
        if (typeof this.padded === "string") {
          return this.padded ? ((this.padded) + " padded") : "padded";
        }
      }
    }
  };
};

var Size = function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  // Use one or the other
  var sizes = args.length ? args : SIZES;

  return {
    props: {
      size: {
        type: String,
        validator: function (value) { return sizes.includes(value); }
      }
    }
  };
};

//TODO: support button and a (href buttons)
var button = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui",class:[ {active: _vm.isActive, disabled: _vm.disabled, loading: _vm.loading}, _vm.size, _vm.social, {primary: _vm.primary, secondary: _vm.secondary, positive: _vm.positive, negative: _vm.negative, basic: _vm.basic}, _vm.color, _vm.getAttach, {inverted: _vm.inverted,compact: _vm.compact, fluid: _vm.fluid, circular: _vm.circular, toggle: _vm.toggle}, _vm.getFloat, _vm.getLabeled, {icon: _vm.icon}, _vm.getAnimated, "button"],attrs:{"tabindex":"0"},on:{"click":_vm.click}},[(_vm.getAnimated)?[_c('div',{staticClass:"visible content"},[_vm._t("default")],2),_c('div',{staticClass:"hidden content"},[_vm._t("hidden")],2)]:[_vm._t("default")]],2)},staticRenderFns: [],
  name: "UiButton",
  mixins: [Color(), Size(), Attach(), Float()],
  props: {
    primary: Boolean,
    secondary: Boolean,
    positive: Boolean,
    negative: Boolean, 
    compact: Boolean,
    fluid: Boolean,
    circular: Boolean,
    active: Boolean,
    disabled: Boolean,
    loading: Boolean,
    basic: Boolean,
    inverted: Boolean,
    icon: Boolean,
    toggle: Boolean,
    
    animated: String,
    social: String,
    labeled: String,
  },
  methods: {
    click: function click(e) {
      if(this.toggle) {
        this.toggled = !this.toggled;
      }

      this.$emit("click", e);
    }
  },
  data: function data() {
    return {toggled: false};
  },
  computed: {
    isActive: function isActive() {
      return this.active || (this.toggle && this.toggled);
    },
    getLabeled: function getLabeled() {
      if(typeof this.labeled === "string") {
        return this.labeled ? ((this.labeled) + " labeled") : "labeled";
      }
    },
    getAnimated: function getAnimated() {
      if(this.animated === "") {
        return "animated";
      } else if(this.animated === "vertical") {
        return "vertical animated";
      } else if(this.animated === "fade") {
        return "animated fade";
      }
    }
  }
};

var container = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui",class:[_vm.getAlign, {fluid: _vm.fluid, text: _vm.text}, "container"]})},staticRenderFns: [],
  name: "UiContainer",
  mixins: [Align("justified")],
  props: {
    fluid: Boolean,
    text: Boolean
  }
};

var divider = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui",class:[{vertical: _vm.vertical, horizontal: _vm.horizontal, inverted: _vm.inverted, fitted: _vm.fitted, hidden: _vm.hidden, clearing: _vm.clearing, section: _vm.section}, "divider", {header: _vm.header}]},[_vm._t("default")],2)},staticRenderFns: [],
  name: "UiDivider",
  props: {
    vertical: Boolean,
    horizontal: Boolean,
    inverted: Boolean,
    fitted: Boolean,
    hidden: Boolean,
    section: Boolean,
    clearing: Boolean,
    header: Boolean,
  }
};

var flag = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('i',{class:[_vm.name, "flag"]})},staticRenderFns: [],
  name: "UiFlag",
  props: {
    name: String
  }
};

var header = {
  name: "UiHeader",
  mixins: [Attach("top", "bottom"), Align(), Color(), Float(), Size()],
  props: {
    disabled: Boolean,
    dividing: Boolean,
    block: Boolean,
    inverted: Boolean,
    icon: Boolean,

    level: {
      type: [Number, String],
      validator: function (value) { return value > 0 && value < 7; }
    }
  },
  render: function render(h) {
    var ref = this;
    var disabled = ref.disabled;
    var dividing = ref.dividing;
    var block = ref.block;
    var size = ref.size;
    var getAttach = ref.getAttach;
    var getFloat = ref.getFloat;
    var getAlign = ref.getAlign;
    var color = ref.color;
    var inverted = ref.inverted;
    var icon = ref.icon;
    var classes = [{ disabled: disabled, dividing: dividing, block: block }, size, getAttach, getFloat, getAlign, color, { inverted: inverted, icon: icon }, "header"];
    var tag = "div";

    if(this.level > 0 && this.level < 7) {
      tag = "h" + (this.level);
    }
    return h(tag, {staticClass: "ui", class: classes}, this.$slots.default);
  }
};

var icon = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('i',_vm._g({class:[{disabled: _vm.disabled, circular: _vm.circular, bordered: _vm.bordered, corner: _vm.corner}, _vm.size, _vm.color, {inverted: _vm.inverted, fitted: _vm.fitted}, _vm.getFlipped, _vm.getRotated, _vm.icon, {loading: _vm.loading, link: _vm.link}, "icon"]},_vm.$listeners))},staticRenderFns: [],
  name: "UiIcon",
  mixins: [Color(), Size()],
  props: {
    disabled: Boolean,
    loading: Boolean,
    fitted: Boolean,
    link: Boolean,
    circular: Boolean,
    bordered: Boolean,
    inverted: Boolean,
    corner: Boolean,
    
    rotated: String,
    flipped: String,

    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    getFlipped: function getFlipped() {
      if(this.flipped) {
        return ((this.flipped) + " flipped");
      }
    },
    getRotated: function getRotated() {
      if(this.rotated) {
        return ((this.rotated) + " rotated");
      }
    }
  }
};

var image = {
  name: "UiImage",
  mixins: [ Size.apply(void 0, SIZES.concat( ["medium"] )), Align(), Float() ],
  props: {
    hidden: Boolean,
    disabled: Boolean,
    bordered: Boolean,
    fluid: Boolean,
    rounded: Boolean,
    circular: Boolean,
    centered: Boolean,

    spaced: {
      type: String,
      validator: function (value) { return value === "left" || value === "right"; }
    },
    link: String,
    avatar: String
  },
  computed: {
    getSpaced: function getSpaced() {
      if(this.spaced) {
        return ((this.spaced) + " spaced")
      }
    }
  },
  render: function render(h) {
    var ref = this;
    var disabled = ref.disabled;
    var hidden = ref.hidden;
    var size = ref.size;
    var getFloat = ref.getFloat;
    var getAlign = ref.getAlign;
    var getSpaced = ref.getSpaced;
    var bordered = ref.bordered;
    var rounded = ref.rounded;
    var circular = ref.circular;
    var centered = ref.centered;
    var fluid = ref.fluid;
    var avatar = ref.avatar;
    var data = {
      staticClass: "ui",
      class: [{ disabled: disabled, hidden: hidden }, size, getFloat, getAlign, getSpaced, { bordered: bordered, rounded: rounded, circular: circular, centered: centered, fluid: fluid, avatar: avatar }, "image"]
    };
    var tag = "div";
    var children = this.$slots.default;

    if (avatar) {
      // Img tags are self closing
      tag = "img";
      data.attrs = {src: this.avatar};
      children = null;
    } else if (this.link) {
      tag = "a";
      data.attrs = {href: this.link};
    }

    return h(tag, data, children);
  }
};

var input = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui",class:[{disabled: _vm.disabled, fluid: _vm.fluid, transparent: _vm.transparent, inverted: _vm.inverted}, _vm.getSize, _vm.getLabeled, _vm.getIcon, "input", {error: _vm.error, focus: _vm.focus, loading: _vm.loading}]},[_c('input',_vm._g(_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.input),expression:"input"}],attrs:{"type":_vm.type},domProps:{"value":(_vm.input)},on:{"input":function($event){if($event.target.composing){ return; }_vm.input=$event.target.value;}}},'input',_vm.$attr,false),_vm.$listeners)),_vm._t("default")],2)},staticRenderFns: [],
  name: "UiInput",
  mixins: [Size()],
  props: {
    focus: Boolean,
    loading: Boolean,
    disabled: Boolean,
    error: Boolean,
    transparent: Boolean,
    inverted: Boolean,
    fluid: Boolean,

    labeled: String,
    icon: String,

    value: String,
    type: {
      type: String,
      default: "text"
    }
  },
  computed: {
    input: {
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.$emit("input", value);
      }
    },
    getLabeled: function getLabeled() {
      if(this.labeled) {
        return this.labeled ? ((this.labeled) + " labeled") : "labeled";
      }
    },
    getIcon: function getIcon() {
      if(this.icon) {
        return this.icon ? ((this.icon) + " icon") : "icon";
      }
    }
  },
};

var ATTACHMENTS$1 = ["top", "bottom", "top right", "top left", "bottom right", "bottom left"];

var label = {
  name: "UiLabel",
  mixins: [Color(), Size(), Attach.apply(void 0, ATTACHMENTS$1)],
  props: {
    image: Boolean,
    basic: Boolean,
    tag: Boolean,
    horizontal: Boolean,
    floating: Boolean,

    link: String,
    ribbon: {
      type: String,
      validator: function (value) { return value === "" || value === "right"; }
    },
    circular: {
      type: String,
      validator: function (value) { return value === "" || value === "empty"; }
    },
    corner: {
      type: String,
      validator: function (value) { return value === "left" || value === "right"; }
    },
    pointing: {
      type: String,
      validator : function (value) { return value === "" || POINTINGS.includes(value); }
    }
  },
  computed: {
    getRibbon: function getRibbon() {
      if(typeof this.ribbon === "string") {
        return this.ribbon ? ((this.ribbon) + " ribbon") : "ribbon";
      }
    },
    getCircular: function getCircular() {
      if(typeof this.circular === "string") {
        return this.circular ? "empty circular" : "circular";
      }
    },
    getCorner: function getCorner() {
      if(this.corner) {
        return ((this.corner) + " corner");
      }
    },
    getPointing: function getPointing() {
      var value = this.pointing;

      if(value) {
        if(value === "below") {
          return "pointing below";
        }
        return (value + " pointing");
      } else if(value === "") {
        return "pointing";
      }
    }
  },
  render: function render(h) {
    var ref = this;
    var size = ref.size;
    var color = ref.color;
    var basic = ref.basic;
    var horizontal = ref.horizontal;
    var image = ref.image;
    var tag = ref.tag;
    var getAttach = ref.getAttach;
    var getRibbon = ref.getRibbon;
    var getCircular = ref.getCircular;
    var getPointing = ref.getPointing;
    var getCorner = ref.getCorner;
    var floating = ref.floating;
    var data = {
      staticClass: "ui",
      class: [size, color, { basic: basic, horizontal: horizontal, image: image, tag: tag }, getAttach, getRibbon, getCircular, getPointing, getCorner, "label", { floating: floating }]
    };

    if(this.link) {
      data.props = {href: this.link};
    }
    return h(this.link ? "a" : "div", data, this.$slots.default);
  }
};

var list = {
  name: "UiList",
  mixins: [Size()],
  props: {
    bulleted: Boolean,
    ordered: Boolean,
    link: Boolean,

    horizontal: Boolean,
    inverted: Boolean,
    selection: Boolean,
    animated: Boolean,
    divided: Boolean,
    celled: Boolean,

    relaxed: String,
  },
  computed: {
    getRelaxed: function getRelaxed() {
      if(typeof this.relaxed === "string") {
        return this.relaxed ? ((this.relaxed) + " relaxed") : "relaxed";
      }
    }
  },
  render: function render(h) {
    var ref = this;
    var size = ref.size;
    var link = ref.link;
    var horizontal = ref.horizontal;
    var inverted = ref.inverted;
    var selection = ref.selection;
    var animated = ref.animated;
    var divided = ref.divided;
    var celled = ref.celled;
    var getRelaxed = ref.getRelaxed;
    var data = {
      staticClass: "ui",
      class: [size, getRelaxed, {inverted: inverted, horizontal: horizontal, divided: divided, celled: celled, selection: selection, animated: animated, link: link}, "list"]
    };
    var tag = "div";

    if(this.bulleted) {
      tag = "ul";
    } else if(this.ordered) {
      tag = "ol";
    }


    return h(tag, data, this.$slots.default);
  }
};

var segment = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui",class:[{disabled: _vm.disabled, loading: _vm.loading, basic: _vm.basic, secondary: _vm.secondary, tertiary: _vm.tertiary}, _vm.color, _vm.getAttach, {compact: _vm.compact, circular: _vm.circular, raised: _vm.raised, piled: _vm.piled, vertical: _vm.vertical, inverted: _vm.inverted, clear: _vm.clear}, _vm.getFloat, _vm.getAlign, _vm.getPadded, _vm.getStack, "segment"]},[_vm._t("default")],2)},staticRenderFns: [],
  name: "UiSegment",
  mixins: [Float(), Color(), Align(), Attach("top", "bottom"), Padded("very")],
  props: {
    disabled: Boolean,
    loading: Boolean,
    basic: Boolean,
    secondary: Boolean,
    tertiary: Boolean,
    compact: Boolean,
    circular: Boolean,
    raised: Boolean,
    piled: Boolean,
    vertical: Boolean,
    inverted: Boolean,
    clear: Boolean,

    stack: {
      type: String,
      validator: function (value) { return value === "" || value === "tall"; }
    }
  },
  computed: {
    getStack: function getStack() {
      if(this.stack) {
        return this.stack === "tall" ? "tall stacked" : "stacked";
      }
    }
  }
};



var Elements = Object.freeze({
	Button: button,
	Container: container,
	Divider: divider,
	Flag: flag,
	Header: header,
	Icon: icon,
	Image: image,
	Input: input,
	Label: label,
	List: list,
	Segment: segment
});

var message = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ui-transition',{attrs:{"name":_vm.transition}},[(_vm.open)?_c('div',{staticClass:"ui",class:[ {hidden: _vm.hidden, visible: _vm.visible, floating: _vm.floating, compact: _vm.compact}, _vm.getAttach, {warning: _vm.warning, info: _vm.info, positive: _vm.positive, success: _vm.success, negative: _vm.negative, error: _vm.error}, {icon: _vm.icon}, _vm.size, _vm.color, "message" ]},[(_vm.icon)?_c('ui-icon',{attrs:{"icon":_vm.icon}}):_vm._e(),_c('div',{staticClass:"content"},[_vm._t("default")],2),(_vm.dismiss)?_c('ui-icon',{attrs:{"icon":"close"},on:{"click":_vm.onDismiss}}):_vm._e()],1):_vm._e()])},staticRenderFns: [],
  name: "UiMessage",
  mixins: [Color(), Size(), Attach("top", "bottom")],
  props: {
    dismiss: Boolean,
    hidden: Boolean,
    visible: Boolean,
    floating: Boolean,
    compact: Boolean,
    // Variations
    warning: Boolean,
    info: Boolean,
    positive: Boolean,
    success: Boolean,
    negative: Boolean,
    error: Boolean,

    icon: String,
    transition: {
      type: String,
      default: "fade"
    },
  },
  data: function data() {
    return {open: true};
  },
  methods: {
    onDismiss: function onDismiss() {
      this.$emit("dismiss", this);
      this.open = false;
    }
  }
};

var grid = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui",class:[_vm.getFloat, _vm.getAlign, _vm.getReversed, _vm.getColumns, {equalWidth: _vm.equalWidth, centered: _vm.centered}, _vm.getRelaxed, _vm.getDivided, _vm.getCelled, _vm.getPadded, {doubling: _vm.doubling, stackable: _vm.stackable}, "grid", {container: _vm.container}]},[_vm._t("default")],2)},staticRenderFns: [],
  name: "UiGrid",
  mixins: [Float(), Align("middle", "justified"), Padded()],
  props: {
    equalWidth: Boolean,
    centered: Boolean,
    doubling: Boolean,
    stackable: Boolean,
    container: Boolean,

    //TODO: add full support for reversed
    reversed: String,
    divided: {
      type: String,
      validator: function (value) { return function (value) { return value === "" || value === "vertically"; }; }
    },
    celled: {
      type: String,
      validator: function (value) { return function (value) { return value === "" || value === "internally"; }; }
    },
    relaxed: {
      type: String,
      validator: function (value) { return function (value) { return value === "" || value === "very"; }; }
    },

    columns: {
      type: [Number, String],
      validator: function (value) { return value >= 1 && value <= 16; }
    }
  },
  computed: {
    getReversed: function getReversed() {
      if(typeof this.reversed === "string") {
        return this.reversed ? ((this.reversed) + " reversed") : "reversed";
      }
    },
    getRelaxed: function getRelaxed() {
      if(typeof this.relaxed === "string") {
        return this.relaxed ? ((this.relaxed) + " relaxed") : "relaxed";
      }
    },
    getCelled: function getCelled() {
      if(typeof this.celled === "string") {
        return this.celled ? ((this.celled) + " celled") : "celled";
      }
    },
    getDivided: function getDivided() {
      if(typeof this.divided === "string") {
        return this.divided ? ((this.divided) + " divided") : "divided";
      }
    },
    getColumns: function getColumns() {
      var width = WIDTHS[this.columns];
      if(width) {
        return (width + " column");
      }
    }
  }
};

var row = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[_vm.getFloat, _vm.getAlign, _vm.color, _vm.getColumns, "row"]},[_vm._t("default")],2)},staticRenderFns: [],
  name: "UiRow",
  mixins: [Color(), Float(), Align("middle", "justified")],
  props: {
    columns: {
      type: [Number, String],
      validator: function (value) { return value >= 1 && value <= 16; }
    }
  },
  computed: {
    getColumns: function getColumns() {
      var width = WIDTHS[this.columns];
      return width ? width + " column" : null;
    }
  }
};

var column = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[_vm.getFloat, _vm.getAlign, _vm.color, _vm.getWidth, "column"]},[_vm._t("default")],2)},staticRenderFns: [],
  name: "UiColumn",
  mixins: [Color(), Float(), Align("middle", "justified")],
  props: {
    width: {
      type: [Number, String],
      validator: function (value) { return value >= 1 && value <= 16; }
    }
  },
  computed: {
    getWidth: function getWidth() {
      var width = WIDTHS[this.width];
      return width ? width + " wide" : null;
    }
  }
};



var Collections = Object.freeze({
	Message: message,
	Grid: grid,
	Row: row,
	Column: column
});

var checkbox = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui",class:[{readOnly: _vm.readOnly, disabled: _vm.disabled, fitted: _vm.fitted}, _vm.theme, "checkbox"]},[_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],attrs:{"type":"checkbox","tabindex":"0"},domProps:{"value":_vm.value,"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,_vm.value)>-1:(_vm.model)},on:{"__c":function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=_vm.value,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.model=$$a.concat($$v));}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.model=$$c;}}}},'input',_vm.$attrs,false)),_c('label',[_vm._t("default")],2)])},staticRenderFns: [],
  name: "UiCheckbox",
  mixins: [Inputbox(null)]
};

var dropdown = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui dropdown",class:[{active: _vm.open}, {selection: _vm.selection}, {upward: _vm.upward}],on:{"click":_vm.click}},[(_vm.name)?_c('input',{attrs:{"type":"hidden","name":_vm.name}}):_vm._e(),(!_vm.value && _vm.text)?_c('div',{staticClass:"default text"},[_vm._v(_vm._s(_vm.text))]):_c('div',{staticClass:"text"},[_vm._v(_vm._s(_vm.value))]),_c('ui-icon',{attrs:{"icon":"dropdown"}}),_c('ui-transition',{attrs:{"name":"slide down"}},[(_vm.open)?_c('div',{staticClass:"menu",on:{"click":_vm.itemClick}},[_vm._t("default")],2):_vm._e()])],1)},staticRenderFns: [],
  name: "UiDropdown",
  props: {
    selection: Boolean,
    upward: Boolean,
    //multiple: Boolean,
    text: String,
    name: String
  },
  model: {
    prop: "value",
    event: "change"
  },
  data: function data() {
    return { open: false, value: null };
  },
  methods: {
    itemClick: function itemClick(e) {
      var text = e.target.textContent;

      debugger;
      if (this.multiple) {
        this.value.push(text);
      } else {
        this.value = text;
      }

      this.$emit("change", this.value);
    },
    click: function click(e) {
      this.open = !this.open; // invert open because clicking changes state
    }
  }
};

var progress = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui",class:[_vm.getAttach, {indicating: _vm.indicating}, _vm.size, _vm.color, {inverted: _vm.inverted, disabled: _vm.disabled, active: _vm.active}, "progress", {success: _vm.success, error: _vm.error, warning: _vm.warning}],attrs:{"data-percent":_vm.progress}},[_c('div',{staticClass:"bar",style:(_vm.style)},[(_vm.getRatio)?_c('div',{staticClass:"progress"},[_vm._v(_vm._s(_vm.getRatio))]):_vm._e()]),(_vm.hasLabel)?_c('div',{staticClass:"label"},[_vm._t("default")],2):_vm._e()])},staticRenderFns: [],
  name: "UiProgress",
  mixins: [Color(), Size(), Attach("top", "bottom")],
  props: {
    indicating: Boolean,
    active: Boolean,
    success: Boolean,
    warning: Boolean,
    error: Boolean,
    disabled: Boolean,
    inverted: Boolean,

    ratio: String,

    value: {
      type: [String, Number],
      default: 0
    },
    duration: {
      type: [String, Number],
      default: 500
    },
    total: {
      type: [String, Number],
      default: 100
    }
  },
  computed: {
    hasLabel: function hasLabel() {
      return !!this.$slots.default;
    },
    style: function style() {
      return {
        width: ((this.progress) + "%"),
        transitionDuration: ((this.duration) + "ms")
      };
    },
    getRatio: function getRatio() {
      var props = {
        value: this.value,
        progress: this.progress,
        total: this.total
      };

      if(this.ratio) {
        return this.ratio.replace(/{([a-z]+)}/g, function (match, prop) {
          var value = props[prop];
          return value ? value : "";
        });
      }
    },
    progress: function progress() {
      if(this.value) {
        var progress = ((this.value / this.total) * 100).toFixed();
        this.$emit("progress", progress);

        if (progress === 100) {
          this.$emit("done");
        }
        return progress;
      }
    }
  }
};

var radio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui",class:[{readOnly: _vm.readOnly, disabled: _vm.disabled, fitted: _vm.fitted}, _vm.theme, "checkbox"]},[_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],attrs:{"type":"radio","tabindex":"0"},domProps:{"value":_vm.value,"checked":_vm._q(_vm.model,_vm.value)},on:{"__c":function($event){_vm.model=_vm.value;}}},'input',_vm.$attrs,false)),_c('label',[_vm._t("default")],2)])},staticRenderFns: [],
  name: "UiRadio",
  mixins: [Inputbox("radio")]
};

var rating = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui",class:[_vm.size, {star: _vm.star, heart: _vm.heart}, "rating", {disabled: _vm.disabled}],on:{"mouseleave":_vm.mouseLeave,"mouseover":_vm.mouseOver}},[_vm._l((_vm.values),function(value){return [_c('i',{staticClass:"icon",class:{active: value <= _vm.rating},on:{"click":_vm.click}})]})],2)},staticRenderFns: [],
  name: "UiRating",
  mixins: [Size()],
  model: {
    prop: "rating",
    event: "input"
  },
  props: {
    heart: Boolean,
    star: Boolean,
    disabled: Boolean,

    maxRating: {
      type: [Number, String],
      default: 4
    },
    rating: {
      type: [Number, String],
      default: 0
    }
  },
  methods: {
    click: function click() {
      if(this.disabled) {
        return;
      }
      this.input = this.value;
    },
    mouseLeave: function mouseLeave(e) {
      if(this.disabled) {
        return;
      }

      var ref = e.target;
      var childNodes = ref.childNodes;
      childNodes.forEach(function (child) { return child.classList.remove("selected"); });
    },
    mouseOver: function mouseOver(e) {
      if(this.disabled) {
        return;
      }

      var ref = e.target.parentNode;
      var childNodes = ref.childNodes;
      childNodes.reduce(function (found, child) {
        if(found) {
          child.classList.remove("selected");
        } else {
          found = child === target;
          child.classList.add("selected");
        }
        return found;
      }, false);
    }
  },
  computed: {
    input: {
      get: function get() {
        return this.value;
      },
      set: function set(value) {
        this.$emit("input", value);
      }
    },
    values: function values() {
      var arr = [];
      for(var n = 1; n <= this.maxRating; n++) {
        arr.push(n);
      }
      return arr;
    }
  },
};

var transition = {
  name: "UiTransition",
  functional: true,
  props: {
    name: {
      type: String,
      validator: function (value) { return TRANSITIONS.includes(value); },
      default: "fade"
    },
    duration: String
  },
  render: function render(h, ctx) {
    var props = ctx.props;
    var data = ctx.data;
    var show, hide, duration = props.duration;

    if (data && data.on) {
      show = data.on.show;
      hide = data.on.hide;
    }

    // Modify the props and events to pass on to the vue transition component
    data.props = {
      type: "animation",
      enterActiveClass: ("animating " + (props.name) + " in"),
      leaveActiveClass: ("transition animating " + (props.name) + " out")
    };
    data.on = {
      beforeEnter: function beforeEnter(el) {
        el.classList.add("transition");
        el.classList.add("visible");
        if(duration) {
          el.style.animationDuration = duration;
        }

        if (typeof show === "function") {
          show(el);
        }
      },
      afterEnter: function afterEnter(el) {
        if (duration) {
          el.style.animationDuration = "";
        }
      },
      beforeLeave: function beforeLeave(el) {
        if (duration) {
          el.style.animationDuration = duration;
        }
      },
      afterLeave: function afterLeave(el) {
        el.classList.remove("visible");
        if (duration) {
          el.style.animationDuration = "";
        }

        if (typeof hide === "function") {
          hide(el);
        }
      }
    };
    return h("transition", data, ctx.children);
  }
};



var Modules = Object.freeze({
	Checkbox: checkbox,
	Dropdown: dropdown,
	Progress: progress,
	Radio: radio,
	Rating: rating,
	Transition: transition
});

//import * as Views from "./views";
//import * as Customs from "./custom";

//export * from "./constants";
//export {Elements, Collections, Views, Mixins, Modules, Customs};

//TODO: make option manager in mixins and other stuff...instead of having options in components
var index = {
  install: function install(Vue, options) {
    var register = function (components) {
      Object.keys(components).forEach(function (key) {
        var component = components[key];
        Vue.component(component.name, component);
      });
    };
    
    register(Elements);
    register(Collections);
    //register(Views);
    register(Modules);
    //register(Customs);
  }
};

module.exports = index;
//# sourceMappingURL=semantic-ui-vue.common.js.map
