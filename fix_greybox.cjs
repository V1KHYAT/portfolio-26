const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

const css = `
<style>
  .works_home_result_value {
    font-size: var(--_typography---font-size--text-main) !important;
    font-weight: 500 !important;
    margin-bottom: 0.25rem !important;
  }
  .works_home_result_label {
    font-size: var(--_typography---font-size--text-main) !important;
    max-width: 100% !important;
    opacity: 0.8 !important;
  }
</style>
</head>`;

html = html.replace("</head>", css);

fs.writeFileSync("site/index.html", html, "utf8");
console.log("Fixed grey box font sizes and width");
