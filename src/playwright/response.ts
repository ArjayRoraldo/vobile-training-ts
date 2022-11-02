import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

// Listen for all requests
// Notice that the callback function is now async
page.on('response', async (res) => {
  if (!res.request().url().includes('followings')) return;

  // Grab the response body in JSON format
  try {
      const json = await res.json();
      console.log(json);
  } catch (err) {
      console.error(`Response wasn't JSON or failed to parse response.`)
  }
});

await page.goto('https://soundcloud.com/tiesto/following');

await page.waitForTimeout(10000);
await browser.close();