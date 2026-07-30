const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto("file://" + process.cwd().replace(/\\/g, "/") + "/../bymonolog-clone/site/index.html");
  await new Promise(r => setTimeout(r, 2000));
  
  const styles = await page.evaluate(() => {
    const reel = document.querySelector(".reel_home_cover");
    if(!reel) return "Not found";
    const s = window.getComputedStyle(reel);
    return {
      w: s.width, h: s.height,
      t: s.top, l: s.left, r: s.right, b: s.bottom,
      pos: s.position, m: s.margin, p: s.padding
    };
  });
  console.log("Original reel_home_cover styles:", styles);
  
  await browser.close();
})();
