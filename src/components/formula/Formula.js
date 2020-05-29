import { ExelComponent } from '@core/ExelComponent';
import { $ } from '@core/dom';

export class Formula extends ExelComponent {
	static className = 'exel-formula';
	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			subscribe: ['currentText'],
			...options,
		});
	}

	toHTML() {
		return `
		       <div class="exel-formula__info">fx</div>
          <div
            class="exel-formula__input"
            contenteditable
            spellcheck="false"
            data-id="formula"
          ></div>`;
	}

	init() {
		super.init();
		this.$formula = this.$root.find('[data-id="formula"]');

		this.$on('table:select', ($cell) => {
			this.$formula.text($cell.data.value);
		});
	}
	storeChanged({ currentText }) {
		this.$formula.text(currentText);
	}

	onInput(event) {
		this.$emit('formula:input', $(event.target).text());
	}

	onKeydown(event) {
		const keys = ['Enter', 'Tab'];
		if (keys.includes(event.key)) {
			event.preventDefault();
			this.$emit('formula:done');
		}
	}
}
