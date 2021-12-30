Ext.define('Erp.view.myprofile.edit.EditUser', {
	extend: 'Erp.base.ToolTip',
	xtype: 'myprofile_edit_user',
	reference: 'myprofile_edit_user',
	autoSize: true,
	session: true,
	align: 'tc-bc',
	listeners: {
		onCancel: 'cancelEditUser'
	},
	title: i18n.gettext('Edit my information'),
	items: [
		{
			xtype: 'formpanel',
			width: 250,
			items: [
				{
					xtype: 'textfield',
					required: true,
					label: i18n.gettext('First name'),
					bind: {
						value: '{theCard.name}',
					},
				},{
					xtype: 'textfield',
					required: true,
					label: i18n.gettext('Surname'),
					bind: {
						value: '{theCard.surname}',
					},
				},{
					xtype: 'textfield',
					required: true,
					label: i18n.gettext('Phone'),
					bind: {
						value: '{theCard.phone}',
						inputMask: '{phone_input_mask}'
					},
				}
			]
		}
	],
	buttonAlign: 'center',
	buttons: [{
		xtype: 'button',
		iconCls: 'x-fa fa-times red',
		text: i18n.gettext('Cancel'),
		handler: 'cancelEditUser'
	}, {
		xtype: 'button',
		margin: '0 0 0 15',
		iconCls: 'fi-save green-dark',
		text: i18n.gettext('Save'),
		handler: 'saveUserData'
	}]
});
