const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

// We'll update the injected style block
// from:
//   .faq_home_wrap {
//     background-color: var(--swatch--beige-100, #F3EBE2) !important;
//     position: relative !important;
//     z-index: 10 !important;
//   }
//   .navbar_wrap {
//     z-index: 999 !important;
//   }
// to:
//   .faq_home_wrap {
//     background-color: var(--swatch--beige-100, #F3EBE2) !important;
//     position: relative !important;
//     z-index: 2 !important; /* Just enough to be above the footer if footer is 1 */
//   }
//   .navbar_wrap {
//     z-index: 9999 !important;
//     transform: translateZ(999px) !important; /* Force 3D priority */
//   }

html = html.replace(/z-index:\s*10\s*!important;/g, "z-index: 2 !important;");
html = html.replace(/\.navbar_wrap\s*\{[^}]+\}/, ".navbar_wrap {\n    z-index: 9999 !important;\n    transform: translateZ(999px) !important;\n  }");

fs.writeFileSync("site/index.html", html);
console.log("Updated injected CSS");
