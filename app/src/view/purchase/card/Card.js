Ext.define('Erp.view.purchase.card.Card', {
	extend: 'Erp.base.Module',
	xtype: 'purchase_card',
	reference: 'purchase_card',
	controller: 'purchase_card_ctrl',
	viewModel: {
		type: 'purchase_card_vm'
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
					xtype: 'purchase_card_invoice',
					maxWidth: 700,
				},
				{
					xtype: 'purchase_card_grid',
					maxWidth: 700,
					flex: 1
				},
			]
		},
		{
			xtype: 'buy_edit_paid'
		}
	],
});
