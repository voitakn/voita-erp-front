Ext.define('Erp.view.inventory.Tree', {
	extend: 'Ext.grid.Tree',
	xtype: 'inventory_tree',
	reference: 'inventory_tree',
	rootVisible: false,
	rowLines: true,
	scrollable: 'y',
	bind: {
		selection: '{catalog_selection}'
	},
	onRender() {
		this.callParent();
		this.setStore(User.catalogStore);
	},
	selectable: {
		columns: false,
		cells: false,
		checkbox: true,
		headerCheckbox: false,
		extensible: true,
		mode: 'single',
	},
	items: [
		{
			xtype: 'head1',
			items: [
				{
					xtype: 'label',
					cls: 'title',
					html: i18n.gettext('Stock')
				},{
					xtype:'spacer'
				},{
					xtype: 'button',
					tooltip: i18n.gettext('Close all sections'),
					iconCls: 'x-fa fa-arrow-up blue',
					handler: 'collapseCatalog',
				},{
					xtype: 'button',
					tooltip: i18n.gettext('Open all sections'),
					iconCls: 'x-fa fa-arrow-down blue',
					handler: 'expandCatalog',
				}
			]
		},
	],
	columns: [
		{
		xtype: 'treecolumn',
		text: i18n.gettext('Category'),
		dataIndex: 'title',
		tpl: '{title}',
		flex: 1,
		sortable: false,
		menuDisabled: true,
	}
	]
});
