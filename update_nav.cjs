const fs = require('fs');
let html = fs.readFileSync('site/index.html', 'utf-8');

// 1. Update Navbar links
const navLinks = [
  { name: 'Home', link: '/' },
  { name: 'Projects', link: '/projects' },
  { name: 'Play', link: '/play' },
  { name: 'Connect', link: '#contact' }
];

let newNavLi = '';
for (const n of navLinks) {
  newNavLi += `
              <li data-wf--navbar-links--variant="base" class="navbar_links_li">
                <a href="${n.link}" data-link-hover="" class="navbar_link w-inline-block">
                  <div class="footer_nav_span u-text-style-main">${n.name}</div>
                  <div class="footer_nav_span u-text-style-main is-soon">(SOON)</div>
                </a>
              </li>`;
}

const navUlStart = html.indexOf('<ul class="navbar_links_ul u-gap-small u-hflex-left-center">');
if (navUlStart !== -1) {
  const navUlContentStart = navUlStart + '<ul class="navbar_links_ul u-gap-small u-hflex-left-center">'.length;
  const navUlEnd = html.indexOf('</ul>', navUlContentStart);
  html = html.substring(0, navUlContentStart) + newNavLi + '\n            ' + html.substring(navUlEnd);
}

// 2. Update Footer Nav links
let newFooterLi = '';
for (const n of navLinks) {
  newFooterLi += `
                    <li data-wf--footer-link--variant="base" class="footer_nav_li">
                      <a href="${n.link}" data-hover-highlight="link" class="footer_nav_text w-inline-block">
                        <div data-hover-heading="" class="footer_nav_span u-text-style-h3">${n.name}</div>
                        <div data-footer-arrow="" class="footer_nav_span u-text-style-h3 is-arrow">→</div>
                      </a>
                    </li>`;
}

const footerUlStart = html.indexOf('<ul class="footer_nav_ul u-gap-small u-hflex-left-center">');
if (footerUlStart !== -1) {
  const footerUlContentStart = footerUlStart + '<ul class="footer_nav_ul u-gap-small u-hflex-left-center">'.length;
  const footerUlEnd = html.indexOf('</ul>', footerUlContentStart);
  html = html.substring(0, footerUlContentStart) + newFooterLi + '\n                  ' + html.substring(footerUlEnd);
}

// 3. Update Footer Social links
const socials = [
  { name: 'Linkedin', link: 'https://www.linkedin.com/in/vikhyatkaushik/' },
  { name: 'Twitter / X', link: 'https://twitter.com/vikhyatkaushik' },
  { name: 'Dribbble', link: 'https://dribbble.com/vikhyatkaushik' }
];

let newSocialLi = '';
for (const s of socials) {
  newSocialLi += `
                      <li data-hover-highlight="link" class="footer_socials_li">
                        <a href="${s.link}" target="_blank" class="footer_socials_link w-inline-block">
                          <div data-hover-heading="" class="footer_socials_text u-text-style-h4">${s.name} ↗</div>
                        </a>
                      </li>`;
}

const socialUlStart = html.indexOf('<ul class="footer_socials_ul">');
if (socialUlStart !== -1) {
  const socialUlContentStart = socialUlStart + '<ul class="footer_socials_ul">'.length;
  const socialUlEnd = html.indexOf('</ul>', socialUlContentStart);
  html = html.substring(0, socialUlContentStart) + newSocialLi + '\n                    ' + html.substring(socialUlEnd);
}

fs.writeFileSync('site/index.html', html);
console.log('Successfully updated navigation and footer!');
