import { $ } from '@core/dom';

export class TableSelection {
	static className = 'selected';
	constructor() {
		this.group = [];
		this.current = null;
	}

	select($el) {
		this.clear();
		this.group.push($el);
		this.current = $el;
		$el.focus().addClass(TableSelection.className);
	}

	clear() {
		this.group.forEach(($el) => $el.removeClass(TableSelection.className));
		this.group = [];
	}

	selectGroup($group = []) {
		this.clear();
		this.group = $group;
		this.group.forEach(($el) => $el.addClass(TableSelection.className));
	}
}

/*
	selectGroup($el) {
		if (this.group.length > 1) {
			return this.select($el);
		}
		this.clear();

		const [lastRow, lastCol] = this.group[0].data.id
			.split(':')
			.map((strNum) => +strNum);
		const [curRow, curCol] = $el.data.id.split(':').map((strNum) => +strNum);

		const rows = Math.abs(curRow - lastRow);
		const cols = Math.abs(curCol - lastCol);

		for (let handledRows = 0; handledRows <= rows; handledRows++) {
			const rowId = Math.min(+lastRow, +curRow) + handledRows;

			for (let handledCols = 0; handledCols <= cols; handledCols++) {
				const colId = Math.min(+lastCol, +curCol) + handledCols;

				const cell = $(`[data-id="${rowId}:${colId}"]`);
				this.group.push(cell);
				cell.addClass(TableSelection.className);
			}
		}
	}
 */
