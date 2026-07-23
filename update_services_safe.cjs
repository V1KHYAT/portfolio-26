const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('site/index.html', 'utf-8');
const $ = cheerio.load(html, { decodeEntities: false });

const services = ['UX/UI Design', 'AI Workflows', 'Game UX & Systems', 'Psychology & Behavior'];
const listItems = $('.services_home_service-list .services_home_service_item');

listItems.each((index, el) => {
  if (index < services.length) {
    $(el).find('h2.services_home_heading').text(services[index]);
  } else {
    // Remove extra items to match user's 4 core competencies
    $(el).remove();
  }
});

fs.writeFileSync('site/index.html', $.html(), 'utf-8');
console.log('Successfully updated services section using Cheerio!');
