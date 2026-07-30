const fs = require("fs");

let html = fs.readFileSync("site/index.html", "utf8");

// We'll append a CSS block right before </head>
const styleToInject = `
<style>
  .faq_home_wrap {
    background-color: var(--theme--background, #F2EAE0) !important;
    position: relative !important;
    z-index: 10 !important;
  }
</style>
`;

if (html.includes("</head>")) {
  html = html.replace("</head>", styleToInject + "</head>");
  fs.writeFileSync("site/index.html", html);
  console.log("Successfully injected background fix for FAQ section.");
} else {
  console.log("Could not find </head>.");
}
