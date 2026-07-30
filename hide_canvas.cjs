const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

// We just update the existing injected style block to include .footer_canvas_bottom
html = html.replace(".footer_bottom, .footer_canvas_wrap {", ".footer_bottom, .footer_canvas_wrap, .footer_canvas_bottom {");

fs.writeFileSync("site/index.html", html);
console.log("Updated CSS to hide .footer_canvas_bottom");
