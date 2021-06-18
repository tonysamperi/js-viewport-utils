import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import json from "rollup-plugin-json";

const pkg = require("./package.json");
const libraryName = "js-viewport-utils";
const camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, "");
};

export default {
    input: `src/${libraryName}.ts`,
    output: [
        {file: pkg.main, name: "jsViewportUtils", format: "umd", sourcemap: true},
        {file: pkg.module, format: "cjs", sourcemap: true}
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [
        // "lodash.defaults",
        "jquery"
    ],
    watch: {
        include: "src/**"
    },
    plugins: [
        // Allow json resolution
        json(),
        // Compile TypeScript files
        typescript({useTsconfigDeclarationDir: true}),
        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs(),
        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve(),
        // Resolve source maps to the original source
        sourceMaps()
    ]
};
