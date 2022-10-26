// crawler.js
import { gotScraping } from 'got-scraping';
import cheerio from 'cheerio';

export const Crawler = async () => {
	const WEBSITE_URL = 'https://demo-webstore.apify.org/';

	const response = await gotScraping('https://demo-webstore.apify.org/');
	const html = response.body;
	const $ = cheerio.load(html);

	const productLinks = $('a[href*="/product/"]');

	const productsToScrape = [];
	for (const link of productLinks) {
		const relativeUrl: any = $(link).attr('href');
		const absoluteUrl = new URL(relativeUrl, WEBSITE_URL);
		productsToScrape.push(absoluteUrl.href);
	}

	for (const link of productsToScrape) {
		try {
			const productResponse = await gotScraping(link);
			const productHTML = productResponse.body;
			const $$ = cheerio.load(productHTML);
			const productPageTitle = $$('h3').text();
			console.log(productPageTitle);
		} catch (error: any) {
			console.error(error.message, link);
		}
	}
};
