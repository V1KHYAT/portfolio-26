const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

const css = `
  /* Reduce crop on Featured Projects */
  .works_home_cover.u-ratio-1-1 {
    aspect-ratio: 4 / 3 !important;
  }
  body .works_home_image {
    transform: scale(1.05);
  }
`;

html = html.replace('</style>', css + '\n</style>');
fs.writeFileSync("site/index.html", html, "utf8");
console.log("Aspect ratio CSS injected");
