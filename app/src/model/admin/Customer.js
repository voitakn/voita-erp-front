Ext.define('Erp.model.admin.Customer', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'title',  type: 'string'},
		{name: 'country_id',  type: 'int'},
		{name: 'email',  type: 'string'},
		{name: 'phone',  type: 'string'},
		{name: 'currency',  type: 'string'},
		{name: 'country_id',  type: 'int'},
		{name: 'lng',  type: 'string'},
		{name: 'params',  type: 'auto'},
		{name: 'date_create',  type: 'auto'},
	],
	validators: {
		title: {type: 'length', min: 2}
	}
});
