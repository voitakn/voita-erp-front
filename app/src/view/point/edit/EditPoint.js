Ext.define('Erp.view.point.edit.EditPoint', {
	extend: 'Erp.base.ToolTip',
	xtype: 'point_edit',
	reference: 'point_edit',
	align: 't50-b50',
	autoSize: true,
	session: true,
	title: i18n.gettext('Edit point'),
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
							label: i18n.gettext('Name of point'),
							flex: 1,
							bind: {
								value: '{theCard.title}'
							},
						},
					
					]
				},
				{
					items: [
						{
							xtype: 'phonefield',
							reference: 'point_phone',
							label: i18n.gettext('Phone'),
							flex: 1,
							bind: {
								value: '{theCard.phone}'
							},
						}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					items: [
						{
							xtype: 'textfield',
							flex: 1,
							margin: '0 10 0 0',
							label: `${i18n.gettext('City')}:`,
							bind: {
								value: `{theCard.city}`,
							}
						},
						{
							xtype: 'textfield',
							margin: '0 0 0 10',
							flex: 1,
							label: `${i18n.gettext('Postcode')}:`,
							bind: {
								value: `{theCard.postcode}`,
							}
						}
					]
				},
				{
					xtype: 'textfield',
					label: i18n.gettext('Address'),
					flex: 1,
					bind: {
						value: '{theCard.address}'
					},
				},
				{
					xtype: 'textfield',
					label: i18n.gettext('Manager'),
					bind: {
						value: '{theCard.director}'
					},
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
			handler: 'onCancelEdit'
		},{
			xtype: 'button',
			iconCls: 'fi-save green-dark',
			text: i18n.gettext('Save'),
			handler: 'onSaveEdit'
		}
	]
});
