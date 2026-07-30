const fs = require("fs");

let html = fs.readFileSync("site/index.html", "utf8");

// replace the injected block
const oldStyle = `
<style>
  .faq_home_wrap {
    background-color: var(--swatch--beige-400, #F3EBE2) !important;
    position: relative !important;
    z-index: 10 !important;
  }
</style>
`;
const newStyle = `
<style>
  .faq_home_wrap {
    background-color: var(--swatch--beige-100, #F3EBE2) !important;
    position: relative !important;
    z-index: 10 !important;
  }
</style>
`;

if (html.includes(oldStyle)) {
  html = html.replace(oldStyle, newStyle);
  fs.writeFileSync("site/index.html", html);
  console.log("Successfully updated background color to var(--swatch--beige-100).");
} else {
  console.log("Could not find old style to replace.");
}
