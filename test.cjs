const puppeteer = require('playwright-core').chromium;
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:8099/');
    await page.waitForTimeout(1000);
    const el = await page.$('.problems_home_heading');
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'C:/Users/Vikhyat Kaushik/.gemini/antigravity/brain/f2ade801-3238-4843-9bb4-e9837324d1ff/debug_traditional_design.png' });
    const markdown = `![Traditional Design Screen](file:///C:/Users/Vikhyat%20Kaushik/.gemini/antigravity/brain/f2ade801-3238-4843-9bb4-e9837324d1ff/debug_traditional_design.png)`;
    require('fs').writeFileSync('C:/Users/Vikhyat Kaushik/.gemini/antigravity/brain/f2ade801-3238-4843-9bb4-e9837324d1ff/debug_traditional_design.md', markdown);
    await browser.close();
})();
