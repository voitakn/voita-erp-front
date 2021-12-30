Ext.define('Erp.model.CatalogSelect', {
	extend: 'Ext.data.TreeModel',
	idProperty: 'id',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'parent_id',  type: 'int'},
		{name: 'title',  type: 'string'},
		{name: 'main_catalog',  type: 'bool'},
		{name: 'leaf',  type: 'bool'},
		{name: 'serv',  type: 'bool'},
		{name: 'iconCls',  defaultValue: 'x-fa fa-tag'},
	],
});
