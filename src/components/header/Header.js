import { ExelComponent } from '@core/ExelComponent';
import { changeTitle } from '@/redux/actions';
import { defaultTitle } from '@/constans';
import { $ } from '@core/dom';
import { debounce } from '@core/utils';
import { ActiveRoute } from '@core/routes/ActiveRoute';

export class Header extends ExelComponent {
	static className = 'exel-header';
	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input', 'click'],
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
            <div class="a-btn exel-header__btn" data-button="remove">
              <i class="material-icons" data-button="remove">delete</i>
            </div>
            <div class="a-btn exel-header__btn" data-button="exit">
              <i class="material-icons" data-button="exit">exit_to_app</i>
            </div>
          </div>
`;
	}

	onClick(event) {
		const $target = $(event.target);
		if ($target.data.button === 'remove') {
			const decision = confirm('Do you want remove the table?');
			if (decision) {
				localStorage.removeItem('exel:' + ActiveRoute.param);
				ActiveRoute.navigate('');
			}
		} else if ($target.data.button === 'exit') {
			ActiveRoute.navigate('');
		}
	}

	onInput(event) {
		const $target = $(event.target);
		this.$dispatch(changeTitle($target.text()));
	}
}
