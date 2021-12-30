Ext.define('Erp.view.place.edit.NewPoint', {
	extend: 'Erp.base.ToolTip',
	xtype: 'point_create',
	reference: 'point_create',
	align: 't50-b50',
	autoSize: true,
	session: true,
	title: i18n.gettext('New point of sale'),
	requires: [
		'Erp.view.place.edit.CheckoutRow'
	],
	items: [
		{
			xtype: 'formpanel',
			width: 400,
			items: [
				{
					xtype: 'container',
					layout: 'hbox',
					items: [
						{
							xtype: 'textfield',
							required: true,
							label: i18n.gettext('Name of point'),
							flex: 1,
							bind: {
								value: '{newPlace.title}'
							},
						},
					
					]
				},{
					items: [
						{
							xtype: 'phonefield',
							reference: 'params_phone',
							label: i18n.gettext('Phone'),
							flex: 1,
							bind: {
								value: '{newPlace.params.phone}'
							},
						}
					]
				},
				{
					xtype: 'textfield',
					label: i18n.gettext('Full address'),
					flex: 1,
					bind: {
						value: '{newPlace.params.address}'
					},
				},{
					xtype: 'textfield',
					label: i18n.gettext('Manager'),
					bind: {
						value: '{newPlace.params.director}'
					},
				},{
					xtype: 'container',
					margin: '25 0 0 0',
					items: [
						{
							xtype: 'label',
							cls: 'bolder size-16',
							html: i18n.gettext('Cash registers')
						},
						{
							xtype: 'list',
							margin: '15 0',
							bind: {
								store: '{checkout_store}'
							},
							itemConfig: {
								xtype: 'checkoutNewText'
							}
						},
						{
							xtype: 'container',
							docked: 'bottom',
							items: [
								{
									xtype: 'button',
									iconCls: 'x-fa fa-plus green-dark',
									text: i18n.gettext('Checkout'),
									handler: 'addCashRegister',
								}
							]
						}
					]
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
			handler: 'onCancelNew'
		},{
			xtype: 'button',
			iconCls: 'fi-save green-dark',
			text: i18n.gettext('Save'),
			handler: 'onSaveNew'
		}
	]
});
