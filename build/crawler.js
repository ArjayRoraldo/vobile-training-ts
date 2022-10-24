"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// crawler.js
const got_scraping_1 = require("got-scraping");
const cheerio_1 = __importDefault(require("cheerio"));
const Crawler = async () => {
    const WEBSITE_URL = 'https://demo-webstore.apify.org/';
    const response = await (0, got_scraping_1.gotScraping)('https://demo-webstore.apify.org/');
    const html = response.body;
    const $ = cheerio_1.default.load(html);
    const productLinks = $('a[href*="/product/"]');
    const productsToScrape = [];
    for (const link of productLinks) {
        const relativeUrl = $(link).attr('href');
        const absoluteUrl = new URL(relativeUrl, WEBSITE_URL);
        productsToScrape.push(absoluteUrl.href);
    }
    for (const link of productsToScrape) {
        try {
            const productResponse = await (0, got_scraping_1.gotScraping)(link);
            const productHTML = productResponse.body;
            const $$ = cheerio_1.default.load(productHTML);
            const productPageTitle = $$('h3').text();
            console.log(productPageTitle);
        }
        catch (error) {
            console.error(error.message, link);
        }
    }
};
Crawler();
