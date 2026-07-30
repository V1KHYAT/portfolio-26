const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${process.cwd()}/site/images/Opening Up Is Hard/Thumbnail.png`);
  const size = await page.evaluate(() => {
    const img = document.querySelector('img');
    return { w: img.naturalWidth, h: img.naturalHeight };
  });
  console.log(`Thumbnail 1: ${size.w}x${size.h} (Ratio: ${(size.w/size.h).toFixed(2)})`);
  await browser.close();
})();
