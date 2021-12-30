Ext.define('Erp.model.Company', {
	extend: 'Erp.model.Base',
	data: {
		nologo_src: 'resources/shared/images/no_logo.png',
	},
	fields: [
		{name: 'country_id',  type: 'string'},
		{name: 'currency',  type: 'string'},
		{name: 'date_create',  type: 'date'},
		{name: 'email',  type: 'string'},
		{name: 'id',  type: 'string'},
		{name: 'lng',  type: 'string'},
		{name: 'phone',  type: 'string'},
		{name: 'title',  type: 'string'},
		{name: 'logo',  type: 'string'},
		{name: 'logo_id',  type: 'string'}
	],
	proxy: {
		type: 'erp_api',
		api: {
			update: Api.com.customer_save,
		},
	},
});
