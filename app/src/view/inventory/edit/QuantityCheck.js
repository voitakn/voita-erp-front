Ext.define('Erp.view.inventory.edit.QuantityCheck', {
	extend: 'Erp.base.ToolTip',
	xtype: 'quantity_check',
	reference: 'quantity_check',
	autoSize: true,
	session: true,
	title: i18n.gettext('Confirm quantity store'),
	width: 400,
	align: 'l50-r100',
	items: [
		{
			xtype: 'formpanel',
			cls: 'size-15',
			items: [
				{
					xtype: 'container',
					margin: '5 0',
					layout: {
						type: 'hbox',
						pack: 'end',
						align: 'middle'
					},
					items: [
						{
							xtype: 'label',
							flex: 1,
							cls: 'size-15 bolder',
							bind: {
								html: '{item_data.title}'
							}
						}
					]
				},
				{
					xtype: 'container',
					margin: '5 0',
					layout: {
						type: 'hbox',
						pack: 'end',
						align: 'middle'
					},
					items: [
						{
							xtype: 'label',
							html: `${i18n.gettext('Barcode')}:`,
						},
						{
							xtype: 'label',
							flex: 1,
							cls: 'text-right blue',
							bind: {
								html: '{item_data.barcode}'
							}
						}
					]
				},
				{
					xtype: 'container',
					margin: '5 0',
					layout: {
						type: 'hbox',
						pack: 'end',
						align: 'middle'
					},
					cls: 'size-15',
					items: [
						{
							xtype: 'label',
							html: `${i18n.gettext('Quantity')}:`,
						},
						{
							xtype: 'label',
							flex: 1,
							cls: 'size-16 bolder green-dark text-right',
							bind: {
								html: '{item_data.amount_last}'
							}
						}
					]
				},
				{
					html: i18n.gettext('Do you confirm this quantity of the product in the store?'),
					flex: 1,
					margin: '10 0 0 0',
					cls: 'size-15',
				}
			]
		}
	],
	buttonAlign: 'center',
	buttons: [
		{
			xtype: 'button',
			margin: '0 10 0 0',
			iconCls: 'x-fa fa-times red',
			text: i18n.gettext('No'),
			handler: function(btn){
				btn.up('quantity_check').hide();
			}
		},
		{
			xtype: 'button',
			iconCls: 'x-fa fa-check green-dark',
			text: i18n.gettext('Yes'),
			handler: 'checkQuantity'
		}
	]
});
