const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('site/index.html', 'utf-8');
const $ = cheerio.load(html, { decodeEntities: false });

// Safely modify hero text
const heroTitle = $('.hero_home_content .hero_home_title');
heroTitle.html("Hey, I'm <span style=\"font-family: serif; font-style: italic;\">Vikhyat</span>.");
heroTitle.attr('style', 'font-size: 15vw; line-height: 1; margin: 0; color: var(--swatch--black-400);');

const heroDesc = $('.hero_home_content .hero_home_desc');
heroDesc.html('I design human-centered experiences.<br>Focusing on clarity, comfort, and curiosity in every interaction.');

fs.writeFileSync('site/index.html', $.html(), 'utf-8');
console.log('Successfully updated hero section using Cheerio!');
