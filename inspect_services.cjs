const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('site/index.html', 'utf-8');
const $ = cheerio.load(html);
const list = $('.services_home_service-list');
console.log(list.html());
