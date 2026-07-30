const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:8085");
  
  // Wait for lenis or gsap to initialize
  await new Promise(r => setTimeout(r, 2000));
  
  // Scroll to the bottom
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  
  // Wait for scroll animation to complete
  await new Promise(r => setTimeout(r, 2000));
  
  const navbarStyle = await page.evaluate(() => {
    const nav = document.querySelector(".navbar_wrap");
    return nav ? nav.getAttribute("style") : "No navbar";
  });
  
  console.log("Navbar inline style at bottom:", navbarStyle);
  await browser.close();
})();
