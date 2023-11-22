import path from "path";
// import {Playground} from "./playground.js";
import { fileURLToPath } from "url";

// console.log(path, Playground.NUM);

// ============ самовызывающаяся функция
// (function(module, require, __dirname, __filename) {
// })()
//

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// console.log(import.meta.url);

console.log(__dirname);
console.log(__filename);

