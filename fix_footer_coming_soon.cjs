const fs = require("fs");

function processFile(file) {
    let html = fs.readFileSync(file, "utf8");
    let changed = false;

    // 1. Fix Coming Soon image (add hover-slideshow class)
    const comingSoonTarget = '<div class="reel_home_video">\n        <img src="images/The SaaS Dream/ComingSoon.png"';
    const comingSoonReplacement = '<div class="reel_home_video hover-slideshow">\n        <img src="images/The SaaS Dream/ComingSoon.png"';
    if (html.includes(comingSoonTarget)) {
        html = html.replace(comingSoonTarget, comingSoonReplacement);
        changed = true;
        console.log(`Fixed Coming Soon image in ${file}`);
    }

    // 2. Remove footer bottom (text + gradient)
    const footerBottomStart = html.indexOf('<div class="footer_bottom">');
    if (footerBottomStart !== -1) {
        const footerEnd = html.indexOf('</footer>', footerBottomStart);
        if (footerEnd !== -1) {
            html = html.substring(0, footerBottomStart) + html.substring(footerEnd);
            changed = true;
            console.log(`Removed footer bottom and gradient from ${file}`);
        }
    }

    // 3. Fix navbar hiding in footer
    const navFixCSS = `
    /* Force navbar visibility and color so it doesn't hide/blend into the light footer */
    .navbar_contain, .navbar_home_svg, .navbar_menu_span, .navbar_link, .footer_nav_span {
        color: var(--swatch--black-400) !important;
    }
    .navbar_wrap {
        visibility: visible !important;
        opacity: 1 !important;
    }
  </style>`;
    if (html.includes("</style>") && !html.includes("Force navbar visibility")) {
        html = html.replace("</style>", navFixCSS);
        changed = true;
        console.log(`Injected navbar fix CSS in ${file}`);
    }

    if (changed) {
        fs.writeFileSync(file, html, "utf8");
    }
}

["site/index.html", "site/work.html", "site/play.html"].forEach(processFile);
