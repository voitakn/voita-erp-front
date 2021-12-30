Ext.define('Erp.model.CatalogEdit', {
	extend: 'Ext.data.TreeModel',
	idProperty: 'id',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'parent_id',  type: 'string'},
		{name: 'parent_path',  type: 'string'},
		{name: 'title',  type: 'string'},
		{name: 'main_catalog',  type: 'bool'},
		{name: 'leaf',  type: 'bool'},
		{name: 'serv',  type: 'bool'},
		{name: 'is_edit',  type: 'bool', defaultValue: false},
		{name: 'is_new',  type: 'bool', defaultValue: false},
	],
	proxy: {
		type: 'erp_api',
		api: {
			create: Api.com.catalog_tree_save,
			update: Api.com.catalog_tree_save
		}
	}
});