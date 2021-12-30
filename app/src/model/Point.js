Ext.define('Erp.model.Point', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'title',  type: 'string'},
		{name: 'phone',  type: 'string'},
		{name: 'director',  type: 'string'},
		{name: 'city',  type: 'string'},
		{name: 'postcode',  type: 'string'},
		{name: 'address',  type: 'string'},
		{name: 'params',  type: 'auto'},
		{name: 'main',  type: 'bool'}
	],
	proxy: {
		type: 'erp_api',
		api: {
			update: Api.com.place_save,
		},
	},
});
