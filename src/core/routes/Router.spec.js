import { Router } from './Router';
import { Page } from '../page/Page';

class DashboardPage extends Page {
	getRoot() {
		const root = document.createElement('div');
		root.innerHTML = 'dashboard';
		return root;
	}
}
class ExelPage extends Page {}

describe('Router:', () => {
	let router;
	let $root;
	beforeEach(() => {
		$root = document.createElement('div');
		router = new Router($root, {
			dashboard: DashboardPage,
			exel: ExelPage,
		});
	});
	test('should be defined', () => {
		expect(router).toBeDefined();
	});

	test('should render dashboard page', () => {
		router.changePageHandler();
		expect($root.innerHTML).toBe('<div>dashboard</div>');
	});
});
