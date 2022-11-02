import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://google.com/');

const randomString = Math.random().toString(36).slice(2);

await page.evaluate(({ randomString }) => {
    document.querySelector('title')!.textContent = randomString;
}, { randomString });

await page.waitForTimeout(10000)

await browser.close();