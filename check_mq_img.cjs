const fs = require("fs");
const css = fs.readFileSync("site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css", "utf8");
let mqIdx = css.indexOf("@media screen and (max-width:991px)");
let nextMq = css.indexOf("@media", mqIdx + 1);
let mqBlock = css.substring(mqIdx, nextMq !== -1 ? nextMq : css.length);
console.log("Image overrides in mobile:", mqBlock.match(/\.works_home_image\{[^}]*\}/));
console.log("Cover overrides in mobile:", mqBlock.match(/\.works_home_cover\{[^}]*\}/));
