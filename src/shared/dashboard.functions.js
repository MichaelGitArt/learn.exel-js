import { storage } from '@core/utils';

function toHTML(key) {
	const model = storage(key);
	const id = key.split(':')[1];
	return `
	<li>
		<a class="db-list__content-item" href="#exel/${id}">
		  <div class="db-list__content-link">${model.title}</div>
	    <strong>
				${new Date(model.openedDate).toLocaleDateString()}
				${new Date(model.openedDate).toLocaleTimeString()}
			</strong>
		</a>
	</li>
`;
}

function getAllKeys() {
	const keys = [];
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (!key.includes('exel')) {
			continue;
		}

		keys.push(key);
	}
	return keys;
}

export function createRecordsTable() {
	const keys = getAllKeys();
	console.log(keys);
	if (!keys.length) {
		return `<p>Вы пока не создали ни одной таблицы</p>`;
	}

	return `
		<div class="db-list">
			<div class="db-list__header">
				<span>Name</span>
				<span>Date of change</span>
			</div>
			<ul class="db-list__content">
				${keys.map(toHTML).join('')}
			</ul>
		</div>`;
}

// export function createRecordsTable() {}
