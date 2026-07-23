const cheerio = require('cheerio');
const fs = require('fs');

const html = fs.readFileSync('site/index.html', 'utf-8');
const $ = cheerio.load(html, { decodeEntities: false });

// 1. REVERT HERO SECTION
const heroSvg = $('.hero_home_content .hero_home_content_svg');
heroSvg.removeAttr('style');
$('.hero_home_title').remove();

const heroDesc = $('.hero_home_content .hero_home_content_p');
heroDesc.html(`We design change-making website experiences that finally reflect what you've actually built.<!--$--><br><!--/$-->‍<!--$--><br><!--/$-->For established brands whose reputation has outgrown their digital presence.`);

fs.writeFileSync('site/index.html', $.html(), 'utf-8');
console.log('Reverted Hero');
