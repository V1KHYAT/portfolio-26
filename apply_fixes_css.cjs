const fs = require("fs");

let html = fs.readFileSync("site/index.html", "utf8");

const fixesCss = `
  <style id="custom-fixes-css">
    /* Fix hover images aspect ratio and dimensions */
    .hover-slideshow {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      position: relative !important;
      width: 100% !important;
      height: auto !important;
      aspect-ratio: 3 / 2 !important;
    }
    .hover-slideshow img.slide {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      object-fit: cover !important;
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

    /* Remove CTA section */
    .cta_home_wrap {
      display: none !important;
    }

    /* Fix Coming Soon image size to prevent being full screen */
    .works_home_item img[src*="ComingSoon"] {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      position: absolute !important;
      top: 0; left: 0;
    }

    /* Ensure navbar is visible and black text over footer */
    .navbar_contain, .navbar_home_svg, .navbar_menu_span, .navbar_link, .footer_nav_span {
      color: var(--swatch--black-400) !important;
    }
    .navbar_wrap {
      visibility: visible !important;
      opacity: 1 !important;
    }

    /* Remove the footer gradient and the large text inside the canvas */
    .footer-wrap-dark,
    .footer_canvas_bottom {
      display: none !important;
    }
  </style>
`;

if (!html.includes('id="custom-fixes-css"')) {
    html = html.replace("</head>", fixesCss + "\n  </head>");
    fs.writeFileSync("site/index.html", html, "utf8");
    console.log("Injected fixes CSS safely.");
}
