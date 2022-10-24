"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crawlee_1 = require("crawlee");
const cheerio_1 = __importDefault(require("cheerio"));
const Crawlee = async () => {
    const crawler = new crawlee_1.PlaywrightCrawler({
        requestHandler: async ({ page, request, enqueueLinks }) => {
            const $ = cheerio_1.default.load(await page.content());
            if (request.userData.label === 'START') {
                await enqueueLinks({
                    selector: 'a[href*="/product/"]',
                    baseUrl: new URL(request.url).origin,
                });
                return;
            }
            const title = $('h3').text().trim();
            const price = $('h3 + div').text().trim();
            const description = $('div[class*="Text_body"]').text().trim();
            const imageRelative = $('img[alt="Product Image"]').attr('src');
            const base = new URL(request.url).origin;
            const image = new URL(imageRelative, base).href;
            await crawlee_1.Dataset.pushData({
                title,
                description,
                price,
                image,
            });
        },
    });
    await crawler.addRequests([
        {
            url: 'https://demo-webstore.apify.org/search/on-sale',
            userData: {
                label: 'START',
            },
        },
    ]);
    await crawler.run();
};
Crawlee();
