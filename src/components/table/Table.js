import { ExelComponent } from '@core/ExelComponent';
import { createTable } from '@/components/table/table.template';

export class Table extends ExelComponent {
	static className = 'exel-table';

	constructor($root) {
		super($root, {
			listeners: ['mousedown'],
		});
	}

	toHTML() {
		return createTable(20);
	}

	onMousedown(event) {
		if (event.target.dataset.resize) {
			console.log('Start resize');
		}
	}
}
