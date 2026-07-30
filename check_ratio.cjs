const fs = require("fs");
const css = fs.readFileSync("site/css/bym0n0l0g.webflow.shared.e9a9b6790.min.css", "utf8");

const matches = css.match(/[^{}]*aspect-ratio[^{}]*\{[^}]*\}/g);
console.log(matches ? matches.slice(0, 10) : "No aspect-ratio found");

const worksHomeCover = css.match(/[^{}]*\.works_home_cover[^{}]*\{[^}]*\}/g);
console.log(worksHomeCover ? worksHomeCover : "No works_home_cover found");
