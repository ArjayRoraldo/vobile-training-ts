import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });

// Create a page and visit Google
const page = await browser.newPage();
await page.goto('https://google.com');

// Agree to the cookies policy
// await page.click('button:has-text("I agree")');

// Type the query and visit the results page
await page.type('input[title="Search"]', 'hello world');
await page.keyboard.press('Enter');

// Click on the first result
await page.click('.g a');
await page.waitForLoadState('load');

// Grab the page's title and log it to the console
const title = await page.title();
console.log(title);

// Take a screenshot and write it to the filesystem
await page.screenshot({ path: 'screenshot.png' });

await browser.close();