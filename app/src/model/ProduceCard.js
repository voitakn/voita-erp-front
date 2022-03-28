Ext.define('Erp.model.ProduceCard', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'customer_id',  type: 'string'},
		{name: 'vendor_code',  type: 'string'},
		{name: 'barcode',  type: 'string'},
		{name: 'title',  type: 'string'},
		{name: 'catalog_id',  type: 'string'},
		{name: 'catalog_title',  type: 'string'},
		{name: 'params',  type: 'auto'},
		{name: 'date_create',  type: 'auto'},
		{name: 'tax_rate',  type: 'number'}
	],
	proxy: {
		type: 'erp_api',
		api: {
			read: Api.items.produce_card,
			create: Api.items.produce_save,
			update: Api.items.produce_save,
		}
	},
	validators: {
		title: {type: 'length', min: 2}
	}
});
