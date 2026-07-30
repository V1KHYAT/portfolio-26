const fs = require("fs");
let html = fs.readFileSync("site/index.html", "utf8");

const newCss = `
    .works_home_cover.u-ratio-1-1 {
      aspect-ratio: 4 / 3 !important;
    }
    body .works_home_image {
      transform: scale(1.05);
    }
    .reel_home_cover {
      z-index: 10 !important;
      position: absolute !important;
      top: 0; left: 0; width: 100%; height: 100%;
      display: flex !important;
      justify-content: center;
      align-items: center;
      pointer-events: none;
    }
    .hover-slideshow {
      position: relative;
      width: 75%;
      aspect-ratio: 3 / 2;
      border-radius: var(--radius--small);
      overflow: hidden;
    }
    .hover-slideshow img.slide {
      animation-play-state: paused;
    }
    .works_home_item:hover .hover-slideshow img.slide {
      animation-play-state: running;
    }
    @media (hover: hover) and (pointer: fine) {
      .works_home_item:hover .reel_home_cover {
        display: flex !important;
      }
    }
    @media (hover: none) or (pointer: coarse) {
      .works_home_item.is-active .reel_home_cover {
        display: flex !important;
      }
    }
  </style>
`;

html = html.replace("</style>\n</head>", newCss + "</head>");

fs.writeFileSync("site/index.html", html, "utf8");
console.log("Injected missing CSS");
