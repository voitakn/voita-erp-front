Ext.define('Erp.model.Inventory', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'price', type: 'auto'},
		{name: 'title', type: 'string'},
		{name: 'barcode',  type: 'string'},
		{name: 'amount_last',  type: 'string'},
		{name: 'date_invent',  type: 'date'},
		{name: 'past_invent',  type: 'auto'},
		{name: 'search',  type: 'string'},
		{name: 'not_invent',  type: 'bool'},
	],
});