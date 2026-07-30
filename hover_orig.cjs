const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("file://" + process.cwd().replace(/\\/g, "/") + "/../bymonolog-clone/site/index.html");
  await new Promise(r => setTimeout(r, 2000));
  
  const item = await page.$(".works_home_item");
  if(item) {
    const box = await item.boundingBox();
    await page.mouse.move(box.x + box.width/2, box.y + box.height/2);
    await new Promise(r => setTimeout(r, 1000));
  }
  
  await page.screenshot({ path: "screenshot_orig_hover.png" });
  await browser.close();
})();
