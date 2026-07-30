const fs = require('fs');
const cheerio = require('cheerio');

const indexFile = 'site/index.html';
const html = fs.readFileSync(indexFile, 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

// 1. Change "FAQs" to "Not-So-FAQ"
$('.g_eyebrow_text:contains("FAQs")').text("Not-So-FAQ");

// 2. Change the last question to "Should we hire you?" and answer to "Please."
const faqItems = $('.g_faq_item');
if (faqItems.length > 0) {
  const lastFaq = faqItems.last();
  lastFaq.find('.accordion_css_item_heading').text("Should we hire you?");
  lastFaq.find('.accordion_css_item_bottom_text').html("<p>Please.</p>");
}

// 3. Update Huy references to Vikhyat
const headshot = $('.faq_home_headshot');
if (headshot.length > 0) {
  headshot.attr('src', 'images/pfp.jpg');
  headshot.attr('alt', 'A headshot of Vikhyat');
}

const faqP = $('.faq_home_p');
if (faqP.text().includes('Huy')) {
  faqP.text(faqP.text().replace(/Huy/g, 'Vikhyat'));
}

const btnText = $('.g_btn_text:contains("Huy")');
if (btnText.length > 0) {
  btnText.text(btnText.text().replace(/Huy/g, 'Vikhyat'));
}

fs.writeFileSync(indexFile, $.html(), 'utf8');
console.log('Updated FAQs and removed Huy references');
