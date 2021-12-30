Ext.define('Erp.model.Employee', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'login',  type: 'string'},
		{name: 'params',  type: 'auto'},
		{name: 'active',  type: 'bool'},
		{name: 'date_create',  type: 'date'}
	],
	proxy: {
		type: 'erp_api',
		api: {
			update: Api.com.worker_save,
		},
	},
});
