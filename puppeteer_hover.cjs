const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on("response", response => {
    if (response.status() === 404) {
      console.log("404 Error:", response.url());
    }
  });

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:8085");
  await new Promise(r => setTimeout(r, 2000));
  
  await page.evaluate(() => {
    const el = document.querySelector("#experience");
    if(el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Hover over the first project
  const firstItem = await page.$('.works_home_item');
  if (firstItem) {
    await firstItem.hover();
    await new Promise(r => setTimeout(r, 1000));
    
    // Check computed styles of the reel and slides
    const styles = await page.evaluate(() => {
      const reel = document.querySelector(".reel_home_cover");
      const rStyle = window.getComputedStyle(reel);
      
      const slide = document.querySelector(".hover-slideshow img.s1");
      const sStyle = slide ? window.getComputedStyle(slide) : null;
      
      return {
        reelOpacity: rStyle.opacity,
        reelDisplay: rStyle.display,
        reelZIndex: rStyle.zIndex,
        slideOpacity: sStyle ? sStyle.opacity : "no slide",
        slideDisplay: sStyle ? sStyle.display : "no slide",
        slideZIndex: sStyle ? sStyle.zIndex : "no slide",
        slideVisibility: sStyle ? sStyle.visibility : "no slide"
      };
    });
    console.log("Hover Styles:", styles);
  }
  
  await page.screenshot({ path: "screenshot_hover.png" });
  await browser.close();
})();
