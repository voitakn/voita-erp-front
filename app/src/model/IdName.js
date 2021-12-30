Ext.define('Erp.model.IdName', {
	extend: 'Erp.model.Base',
	identifier: 'uuid',
	fields: [
		{name: 'id', type: 'string', unique: true},
		{name: 'name', type: 'string', unique: true}
	]
});
