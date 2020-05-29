class Dom {
	constructor(selector) {
		if (typeof selector === 'string') {
			this.$el = document.querySelector(selector);
		} else {
			this.$el = selector;
		}
	}

	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}
		return (this.$el.outerHTML = html);
	}

	text(text) {
		if (text !== undefined) {
			this.$el.textContent = text;
			return this;
		}

		if (this.$el.tagName === 'INPUT') {
			return this.$el.value.trim();
		}
		return this.$el.textContent.trim();
	}

	clear() {
		this.html('');
		return this;
	}

	append(node) {
		if (node instanceof Dom) {
			this.$el.append(node.$el);
		} else {
			this.$el.append(node);
		}
		return this;
	}

	get data() {
		return this.$el.dataset;
	}

	closest(selector) {
		return $(this.$el.closest(selector));
	}

	getCoords() {
		return this.$el.getBoundingClientRect();
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector);
	}
	find(selector) {
		return $(this.$el.querySelector(selector));
	}

	css(styles) {
		Object.keys(styles).forEach((key) => {
			this.$el.style[key] = styles[key];
		});
	}

	getStyles(styles = []) {
		return styles.reduce((res, s) => {
			res[s] = this.$el.style[s];
			return res;
		}, {});
	}

	id(parse) {
		if (parse) {
			const parsed = this.id().split(':');
			return {
				row: +parsed[0],
				col: +parsed[1],
			};
		}
		return this.data.id;
	}

	focus() {
		this.$el.focus();
		return this;
	}

	attr(name, value) {
		if (value) {
			this.$el.setAttribute(name, value);
			return this;
		}
		return this.$el.getAttribute(name);
	}

	addClass(className) {
		this.$el.classList.add(className);
		return this;
	}
	removeClass(className) {
		this.$el.classList.remove(className);
		return this;
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback);
	}
	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
	}
}

export function $(selector) {
	return new Dom(selector);
}

$.create = (tagName, classes) => {
	const el = document.createElement(tagName);
	if (classes) {
		el.classList.add(classes);
	}
	return $(el);
};
