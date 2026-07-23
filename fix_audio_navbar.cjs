const cheerio = require('cheerio');
const fs = require('fs');

const html = fs.readFileSync('site/index.html', 'utf-8');
const $ = cheerio.load(html, { decodeEntities: false });

// 1. Remove audio elements
$('audio').remove();

// 2. Remove the sound toggle button (usually navbar_left_sound_container or similar)
// Let's find it. Looking at the HTML, the button next to CTA has some class.
// We can find the button that has an SVG for sound.
// Actually, let's just search for any element containing 'sound' in its class or ID
$('*[class*="sound"]').remove();

// 3. Inject solid CSS overrides for navbar and grey text
// Note: We already removed mix-blend-mode from the CSS file directly, so services text will just need to be black if it's still white/grey.
$('head').append(`
<style>
  /* Force Navbar text and logo to be black */
  .navbar_link, .navbar_links_li, .navbar_home_svg, .navbar_logo_text {
    color: var(--swatch--black-400) !important;
  }
  
  /* Force Services headings to be black */
  .services_home_heading, .g_eyebrow_text, .services_home_heading-inner, .problem_stats_index_text {
    color: var(--swatch--black-400) !important;
  }
  
  /* The logo SVG paths might need fill/stroke */
  .navbar_home_svg path {
    fill: currentColor !important;
  }
</style>
`);

fs.writeFileSync('site/index.html', $.html(), 'utf-8');
console.log('Applied fixes for audio, navbar color, and services text.');
