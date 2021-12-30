Ext.define('Erp.view.worker.WorkerModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.workers_vm',
	requires: [
		'Erp.store.Workers'
	],
	data: {
		newWorker: {
			params: {},
			active: true
		},
		editCard: false,
		clickEdit: false,
		fullCard: {}
	},
	stores: {
		workers_store: {
			type: 'workersStore'
		},
		add_places_store: {
			type: 'placesStore'
		},
		add_groups_store: {
			type: 'workersGroupStore'
		},
		places_store: {
			extend: 'Erp.data.Store',
			fields: [
				{name: 'id', type: 'string'},
				{name: 'title', type: 'string'},
				{name: 'params', type: 'auto'},
				{name: 'date_create', type: 'date'}
			],
			data: [],
			proxy: {
				type: 'memory',
			}
		},
		worker_groups_store: {
			extend: 'Erp.data.Store',
			fields: [
				{name: 'id', type: 'string'},
				{name: 'title',  type: 'string'},
				{name: 'date_create',  type: 'date'}
			],
			data: [],
			proxy: {
				type: 'memory',
			}
		}
	},
	formulas: {
		no_com_worker_save(get) {
			return !User.checkAccess('com.worker_save');
		},
		no_com_worker_card(get) {
			return !User.checkAccess('com.worker_card');
		},
		no_com_worker_place_save(get) {
			return !User.checkAccess('com.worker_place_save');
		},
		no_com_worker_group_list(get) {
			return !User.checkAccess('com.worker_group_list');
		},
		no_com_worker_group_save(get) {
			return !User.checkAccess('com.worker_group_save');
		},
		no_com_place_list_all(get) {
			return !User.checkAccess('com.place_list_all');
		},
		no_com_worker_list(get) {
			return !User.checkAccess('com.worker_list');
		}
	}
});
