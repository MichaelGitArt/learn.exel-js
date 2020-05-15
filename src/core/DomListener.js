import { capitalize } from '@core/utils';

export class DomListener {
	constructor($root, listeners = []) {
		if (!$root) {
			console.error('No $root provided for DomListener');
		}
		this.$root = $root;
		this.listeners = listeners;
	}

	initDomListeners() {
		this.listeners.forEach((listener) => {
			const methodName = setPrefix(listener);
			if (!this[methodName]) {
				throw new Error(
					`Method ${methodName} is not implemented in ${this.name} Component`
				);
			}
			this[methodName] = this[methodName].bind(this);
			this.$root.on(listener, this[methodName]);
		});
	}
	removeDomListeners() {
		this.listeners.forEach((listener) => {
			const methodName = setPrefix(listener);
			if (!this[methodName]) {
				throw new Error(
					// eslint-disable-next-line max-len
					`Method ${methodName} is not implemented in ${this.name} Component. Impossible to remove the method`
				);
			}
			const method = this.$root.off(listener, this[methodName]);
		});
	}
}

function setPrefix(eventName) {
	return 'on' + capitalize(eventName);
}
