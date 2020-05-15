import { $ } from '@core/dom';

export class Exel {
	constructor(selector, options) {
		this.$el = document.querySelector(selector);
		this.components = options.components || [];
	}

	getRoot() {
		const $root = $.create('div', 'exel');

		this.components = this.components.map((Component) => {
			const $el = $.create('div', Component.className);

			const component = new Component($el);
			// DebugK
			// if (component.name) {
			// 	window[c + component.name] = component;
			// }
			$el.html(component.toHTML());
			$root.append($el);
			return component;
		});
		return $root.$el;
	}

	render() {
		this.$el.insertAdjacentElement('afterbegin', this.getRoot());
		this.components.forEach((component) => component.init());
	}
}
