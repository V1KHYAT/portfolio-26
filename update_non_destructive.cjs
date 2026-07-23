const cheerio = require('cheerio');
const fs = require('fs');

// Read the clean reverted html
const html = fs.readFileSync('site/index.html', 'utf-8');
const $ = cheerio.load(html, { decodeEntities: false });

// 1. Hero text: HIDE the SVG, add the h1
const heroSvg = $('.hero_home_content .hero_home_content_svg');
heroSvg.attr('style', 'opacity: 0; pointer-events: none; position: absolute; visibility: hidden;');
// Inject our h1 right after the SVG
heroSvg.after(`<h1 class="hero_home_title u-text-style-h1" style="font-size: 15vw; line-height: 1; margin: 0; color: var(--swatch--black-400); font-weight: 500;">Hey, I'm <span style="font-family: serif; font-style: italic;">Vikhyat</span>.</h1>`);

// Also update the description text
const heroDesc = $('.hero_home_content .hero_home_content_p');
heroDesc.html('I design human-centered experiences.<br>Focusing on clarity, comfort, and curiosity in every interaction.');

// 2. Services text: HIDE the extra ones instead of removing
const services = ['UX/UI Design', 'AI Workflows', 'Game UX & Systems', 'Psychology & Behavior'];
const listItems = $('.services_home_service-list .services_home_service_item');

listItems.each((index, el) => {
  if (index < services.length) {
    $(el).find('h2.services_home_heading').text(services[index]);
  } else {
    // Hide extra items to prevent breaking array length logic in JS
    $(el).attr('style', 'display: none !important;');
  }
});

fs.writeFileSync('site/index.html', $.html(), 'utf-8');
console.log('Successfully applied non-destructive updates!');
