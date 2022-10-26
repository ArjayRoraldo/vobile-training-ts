import inquirer from 'inquirer';
import { Crawlee } from './crawlee.js';
import { Crawler } from './crawler.js';
import { Dataset } from './dataset.js';
import { Final } from './final.js';
import { Main } from './main.js';

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
				Crawlee();
				break;
			case 'Crawler':
				Crawler();
				break;
			case 'Dataset':
				Dataset();
				break;
			case 'Final':
				Final();
				break;
			case 'Main':
				Main();
				break;

			default:
				break;
		}
	});
