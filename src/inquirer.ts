import inquirer from 'inquirer';

import crawlee from './crawlee.js';
import crawler from './crawler.js';
import dataset from './dataset.js';
import final from './final.js';
import main from './main.js';

export default class Inquirer {
	constructor() {}

	inquirerPrompt() {
		inquirer
			.prompt([
				{
					type: 'list',
					name: 'apifyTypes',
					choices: ['Crawlee', 'Crawler', 'Dataset', 'Final', 'Main'],
				},
			])
			.then((answers: { apifyTypes: string }) => {
				console.log('test', answers.apifyTypes);
				switch (answers.apifyTypes) {
					case 'Crawlee':
						crawlee();
						break;
					case 'Crawler':
						crawler();
						break;
					case 'Dataset':
						dataset();
						break;
					case 'Final':
						final();
						break;
					case 'Main':
						main();
						break;

					default:
						break;
				}
			});
	}
}
