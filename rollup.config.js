import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
    input: "src/index.ts",
    output: [
        { file: "dist/index.js", format: "esm" },
        { file: "dist/index.cjs", format: "cjs" },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" }), nodeResolve()],
    external: ["leaflet"], //排除不需要打包的package
};
