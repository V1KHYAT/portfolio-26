const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    const res = await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll('*')).filter(e => e.textContent && e.textContent.includes('BUILD AN EXPERIENCE'));
        if (els.length > 0) {
            const el = els[els.length - 1];
            return {
                tag: el.tagName,
                class: el.className,
                color: window.getComputedStyle(el).color
            };
        }
        return 'not found';
    });
    console.log(res);
    await browser.close();
})();
