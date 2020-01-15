import { GET_LIST } from '../config/config.js';
import createItem from './CreateItem.js';
export default class List {
	constructor (app) {
		this.app = app;
		this.view = document.createElement('div');
		this.view.className = 'list';

		this.init();
	}

	loadData () {
		// return a promise
		return fetch(GET_LIST).then((res) => {
			return res.json();
		});
	}
	render () {
		this.app.view.appendChild(this.view);
	}

	initItemList (data) {
		for (let itemData of data) {
			let item = createItem(this, itemData);
		}
	}
	init () {
		this.loadData()
			.then((data) => {
				this.initItemList(data);
			})
			.then((_) => {
				this.render();
			});
	}
}
