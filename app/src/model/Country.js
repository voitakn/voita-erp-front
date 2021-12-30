Ext.define('Erp.model.Country', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'country_en',  type: 'string'},
		{name: 'country_orig',  type: 'string'},
		{name: 'params',  type: 'auto'},
		{name: 'active',  type: 'boolean'},
	]
});
