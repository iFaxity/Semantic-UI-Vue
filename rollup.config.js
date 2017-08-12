import vue from "rollup-plugin-vue";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import buble from "rollup-plugin-buble";
import uglify from "rollup-plugin-uglify";

const plugins = [
  nodeResolve({
    jsnext: true,
    main: true,
    preferBuiltins: true
  }),
  commonjs(),
  vue(),
  buble({ exclude: "node_modules/**" }),
];

if (process.env.NODE_ENV === "production") {
  plugins.push(uglify());
}

export default {
  entry: "src/index.js",
  plugins,
  targets: [
    {
      dest: "dist/semantic-ui-vue.js",
      moduleName: "semantic-ui-vue",
      format: "umd",
      sourceMap: true
    },
    {
      dest: "dist/semantic-ui-vue.esm.js",
      format: "es",
      sourceMap: true
    },
    {
      dest: "dist/semantic-ui-vue.common.js",
      format: "cjs",
      sourceMap: true
    }
  ],
  sourceMap: true,
};
