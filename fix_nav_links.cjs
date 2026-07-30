const fs = require('fs');

let html = fs.readFileSync('site/index.html', 'utf8');

// 1. Fix Navbar Links
// Update Home link
html = html.replace(/href="index\.html"/g, 'href="#"');
// Update Projects link
html = html.replace(/href="work\.html"/g, 'href="#work"');
// Update Play link to Experience
html = html.replace(/href="play\.html"/g, 'href="#experience"');
html = html.replace(/<div class="footer_nav_span u-text-style-main"[^>]*>Play<\/div>/g, '<div class="footer_nav_span u-text-style-main" style="color: var(--swatch--black-400);">Experience</div>');

// 2. Fix Footer Links
// The footer has links to Work, Process, Services, Resources, Contact.
// We should remove Process, Services, Resources.
// Let's replace the whole footer link section. We will just regex replace the specific links to point to valid IDs, or remove them.
html = html.replace(/<a href="\/work".*?Work\s*<\/div>\s*<\/a>/s, '<a href="#work" data-hover-highlight="link" class="footer_nav_text w-inline-block"><div data-hover-heading="" class="footer_nav_span u-text-style-h3">Work</div></a>');

html = html.replace(/<a href="#process".*?Process\s*<\/div>\s*<\/a>/s, '');
html = html.replace(/<a href="#services".*?Services\s*<\/div>\s*<\/a>/s, '');
html = html.replace(/<a href="https:\/\/byhuy\.gumroad\.com\/".*?Resources\s*<\/div>\s*<\/a>/s, '');

// There might be two copies of footer links (mobile vs desktop), so let's do it globally
html = html.replace(/<a href="#process".*?Process\s*<\/div>\s*<\/a>/gs, '');
html = html.replace(/<a href="#services".*?Services\s*<\/div>\s*<\/a>/gs, '');
html = html.replace(/<a href="https:\/\/byhuy\.gumroad\.com\/".*?Resources\s*<\/div>\s*<\/a>/gs, '');

fs.writeFileSync('site/index.html', html, 'utf8');
console.log("Navigation links fixed to prevent Barba.js/GSAP crashes.");
