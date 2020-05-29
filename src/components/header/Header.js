import { ExelComponent } from '@core/ExelComponent';
import { changeTitle } from '@/redux/actions';
import { defaultTitle } from '@/constans';
import { $ } from '@core/dom';
import { debounce } from '@core/utils';

export class Header extends ExelComponent {
	static className = 'exel-header';
	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input'],
			...options,
		});
	}

	prepare() {
		this.onInput = debounce(this.onInput.bind(this), 300);
	}

	toHTML() {
		const title = this.store.getState().title || defaultTitle;
		return `
		      <input
            type="text"
            class="a-input exel-header__input"
            value="${title}"
          />

          <div>
            <div class="a-btn exel-header__btn">
              <i class="material-icons">delete</i>
            </div>
            <div class="a-btn exel-header__btn">
              <i class="material-icons">exit_to_app</i>
            </div>
          </div>
`;
	}

	onInput(event) {
		const $target = $(event.target);
		this.$dispatch(changeTitle($target.text()));
	}
}
