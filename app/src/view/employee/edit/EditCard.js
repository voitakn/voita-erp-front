Ext.define('Erp.view.employee.edit.EditCard', {
	extend: 'Erp.base.ToolTip',
	xtype: 'employee_edit',
	reference: 'employee_edit',
	align: 't50-b50',
	autoSize: true,
	session: true,
	title: i18n.gettext('Edit employee'),
	items: [
		{
			xtype: 'formpanel',
			items: [
				{
					xtype: 'container',
					layout: 'hbox',
					items: [
						{
							xtype: 'emailfield',
							label: i18n.gettext('E-mail'),
							flex: 1,
							bind: {
								value: '{theCard.login}'
							},
							validators: 'email'
						},
					
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					items: [
						{
							xtype: 'textfield',
							label: i18n.gettext('Name'),
							flex: 1,
							margin: '0 20 0 0',
							bind: {
								value: '{theCard.name}'
							},
						},
						{
							xtype: 'textfield',
							label: i18n.gettext('Surname'),
							flex: 1,
							bind: {
								value: '{theCard.surname}'
							},
						}
					]
				},
				{
					xtype: 'phonefield',
					label: i18n.gettext('Phone'),
					reference: 'employee_edit_phone',
					bind: {
						value: '{theCard.phone}'
					},
				},{
					xtype: 'togglefield',
					label: i18n.gettext('Active'),
					boxLabel: i18n.gettext('Yes! Can work in application'),
					hidden: false,
					bind: {
						value: '{theCard.active}',
					}
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
				}, {
					xtype: 'button',
					iconCls: 'fi-save green-dark',
					text: i18n.gettext('Save'),
					handler: 'onSaveEdit'
				}
			]
		}
	]
});
