const puppeteer = require('playwright-core').chromium;
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  
  const capture = async (url, outName) => {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(url);
    await page.waitForTimeout(1000);
    // Scroll to bottom to ensure footer and scroll triggers fire
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
    await page.waitForTimeout(1000);
    
    const imgPath = `C:/Users/Vikhyat Kaushik/.gemini/antigravity/brain/f2ade801-3238-4843-9bb4-e9837324d1ff/${outName}.png`;
    await page.screenshot({ path: imgPath });
    
    const mdPath = `C:/Users/Vikhyat Kaushik/.gemini/antigravity/brain/f2ade801-3238-4843-9bb4-e9837324d1ff/${outName}.md`;
    const markdown = `![${outName} Screenshot](file:///${imgPath})`;
    fs.writeFileSync(mdPath, markdown);
    
    await page.close();
    console.log(`Captured ${outName}`);
  };

  await capture('http://localhost:8099/', 'new_footer_screenshot');
  await capture('http://localhost:8099/work.html', 'work_page_screenshot');
  await capture('http://localhost:8099/play.html', 'play_page_screenshot');
  
  await browser.close();
})();
