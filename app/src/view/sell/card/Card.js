Ext.define('Erp.view.sell.card.Card', {
	extend: 'Erp.base.Module',
	xtype: 'sell_card',
	reference: 'sell_card',
	controller: 'sell_card_ctrl',
	viewModel: {
		type: 'sell_card_vm'
	},
	autoSize: true,
	items: [
		{
			xtype: 'container',
			layout: {
				type: 'vbox',
			},
			items: [
				{
					xtype: 'sell_card_invoice',
					maxWidth: 800,
				},
				{
					xtype: 'sell_card_grid',
					maxWidth: 800,
					flex: 1
				},
			]
		},
		{
			xtype: 'sell_card_return_invoice',
			reference: 'sell_card_return_invoice',
			width: 400,
		}
	],
});
