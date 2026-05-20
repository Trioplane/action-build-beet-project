import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const config = [
    {
        input: "src/validate.js",
        output: {
          esModule: true,
          file: "dist/validate.js",
          format: "es",
          sourcemap: true,
        },
        plugins: [commonjs(), nodeResolve({ preferBuiltins: true })],
    },
    {
        input: "src/build.js",
        output: {
          esModule: true,
          file: "dist/build.js",
          format: "es",
          sourcemap: true,
        },
        plugins: [commonjs(), nodeResolve({ preferBuiltins: true })],
    },
];

export default config;
