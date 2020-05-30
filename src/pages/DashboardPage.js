import { Page } from '@core/Page';
import { $ } from '@core/dom';
import { createRecordsTable } from '@/pages/dashboard.functions';

export class DashboardPage extends Page {
	getRoot() {
		const now = Date.now();
		return $.create('div', 'db').html(`
        <div class="db__header db-header">
          <h1>Exel dashboard</h1>
        </div>
        <div class="db-new">
          <div class="db-view">
            <a href="#exel/${now}" class="db-new__create"
              >New <br />
              Table
            </a>
          </div>
        </div>
        <div class="db-table db-view">
					${createRecordsTable()}
        </div>
		`);
	}
}
