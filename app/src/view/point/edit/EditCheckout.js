Ext.define('Erp.view.point.edit.EditCheckout', {
	extend: 'Erp.base.ToolTip',
	xtype: 'point_checkout_edit',
	reference: 'point_checkout_edit',
	align: 't50-b50',
	autoSize: true,
	session: true,
	title: i18n.gettext('Checkout form'),
	items: [
		{
			xtype: 'formpanel',
			width: 250,
			items: [
				{
					xtype: 'textfield',
					required: true,
					label: i18n.gettext('Checkout name'),
					flex: 1,
					bind: {
						value: '{editCheck.name}'
					}
				}
			]
		}
	],
	buttonAlign: 'center',
	buttons: [
		{
			xtype: 'button',
			iconCls: 'x-fa fa-times red',
			margin: '0 10',
			text: i18n.gettext('Cancel'),
			handler: 'onCancelCheckout'
		},{
			xtype: 'button',
			//iconCls: 'fi-save green-dark',
			iconCls: 'fi-save green-dark',
			text: i18n.gettext('Save'),
			handler: 'onSaveCheckout'
		}
	]
});
