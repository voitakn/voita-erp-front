Ext.define('Erp.view.supplier.Supplier', {
	extend: 'Erp.base.Module',
	xtype: 'supplier',
	autoSize: true,
	scrollable: 'y',
	controller: 'supplier_ctrl',
	viewModel: {
		type: 'supplier_vm'
	},
	items: [
		{
			xtype: 'panel',
			reference: 'supplier_card',
			layout: 'card',
			items: [
				{
					xtype: 'supplier_left',
					reference: 'supplier_card_grid'
				},
				{
					xtype: 'supplier_right',
				},
			]
		},
		{
			xtype: 'supplier_new',
			listeners: {
				onCancel: 'onCancelNew'
			}
		},
		{
			xtype: 'supplier_edit',
			listeners: {
				onCancel: 'onCancelEdit'
			}
		}
	],
});
