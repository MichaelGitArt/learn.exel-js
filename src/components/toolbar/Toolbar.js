import { ExelComponent } from '@core/ExelComponent';
import { createToolbar } from '@/components/toolbar/toolbar.template';
import { $ } from '@core/dom';
import { ExelStateComponent } from '@core/ExelStateComponent';

export class Toolbar extends ExelStateComponent {
	static className = 'exel-toolbar';

	constructor($root, options) {
		super($root, {
			name: 'Toolbar',
			listeners: ['click'],
			subscribe: ['currentStyles'],
			...options,
		});
	}

	prepare() {
		const initialState = {
			textAlign: 'left',
			fontWeight: 'normal',
			textDecoration: 'none',
			fontStyle: 'normal',
		};
		this.initState(initialState);
	}

	get template() {
		return createToolbar(this.state);
	}

	toHTML() {
		return this.template;
	}

	storeChanged(changes) {
		console.log('storeChanged');
		this.setState(changes.currentStyles);
	}

	onClick(event) {
		const $target = $(event.target);
		if ($target.data.type === 'button') {
			const value = JSON.parse($target.data.value);
			this.$emit('toolbar:applyStyle', value);
		}
	}
}
