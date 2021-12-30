Ext.define('Erp.model.admin.Grole', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'cmp',  type: 'string'},
		{name: 'proc',  type: 'string'},
		{name: 'title',  type: 'string'},
		{name: 'urole',  type: 'string'},
		{name: 'can_use',  type: 'boolean'},
		{name: 'active',  type: 'boolean'},
		{name: 'edit_data',  type: 'boolean'},
		{name: 'cluster',  type: 'boolean'},
		{name: 'level',  type: 'int'}
	],
	validators: {
		cmp: {type: 'length', min: 1},
		proc: {type: 'length', min: 1},
		title: {type: 'length', min: 3}
	}
});
