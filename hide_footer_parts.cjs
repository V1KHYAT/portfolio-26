const fs = require("fs");

let html = fs.readFileSync("site/index.html", "utf8");

// Add CSS to hide the footer_bottom and footer_canvas_wrap
const styleToInject = `
<style>
  .footer_bottom, .footer_canvas_wrap {
    display: none !important;
  }
  .footer_wrap {
    padding-bottom: 5rem !important; /* give it some breathing room since we removed the bottom part */
  }
</style>
`;

if (!html.includes('footer_bottom, .footer_canvas_wrap')) {
  html = html.replace('</head>', styleToInject + '</head>');
  fs.writeFileSync("site/index.html", html);
  console.log("Successfully injected CSS to hide the footer bottom and canvas");
} else {
  console.log("CSS already injected");
}
