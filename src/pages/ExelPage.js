import { Page } from '@core/Page';
import { Exel } from '@/components/exel/Exel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { createStore } from '@core/store/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { debounce, storage } from '@core/utils';
import { normalizeInitialState } from '@/redux/initialState';

function storageName(param) {
	return 'exel:' + param;
}

export class ExelPage extends Page {
	getRoot() {
		const params = this.params ? this.params : Date.now().toString();
		const state = storage(storageName(this.params));
		const store = createStore(rootReducer, normalizeInitialState(state));

		const stateListener = debounce((state) => {
			storage(storageName(params), state);
		}, 300);

		store.subscribe(stateListener);

		this.exel = new Exel({
			components: [Header, Toolbar, Formula, Table],
			store,
		});
		return this.exel.getRoot();
	}

	afterRender() {
		this.exel.init();
	}
	destroy() {
		this.exel.destroy();
	}
}
