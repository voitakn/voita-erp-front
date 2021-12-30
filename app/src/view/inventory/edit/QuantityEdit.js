Ext.define('Erp.view.inventory.edit.QuantityEdit', {
	extend: 'Erp.base.ToolTip',
	xtype: 'quantity_edit',
	reference: 'quantity_edit',
	autoSize: true,
	session: true,
	align: 'l60-r100',
	title: i18n.gettext('Correct the product quantity'),
	width: 400,
	items: [
		{
			xtype: 'formpanel',
			cls: 'size-15',
			items: [
				{
					xtype: 'container',
					margin: '7 0',
					layout: {
						type: 'hbox',
						pack: 'end',
						align: 'middle'
					},
					items: [
						{
							xtype: 'label',
							flex: 1,
							cls: 'bolder',
							bind: {
								html: '{item_data.title}'
							}
						}
					]
				},
				{
					xtype: 'container',
					margin: '7 0',
					layout: {
						type: 'hbox',
						pack: 'end',
						align: 'middle'
					},
					items: [
						{
							xtype: 'label',
							html: i18n.gettext('Barcode:'),
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
					margin: '7 0',
					layout: {
						type: 'hbox',
						pack: 'end',
						align: 'middle'
					},
					items: [
						{
							xtype: 'label',
							html: i18n.gettext('Previous quantity:'),
						},
						{
							xtype: 'label',
							flex: 1,
							cls: 'size-16 bolder red text-right',
							bind: {
								html: '{item_data.amount_last:toFloat}'
							}
						}
					]
				},
				{
					xtype: 'numberfield',
					flex: 1,
					required: true,
					label: i18n.gettext('New quantity'),
					bind: {
						value: '{item_data.amount}'
					}
				},{
					xtype: 'textareafield',
					label: i18n.gettext('Reason for the change'),
					flex: 1,
					required: true,
					bind: {
						value: '{item_data.comment}'
					}
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
			text: i18n.gettext('Cancel'),
			handler: function(btn){
				btn.up('quantity_edit').hide();
			}
		},
		{
			xtype: 'button',
			iconCls: 'x-fa fa-save green-dark',
			text: i18n.gettext('Save'),
			handler: 'addQuantity'
		}
	]
});
