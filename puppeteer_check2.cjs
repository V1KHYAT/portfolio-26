const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:8085");
  const sizes = await page.evaluate(() => {
    const img = document.querySelector(".works_home_image");
    const comp = window.getComputedStyle(img);
    return {
      w: img.clientWidth, h: img.clientHeight,
      nw: img.naturalWidth, nh: img.naturalHeight,
      objectFit: comp.objectFit,
      transform: comp.transform
    };
  });
  console.log(JSON.stringify(sizes, null, 2));
  await browser.close();
})();
