Ext.define('Erp.view.employee.EmployeeModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.employee_vm',
	requires: [
		'Erp.store.Workers'
	],
	data: {
		fullCard: {}
	},
	stores: {
		employees_store: {
			type: 'workersStore'
		},
		places_store: {
			extend: 'Erp.data.Store',
			fields: [
				{name: 'id', type: 'string'},
				{name: 'title',  type: 'string'},
				{name: 'params',  type: 'auto'},
				{name: 'date_create',  type: 'date'}
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
		no_com_worker_place_save(get) {
			return !User.checkAccess('com.worker_place_save');
		},
		no_com_worker_group_list(get) {
			return !User.checkAccess('com.worker_group_list');
		},
		no_com_worker_group_save(get) {
			return !User.checkAccess('com.worker_group_save');
		},
		no_com_worker_card(get) {
			return !User.checkAccess('com.worker_card');
		},
		
	}
});