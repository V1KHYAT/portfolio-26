const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

const css = `
  .reel_home_cover {
    z-index: 10 !important;
    position: absolute !important;
    top: 0; left: 0; width: 100%; height: 100%;
  }
`;

html = html.replace('.reel_home_cover {\n    z-index: 10 !important;\n  }', css);
fs.writeFileSync("site/index.html", html, "utf8");
console.log("Fixed reel_home_cover dimensions");
