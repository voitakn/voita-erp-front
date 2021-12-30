Ext.define('Erp.model.Cols', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'customer_id',  type: 'string'},
		{name: 'title',  type: 'string'},
		{name: 'percent',  type: 'number'},
		{name: 'markup',  type: 'number'},
		{name: 'priority',  type: 'number'},
		{name: 'active',  type: 'bool'}
	],
	proxy: {
		type: 'erp_api',
		api: {
			read: Api.price.cols_list,
			create: Api.price.cols_save,
			update: Api.price.cols_save,
		}
	},
	validators: {
		title: {type: 'length', min: 2},
		percent: 'number',
		priority: 'number'
	}
});
