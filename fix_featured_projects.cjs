const fs = require("fs");
const cheerio = require("cheerio");

let html = fs.readFileSync("site/index.html", "utf8");
const $ = cheerio.load(html, { decodeEntities: false });

// 1. Rename "Success Stories" to "Featured Projects"
$("h2.services_home_heading:contains('Success Stories')").text("FEATURED PROJECTS");
$(".services_home_heading:contains('SUCCESS STORIES')").text("FEATURED PROJECTS");

const projectsData = [
  {
    title: "Perplexity",
    subtitle: "SS",
    category: "Development / Design",
    link: "https://www.perplexity.ai/",
    folder: "Perplexity",
    slides: 4
  },
  {
    title: "CoLab",
    subtitle: "SS",
    category: "Development",
    link: "https://colab.research.google.com/",
    folder: "CoLab",
    slides: 4
  },
  {
    title: "Opening Up Is Hard",
    subtitle: "SS",
    category: "Design",
    link: "#",
    folder: "Opening Up Is Hard",
    slides: 4
  },
  {
    title: "The SaaS Dream",
    subtitle: "SS",
    category: "Strategy",
    link: "#",
    folder: "The SaaS Dream",
    slides: 0,
    comingSoon: true
  }
];

const listWrap = $(".works_home_list");
listWrap.empty();

projectsData.forEach(p => {
  let slidesHtml = "";
  if (p.comingSoon) {
    slidesHtml = `<img src="images/The SaaS Dream/ComingSoon.png" class="hover-slide active">`;
  } else {
    for (let i = 1; i <= p.slides; i++) {
      slidesHtml += `<img src="images/${p.folder}/${i}.png" class="hover-slide ${i === 1 ? 'active' : ''}">`;
    }
  }

  const itemHtml = `
  <div role="listitem" class="works_home_item w-dyn-item">
    <a href="${p.link}" target="_blank" class="works_home_link u-grid-custom w-inline-block">
      <div data-start="top bottom" data-scroll-container="" data-target-translate="125" class="works_home_cover u-ratio-1-1">
        <img src="images/${p.folder}/Thumbnail.png" loading="lazy" data-translate-hero="true" alt="${p.title}" class="works_home_image">
        <div class="works_home_overlay"></div>
        <div class="reel_home_cover">
          <div class="reel_home_video hover-slideshow">
            ${slidesHtml}
          </div>
        </div>
      </div>
      <div class="works_home_content">
        <div class="works_home_title">
          <div class="works_home_micrographic">
            <div class="works_home_content_ss u-text-style-micro">${p.subtitle}</div>
            <div class="works_home_content_index u-text-style-micro u-text-mono"></div>
          </div>
          <h3 class="works_home_content_heading u-text-style-h2 u-text-trim-off">${p.title}</h3>
        </div>
        <div class="works_home_details">
          <div class="works_home_tags u-text-style-micro">${p.category}</div>
          <div class="works_home_year u-text-style-micro u-text-mono">2026</div>
        </div>
      </div>
    </a>
  </div>
  `;
  listWrap.append(itemHtml);
});

// 2. Add the CSS styles for hover-slideshow and reel_home_cover initial state
const customStyles = `
<style>
.hover-slideshow {
  width: 75% !important;
  height: 75% !important;
  aspect-ratio: 3 / 2 !important;
  position: absolute;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  z-index: 10;
}
.hover-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
.hover-slide.active {
  opacity: 1;
}
.reel_home_cover {
  opacity: 0;
  transform: translateY(10%) rotateX(5deg) scale(0.95);
  transition: opacity 0.15s cubic-bezier(0.25, 0, 0.25, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}
.works_home_item:hover .reel_home_cover {
  opacity: 1 !important;
  transform: translateY(0%) rotateX(0deg) scale(1) !important;
}
.works_home_overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
  background: rgba(0,0,0,0.2);
}
.works_home_item:hover .works_home_overlay {
  opacity: 1;
  backdrop-filter: blur(2px);
}
</style>
`;

if (html.indexOf('.hover-slideshow {') === -1) {
  $('head').append(customStyles);
}

// 3. Add the JS for the slideshow interaction
const slideshowJs = `
<script>
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.works_home_item').forEach(item => {
    let interval;
    let slides = item.querySelectorAll('.hover-slide');
    if (slides.length > 1) {
      let currentIdx = 0;
      item.addEventListener('mouseenter', () => {
        interval = setInterval(() => {
          slides[currentIdx].classList.remove('active');
          currentIdx = (currentIdx + 1) % slides.length;
          slides[currentIdx].classList.add('active');
        }, 800);
      });
      item.addEventListener('mouseleave', () => {
        clearInterval(interval);
        slides.forEach(s => s.classList.remove('active'));
        currentIdx = 0;
        slides[0].classList.add('active');
      });
    }
  });
});
</script>
`;

if (html.indexOf('slides[currentIdx].classList.remove') === -1) {
  $('body').append(slideshowJs);
}

fs.writeFileSync("site/index.html", $.html(), "utf8");
console.log("Successfully restored Featured Projects with custom image slideshow!");
