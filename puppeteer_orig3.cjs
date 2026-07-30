const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto("file://" + process.cwd().replace(/\\/g, "/") + "/../bymonolog-clone/site/index.html");
  await new Promise(r => setTimeout(r, 2000));
  
  const dims = await page.evaluate(() => {
    const item = document.querySelector(".works_home_item");
    const cover = document.querySelector(".works_home_cover");
    const reel = document.querySelector(".reel_home_cover");
    
    return {
      item: item ? item.getBoundingClientRect() : null,
      cover: cover ? cover.getBoundingClientRect() : null,
      reel: reel ? reel.getBoundingClientRect() : null
    };
  });
  console.log("Original Dims:", dims);
  
  await browser.close();
})();
