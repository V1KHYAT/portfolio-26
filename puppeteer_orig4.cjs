const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("file://" + process.cwd().replace(/\\/g, "/") + "/../bymonolog-clone/site/index.html");
  await new Promise(r => setTimeout(r, 2000));
  
  const dims = await page.evaluate(() => {
    const item = document.querySelector(".works_home_item");
    const ic = item ? item.getBoundingClientRect() : null;
    const cover = document.querySelector(".works_home_cover");
    const cc = cover ? cover.getBoundingClientRect() : null;
    const reel = document.querySelector(".reel_home_cover");
    const rc = reel ? reel.getBoundingClientRect() : null;
    
    return {
      cover: cc ? {w: cc.width, h: cc.height} : null,
      reel: rc ? {w: rc.width, h: rc.height} : null
    };
  });
  console.log("Original Dims properly extracted:", dims);
  
  await browser.close();
})();
