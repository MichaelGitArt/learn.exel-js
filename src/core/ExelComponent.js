import { DomListener } from '@core/DomListener';

export class ExelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.unsubsribers = [];
		this.prepare();
	}

	prepare() {}

	toHTML() {
		return '';
	}

	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}
	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn);
		this.unsubsribers.push(unsub);
	}

	init() {
		this.initDomListeners();
	}

	destroy() {
		this.removeDomListeners();
		this.unsubsribers.forEach((unsub) => unsub());
	}
}
