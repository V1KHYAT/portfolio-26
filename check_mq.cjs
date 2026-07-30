const fs = require("fs");
const css = fs.readFileSync("site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css", "utf8");
let idx = 217486;
// find the nearest @media before this index
let textBefore = css.substring(0, idx);
let lastMedia = textBefore.lastIndexOf("@media");
console.log("Last media query before 217486 is at index", lastMedia);
console.log("It says:", textBefore.substring(lastMedia, lastMedia + 100));
