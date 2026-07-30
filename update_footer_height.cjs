const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

const oldCss = `  .footer_wrap {
    padding-bottom: 5rem !important; /* give it some breathing room since we removed the bottom part */
  }`;

const newCss = `  .footer_wrap {
    min-height: 100vh !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    padding-bottom: 5rem !important;
  }`;

html = html.replace(oldCss, newCss);

fs.writeFileSync("site/index.html", html);
console.log("Updated footer to be 100vh and centered.");
