const fs = require("fs");

let baseHTML = fs.readFileSync("site/index.html", "utf8");

const secHeroIdx = baseHTML.indexOf('<section data-animate="" data-theme-section="light" data-scroll-container="" data-target-translate="100" data-overlay-container="" class="hero_home_wrap">');
const secAboutIdx = baseHTML.indexOf('<section data-theme-section="light" data-stacking-cards-item="" data-slider="" class="problems_home_wrap">');
const secWorkIdx = baseHTML.indexOf('<section id="work" data-theme-section="light" class="works_home_wrap u-theme-light">');
const secPlayIdx = baseHTML.indexOf('<section id="faqs" class="faq_home_wrap u-grid-custom">');
const secCtaIdx = baseHTML.indexOf('<section class="cta_home_wrap">');
const footerIdx = baseHTML.indexOf('<footer');

if (secHeroIdx === -1 || secAboutIdx === -1 || secWorkIdx === -1 || secPlayIdx === -1 || footerIdx === -1) {
    console.error("Could not find one of the sections!");
    process.exit(1);
}

// Slice the document
let headerPart = baseHTML.substring(0, secHeroIdx);
const heroPart = baseHTML.substring(secHeroIdx, secAboutIdx);
const aboutPart = baseHTML.substring(secAboutIdx, secWorkIdx);
const workPart = baseHTML.substring(secWorkIdx, secPlayIdx);

// The Play part ends where CTA begins, or if CTA is missing, where footer begins
const playEndIdx = secCtaIdx !== -1 ? secCtaIdx : footerIdx;
const playPart = baseHTML.substring(secPlayIdx, playEndIdx);

const footerPart = baseHTML.substring(footerIdx);

// Inject CSS into headerPart
const fixesCss = `
  <style id="custom-fixes-css">
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

    .cta_home_wrap { display: none !important; }

    .works_home_item img[src*="ComingSoon"] {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      position: absolute !important;
      top: 0; left: 0;
    }

    .navbar_contain, .navbar_home_svg, .navbar_menu_span, .navbar_link, .footer_nav_span {
      color: var(--swatch--black-400) !important;
    }
    .navbar_wrap {
      visibility: visible !important;
      opacity: 1 !important;
    }

    .footer-wrap-dark, .footer_canvas_bottom {
      display: none !important;
    }
  </style>
`;
if (!headerPart.includes('id="custom-fixes-css"')) {
    headerPart = headerPart.replace("</head>", fixesCss + "\n  </head>");
}

function updateNavLinks(content) {
    let newContent = content.replace(/href="\/"/g, 'href="index.html"');
    newContent = newContent.replace(/href="\/projects"/g, 'href="work.html"');
    newContent = newContent.replace(/href="\/play"/g, 'href="play.html"');
    return newContent;
}

headerPart = updateNavLinks(headerPart);

// Assemble the pages
const indexPage = headerPart + heroPart + aboutPart + footerPart;
const workPage = headerPart + workPart + footerPart;
const playPage = headerPart + playPart + footerPart;

fs.writeFileSync("site/index.html", indexPage);
fs.writeFileSync("site/work.html", workPage);
fs.writeFileSync("site/play.html", playPage);

console.log("Pages regenerated correctly with CSS fixes!");
