Ext.define('Erp.store.Employees', {
	extend: 'Erp.data.Store',
	alias: 'store.employeesStore',
	model: 'Erp.model.Employee',
	storeId: 'employeesStore',
	autoLoad: true,
	autoSync: true,
	pageSize: 50,
	remoteSort: true,
	sorters: {
		property: 'login'
	},
	proxy: {
		type: 'erp_api',
		api: {
			create: Api.com.worker_save,
			read: Api.com.worker_list
		},
	},
});
