import { ExelComponent } from '@core/ExelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { shouldResize } from '@/components/table/table.functions';

export class Table extends ExelComponent {
	static className = 'exel-table';

	constructor($root) {
		super($root, {
			listeners: ['mousedown'],
		});

		this.resize = {
			start: null,
			current: null,
			type: '',
			active: false,
		};
	}

	toHTML() {
		return createTable(20);
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resizeHandler(this.$root, event);
		}
	}
}

function calcCoordsDifference(start, end) {
	return {
		x: end.x - start.x,
		y: end.y - start.y,
	};
}
