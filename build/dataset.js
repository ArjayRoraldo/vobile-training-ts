"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_scraping_1 = require("got-scraping");
const cheerio_1 = __importDefault(require("cheerio"));
const json2csv_1 = require("json2csv");
const fs_1 = require("fs");
const Dataset = async () => {
    const response = await (0, got_scraping_1.gotScraping)('https://demo-webstore.apify.org/search/on-sale');
    const html = response.body;
    const $ = cheerio_1.default.load(html);
    const products = $('a[href*="/product/"]');
    const results = [];
    for (const product of products) {
        const element = $(product);
        const title = element.find('h3').text();
        const price = element.find('div[class*="price"]').text();
        results.push({
            title,
            price,
        });
    }
    const csv = (0, json2csv_1.parse)(results);
    (0, fs_1.writeFileSync)('products.csv', csv);
};
Dataset();
