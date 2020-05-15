import { ExelComponent } from '@core/ExelComponent';

export class Toolbar extends ExelComponent {
	static className = 'exel-toolbar';

	constructor($root) {
		super($root, {
			name: 'Toolbar',
			listeners: ['click'],
		});
	}

	toHTML() {
		return `
		          <div class="a-btn">
            <i class="material-icons">format_align_left</i>
          </div>
          <div class="a-btn">
            <i class="material-icons">format_align_center</i>
          </div>
          <div class="a-btn">
            <i class="material-icons">format_align_right</i>
          </div>
          <div class="a-btn">
            <i class="material-icons">format_bold</i>
          </div>
          <div class="a-btn">
            <i class="material-icons">format_italic</i>
          </div>
          <div class="a-btn">
            <i class="material-icons">format_underlined</i>
          </div>
`;
	}

	onClick(event) {
		console.log(event.target);
	}
}
