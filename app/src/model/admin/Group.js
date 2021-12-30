Ext.define('Erp.model.admin.Group', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'title',  type: 'string'},
		{name: 'can_use',  type: 'bool'},
		{name: 'active',  type: 'bool'},
		{name: 'customer_id',  type: 'string'}
	],
	validators: {
		title: {type: 'length', min: 2}
	}
});
