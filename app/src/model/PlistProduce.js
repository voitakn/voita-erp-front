Ext.define('Erp.model.PlistProduce', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'active',  type: 'bool'},
		{name: 'price',  type: 'number'},
		{name: 'title',  type: 'string'},
		{name: 'markup',  type: 'number'},
		{name: 'period',  type: 'string'},
		{name: 'percent',  type: 'number'},
		{name: 'priority',  type: 'number'},
		{name: 'tax_rate',  type: 'number'},
		{name: 'expense_id',  type: 'string'},
		{name: 'produce_id',  type: 'string'},
		{name: 'date_create',  type: 'auto'}
	],
	proxy: {
		type: 'erp_api',
		api: {
			create: Api.price.plist_create,
			update: Api.price.cols_save
		}
	},
	validators: {
		title: 'presence'
	}
});
