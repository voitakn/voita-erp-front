Ext.define('Erp.view.expense.card.Card', {
	extend: 'Erp.base.Module',
	xtype: 'expense_card',
	reference: 'expense_card',
	controller: 'expense_card_ctrl',
	viewModel: {
		type: 'expense_card_vm'
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
					xtype: 'expense_card_info',
					maxWidth: 700,
				},
				// {
				// 	xtype: 'expense_card_grid',
				// 	maxWidth: 700,
				// 	flex: 1
				// },
			]
		},
		// {
		// 	xtype: 'buy_edit_paid'
		// }
	],
});
