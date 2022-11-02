import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();
await page.goto('https://google.com');

const returnMessage = () => 'Apify academy!';

await page.exposeFunction(returnMessage.name, returnMessage);

const msg = await page.evaluate(() => returnMessage());

console.log(msg);

await page.waitForTimeout(10000);
await browser.close();