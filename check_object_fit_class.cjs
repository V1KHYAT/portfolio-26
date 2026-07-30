const fs = require("fs");
const css = fs.readFileSync("site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css", "utf8");
// find the class that has object-fit:cover
const matches = css.match(/\.[a-zA-Z0-9_-]+\{[^}]*object-fit:\s*cover[^}]*\}/g);
console.log(matches);
