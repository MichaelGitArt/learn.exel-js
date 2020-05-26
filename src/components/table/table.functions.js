export function shouldResize(event) {
	return event.target.dataset.resize;
}
export function isCell(event) {
	return event.target.dataset.type === 'cell';
}

export function range(start, end) {
	const difference = Math.abs(end - start);
	return new Array(difference + 1)
		.fill('')
		.map((_, index) => Math.min(start, end) + index);
}

export function matrix($current, $target) {
	const current = $current.id(true);
	const target = $target.id(true);
	const cols = range(current.col, target.col);
	const rows = range(current.row, target.row);

	return cols.reduce((acc, col) => {
		rows.forEach((row) => acc.push(`${row}:${col}`));
		return acc;
	}, []);
}

export function nextSelector(key, { row, col }) {
	const MIN_VALUE = 0;
	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			row++;
			break;
		case 'Tab':
		case 'ArrowRight':
			col++;
			break;
		case 'ArrowLeft':
			col--;
			break;
		case 'ArrowUp':
			row--;
			break;
	}

	return `[data-id="${row < MIN_VALUE ? 0 : row}:${
		col < MIN_VALUE ? 0 : col
	}"]`;
}
