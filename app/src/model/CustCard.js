Ext.define('Erp.model.CustCard', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'title',  type: 'string'},
		{name: 'country_en',  type: 'string'},
		{name: 'country_orig',  type: 'string'},
		{name: 'country_id',  type: 'int'},
		{name: 'email',  type: 'string'},
		{name: 'phone',  type: 'string'},
		{name: 'currency',  type: 'string'},
		{name: 'lng',  type: 'string'},
		{name: 'date_create',  type: 'auto'},
		{name: 'params',  type: 'auto'},
		{name: 'admin',  type: 'auto'},
		{name: 'users',  type: 'auto'},
		{name: 'places',  type: 'auto'},
		{name: 'create_token',  type: 'string'},
	],
	validators: {
		title: {type: 'length', min: 2}
	}
});
