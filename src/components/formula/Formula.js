import { ExelComponent } from '@core/ExelComponent';

export class Formula extends ExelComponent {
	static className = 'exel-formula';
	constructor($root) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'click'],
		});
	}
	toHTML() {
		return `
		       <div class="exel-formula__info">fx</div>
          <div
            class="exel-formula__input"
            contenteditable
            spellcheck="false"
          ></div>`;
	}

	onInput(event) {
		console.log('Formula on input', event);
	}
	onClick(event) {
		console.log('Formula on click', event);
	}
}
