const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('site/index.html', 'utf-8');
const $ = cheerio.load(html, { decodeEntities: false });

// Safely modify hero text
const heroSvg = $('.hero_home_content .hero_home_content_svg');
heroSvg.replaceWith('<h1 class="hero_home_title u-text-style-h1" style="font-size: 15vw; line-height: 1; margin: 0; color: var(--swatch--black-400);">Hey, I\'m <span style="font-family: serif; font-style: italic;">Vikhyat</span>.</h1>');

const heroDesc = $('.hero_home_content .hero_home_content_p');
heroDesc.html('I design human-centered experiences.<br>Focusing on clarity, comfort, and curiosity in every interaction.');

fs.writeFileSync('site/index.html', $.html(), 'utf-8');
console.log('Successfully updated hero section using Cheerio!');
