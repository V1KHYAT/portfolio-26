const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:8085");
  await new Promise(r => setTimeout(r, 2000));
  
  const dims = await page.evaluate(() => {
    const reelCover = document.querySelector(".reel_home_cover");
    const rc = reelCover ? reelCover.getBoundingClientRect() : null;
    const reelVideo = document.querySelector(".reel_home_video");
    const rv = reelVideo ? reelVideo.getBoundingClientRect() : null;
    
    return {
      coverW: rc ? rc.width : 0, coverH: rc ? rc.height : 0,
      videoW: rv ? rv.width : 0, videoH: rv ? rv.height : 0
    };
  });
  console.log("Dimensions:", dims);
  
  await browser.close();
})();
