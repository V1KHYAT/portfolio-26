const fs = require("fs");

let html = fs.readFileSync("site/index.html", "utf8");

// Find the start of the injected script from earlier
const startScript = html.indexOf('<script>\n  window.addEventListener(\'load\', function() {');
const endScript = html.indexOf('</script>\n</body>');

if (startScript !== -1 && endScript !== -1) {
  const newScript = `
<script>
  window.addEventListener('load', function() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && typeof SplitText !== 'undefined') {
      setTimeout(() => {
        const texts = document.querySelectorAll('.experience-text');
        texts.forEach(text => {
          const split = new SplitText(text, { type: "words,chars" });
          
          gsap.fromTo(split.chars, 
            { color: "rgba(0,0,0,0.15)" },
            { 
              color: "rgba(0,0,0,1)",
              stagger: 0.1,
              scrollTrigger: {
                trigger: text,
                start: "top 95%", // Starts as soon as the top of the text enters the bottom 5% of the screen
                end: "bottom 85%", // Finishes completely by the time the bottom of the text reaches 15% from the bottom of the screen
                scrub: 0.5 // Brings back the original smooth scrub tied to the scroll wheel
              }
            }
          );
        });
      }, 1000);
    }
  });
`;

  html = html.substring(0, startScript) + newScript + html.substring(endScript);
  fs.writeFileSync("site/index.html", html);
  console.log("Successfully updated GSAP script to scrub perfectly in the bottom 15% of the viewport.");
} else {
  console.log("Could not find the previously injected script.");
}
