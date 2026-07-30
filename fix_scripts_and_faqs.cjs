const fs = require("fs");
const cheerio = require("cheerio");

const pages = ["site/index.html", "site/play.html", "site/work.html"];
pages.forEach(file => {
  let html = fs.readFileSync(file, "utf8");
  const $ = cheerio.load(html);

  // Remove crossorigin attributes that cause CORS issues on local file:/// URLs
  $("[crossorigin]").removeAttr("crossorigin");

  if (file === "site/index.html") {
    $(".g_eyebrow_text:contains('FAQ')").text("Not-so-FAQs");
    $(".faq_home_heading:contains('Here')").text("Things you might want to know (or not)");
    $(".faq_home_heading").css("color", "var(--swatch--black-400)");

    const faqs = [
      {
        q: "Do you code?",
        a: "I can read code well enough to know when it's broken. But yes, I prototype extensively and understand frontend workflows."
      },
      {
        q: 'What makes you an "AI-Native" Designer?',
        a: "I leverage AI models natively in my workflow to think faster and build better. My designs are optimized not just for human eyes, but for the systems that power them."
      },
      {
        q: "What is your favorite design tool?",
        a: "Figma for UI. Cursor for the heavy lifting. Notion for making sense of the chaos."
      },
      {
        q: "Should we hire you?",
        a: "Please."
      }
    ];

    const list = $(".g_faq_list");
    list.empty();
    faqs.forEach(f => {
      list.append(`
        <div data-accordion-status="not-active" role="listitem" class="g_faq_item w-dyn-item">
          <button data-accordion-toggle="" data-hover-highlight="accordion" class="accordion_css_item_top">
            <span class="accordion_css_item_bg"></span>
            <h3 data-hover-heading="" class="accordion_css_item_heading u-text-trim-off u-text-style-large" style="color: var(--swatch--black-400); mix-blend-mode: normal;">
              ${f.q}
            </h3>
            <div class="accordion_css_square" style="border-color: var(--swatch--black-400);"></div>
          </button>
          <div class="accordion_css_item_bottom">
            <div class="accordion_css_bottom_wrap">
              <div class="accordion_css_bottom_contain">
                <div class="accordion_css_bottom_rich u-rich-text u-text-style-small w-richtext" style="color: var(--swatch--black-400);">
                  <p>${f.a}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
    });
  }

  fs.writeFileSync(file, $.html());
});

console.log("Removed crossorigin attributes and updated FAQs!");
