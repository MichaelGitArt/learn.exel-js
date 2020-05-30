import { Page } from '@core/page/Page';
import { Exel } from '@/components/exel/Exel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { createStore } from '@core/store/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { normalizeInitialState } from '@/redux/initialState';
import { StateProcessor } from '@core/page/StateProcessor';
import { LocalStorageClient } from '@/shared/LocalStorageClient';

export class ExelPage extends Page {
	constructor(param) {
		super(param);
		console.log('param: ', param);
		this.storeSub = null;
		this.processor = new StateProcessor(new LocalStorageClient(param));
	}
	async getRoot() {
		const state = await this.processor.get();
		const store = createStore(rootReducer, normalizeInitialState(state));

		this.storeSub = store.subscribe(this.processor.listen);

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
		this.storeSub.unsubscribe();
	}
}
