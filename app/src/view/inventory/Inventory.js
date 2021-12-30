Ext.define('Erp.view.inventory.Inventory', {
	extend: 'Erp.base.Module',
	xtype: 'inventory',
	viewModel: {
		type: 'inventory_vm'
	},
	controller: 'inventory_ctrl',
	autoSize: true,
	scrollable: 'y',
	layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},
	items: [
		{
			xtype: 'container',
			flex: 1,
			autoSize: true,
			layout: {
				type: 'card',
				animation: {
					duration: 300,
					easing: 'ease-out',
					type: 'slide',
					direction: 'left'
				}
			},
			defaults: {
				autoSize: true,
			},
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						pack: 'start',
						align: 'stretch'
					},
					items: [
						{
							xtype: 'inventory_tree',
							flex: 1,
							margin: '0 20 0 0',
							autoSize: true,
						}
					]
				}
			]
		},
		{
			xtype: 'container',
			flex: 3,
			layout: {
				type: 'hbox',
				pack: 'start',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'inventory_produce',
					flex: 1,
				}
			]
		},
		{
			xtype: 'quantity_edit'
		},
		{
			xtype: 'quantity_check'
		}
	]
	
})