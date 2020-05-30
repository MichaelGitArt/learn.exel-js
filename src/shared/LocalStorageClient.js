import { storage } from '@core/utils';

function storageName(param) {
	return 'exel:' + param;
}

export class LocalStorageClient {
	constructor(name) {
		this.name = storageName(name);
		console.log('Storage name: ', this.name);
		console.log(' name: ', name);
	}
	save(state) {
		storage(this.name, state);
		return Promise.resolve();
	}
	get() {
		return new Promise((resolve) => {
			const state = storage(this.name);

			setTimeout(() => {
				return resolve(state);
			}, 1000);
		});
	}
}
