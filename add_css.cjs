const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

const css = `
  .hover-slideshow {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .hover-slideshow img.slide {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    object-fit: cover;
    opacity: 0;
    animation: slideshow 2s infinite;
  }
  .hover-slideshow img.s1 { animation-delay: 0s; }
  .hover-slideshow img.s2 { animation-delay: 0.5s; }
  .hover-slideshow img.s3 { animation-delay: 1.0s; }
  .hover-slideshow img.s4 { animation-delay: 1.5s; }

  @keyframes slideshow {
    0%, 25% { opacity: 1; }
    25.01%, 100% { opacity: 0; }
  }
`;

html = html.replace('</style>', css + '\n</style>');
fs.writeFileSync("site/index.html", html, "utf8");
console.log("CSS injected");
