import { PlaywrightCrawler, Dataset } from 'crawlee';
import cheerio from 'cheerio';

const crawlee = async () => {
	const crawler = new PlaywrightCrawler({
		requestHandler: async ({ page, request, enqueueLinks }) => {
			const $ = cheerio.load(await page.content());

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

			const imageRelative: any = $('img[alt="Product Image"]').attr('src');
			const base = new URL(request.url).origin;
			const image = new URL(imageRelative, base).href;

			await Dataset.pushData({
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

export default crawlee;
