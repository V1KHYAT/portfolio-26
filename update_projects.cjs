const fs = require('fs');

const projects = [
  {
    name: "Opening Up Is Hard",
    desc: "A deep-dive behavioral study of emotional vulnerability in Gen Z students, mapping the systemic gaps and cultural barriers in modern mental health.",
    bigText: "Custom Toolkit",
    subText: "Engineered a custom interview and ideation framework to bypass surface-level social masking and scale the problem-solving process.",
    info: "5 Weeks, Individual",
    folder: "Opening Up Is Hard",
    hoverImages: ["1.png", "2.png", "3.png", "4.png"]
  },
  {
    name: "The SaaS Dream",
    desc: "A two month industry sprint at Webtel overhauling their enterprise software suite. The scope included redesigning the ESS, Payroll, and HR Admin ecosystems.",
    bigText: "120% Market Capture",
    subText: "Merged two fragmented mobile applications into a single unified platform, expanding their total addressable market beyond the original baseline.",
    info: "2 Month, Individual Industry Project",
    folder: "The SaaS Dream",
    hoverImages: ["ComingSoon.png"] // User said only one coming soon image
  },
  {
    name: "CoLab",
    desc: "A prototype Figma extension built to streamline corporate and group projects. We pioneered a working collaborative AI chatbot ahead of the market, focusing heavily on seamless integration.",
    bigText: "82.0 SUS Score",
    subText: "Achieved a Grade A System Usability Scale rating, proving the complex AI group chat integration remained highly intuitive for users.",
    info: "3 Weeks",
    folder: "CoLab",
    hoverImages: ["1.png", "2.png", "3.png", "4.png"]
  },
  {
    name: "Perplexity Redesign",
    desc: "A foundational UX exercise stripping down a complex AI search engine. The visual overhaul was strictly guided by core usability principles to improve information discovery and reduce cognitive load.",
    bigText: "Hick's & Fitts's Law",
    subText: "Restructured the interface to minimize user decision fatigue and optimized interactive targets to create a highly fluid, frictionless experience.",
    info: "3 Weeks",
    folder: "Perplexity",
    hoverImages: ["1.png", "2.png", "3.png", "4.png"]
  }
];

let itemsHtml = '';
projects.forEach((p, idx) => {
  let hoverHtml = '';
  if (p.hoverImages.length > 1) {
    hoverHtml = `
      <div class="reel_home_video hover-slideshow">
        ${p.hoverImages.map((img, i) => 
          `<img src="images/${p.folder}/${img}" class="slide s${i+1} u-cover-absolute" style="object-fit: cover;">`
        ).join('')}
      </div>
    `;
  } else {
    hoverHtml = `
      <div class="reel_home_video">
        <img src="images/${p.folder}/${p.hoverImages[0]}" class="u-cover-absolute" style="object-fit: cover;">
      </div>
    `;
  }

  itemsHtml += `
<div role="listitem" class="works_home_item w-dyn-item">
  <a href="#" class="works_home_link u-grid-custom w-inline-block">
    <div data-start="top bottom" data-scroll-container="" data-target-translate="125" id="w-node-c8b1a39d-60a4-5f3d-0268-8191af37a2dc-c8fe3e53" class="works_home_cover u-ratio-1-1">
      <img src="images/${p.folder}/Thumbnail.png" loading="lazy" data-translate-hero="true" alt="" class="works_home_image">
      <div class="works_home_overlay"></div>
      <div class="reel_home_cover">
        ${hoverHtml}
      </div>
    </div>
    <div id="w-node-_06790eb0-c4a9-4920-981c-369dcfe962ca-c8fe3e53" class="works_home_content">
      <div class="works_home_title">
        <div class="works_home_micrographic">
          <div class="works_home_content_ss u-text-style-micro" style="width: auto; padding-right: 1rem;">
            ${p.info}
          </div>
          <div class="works_micrographic_inner" style="flex: 1;">
            <div class="works_micrographic_circle"></div>
            <div class="works_micrographic_line"></div>
            <div class="works_home_micrographic_index">
              <div class="works_home_content_index u-text-style-micro"></div>
            </div>
          </div>
        </div>
        <h2 class="works_home_inner_title u-text-style-h5">
          ${p.name}
        </h2>
        <p class="works_home_p u-text-style-h5" style="white-space: pre-line;">
          ${p.desc}
        </p>
      </div>
      <div class="works_home_result">
        <h3 class="works_home_result_value u-text-style-main">
          ${p.bigText}
        </h3>
        <p class="works_home_result_label u-text-style-main" style="white-space: pre-line;">
          ${p.subText}
        </p>
      </div>
    </div>
  </a>
</div>
`;
});

let html = fs.readFileSync('site/index.html', 'utf8');

const replacedHtml = html.replace(/<div role="listitem" class="works_home_item w-dyn-item">[\s\S]*?<\/a>\s*<\/div>/g, '###ITEM###');
const parts = replacedHtml.split('###ITEM###');
     
if (parts.length > 1) {
  const newHtml = parts[0] + itemsHtml + parts[parts.length - 1];
  fs.writeFileSync('site/index.html', newHtml, 'utf8');
  console.log("Updated projects.");
} else {
  console.log("Error: could not find any works_home_item");
}
