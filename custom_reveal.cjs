const fs = require("fs");

let html = fs.readFileSync("site/index.html", "utf8");

const startIdx = html.indexOf('<section id="experience"');
const endIdx = html.indexOf('</section>', startIdx) + '</section>'.length;

if (startIdx !== -1 && endIdx !== -1) {
  let sectionHtml = html.substring(startIdx, endIdx);
  
  // Remove data-highlight-text and add experience-text class
  sectionHtml = sectionHtml.replace(/data-highlight-text=""/g, '');
  sectionHtml = sectionHtml.replace(/class="u-text-style-main"/g, 'class="u-text-style-main experience-text"');
  
  html = html.substring(0, startIdx) + sectionHtml + html.substring(endIdx);
  
  // Inject the custom GSAP script right before </body>
  const scriptToInject = `
<script>
  window.addEventListener('load', function() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && typeof SplitText !== 'undefined') {
      setTimeout(() => {
        const texts = document.querySelectorAll('.experience-text');
        texts.forEach(text => {
          // Add a custom color reveal effect
          const split = new SplitText(text, { type: "words,chars" });
          
          gsap.fromTo(split.chars, 
            { color: "rgba(0,0,0,0.2)" }, // Gray/transparent
            { 
              color: "rgba(0,0,0,1)",     // Solid black
              stagger: 0.1,
              scrollTrigger: {
                trigger: text,
                start: "top 80%",   // Start when the top of the paragraph reaches 80% down the screen
                end: "bottom 50%",  // Finish when the bottom of the paragraph reaches 50% (middle) of the screen
                scrub: 0.5          // Smooth scrubbing
              }
            }
          );
        });
      }, 1000);
    }
  });
</script>
</body>`;
  
  html = html.replace('</body>', scriptToInject);
  fs.writeFileSync("site/index.html", html);
  console.log("Successfully added custom GSAP scroll reveal for Experience descriptions.");
} else {
  console.log("Could not find Experience section.");
}
