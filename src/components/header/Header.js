import { ExelComponent } from '@core/ExelComponent';

export class Header extends ExelComponent {
	static className = 'exel-header';
	constructor($root, options) {
		super($root, {
			name: 'Header',
			...options,
		});
	}

	toHTML() {
		return `
		      <input
            type="text"
            class="a-input exel-header__input"
            value="New table"
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
}
