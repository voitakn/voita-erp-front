Ext.define('Erp.view.myprofile.edit.ChangePassword', {
	extend: 'Erp.base.ToolTip',
	xtype: 'myprofile_change_password',
	reference: 'myprofile_change_password',
	autoSize: true,
	session: true,
	align: 'tc-bc',
	listeners: {
		onCancel: 'cancelPassword'
	},
	title: i18n.gettext('Change password'),
	items: [
		{
			xtype: 'formpanel',
			items: [
				{
					xtype: 'container',
					layout: 'hbox',
					items: [
						{
							xtype: 'passwordfield',
							label: i18n.gettext('Old password'),
							required: true,
							flex: 1,
							bind: {
								value: '{pass.old_pass}'
							},
						},{
							xtype: 'label',
							flex: 1,
						}
					]
				},{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'end',
					},
					items: [
						{
							xtype: 'container',
							flex: 1,
							items: [
								{
									xtype: 'passwordfield',
									label: i18n.gettext('New password'),
									required: true,
									bind: {
										value: '{pass.new_pass}'
									},
									validators: {
										type: 'format',
										matcher: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\._])(?=.{8,})/
									}
								},{
									xtype: 'passwordfield',
									label: i18n.gettext('Retype new password'),
									required: true,
									bind: {
										value: '{pass.pass_verify}'
									},
									validators: {
										type: 'format',
										matcher: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\._])(?=.{8,})/
									}
								}
							]
						},{
							xtype: 'container',
							flex: 1,
							items: [
								{
									xtype: 'container',
									margin: '0 0 0 20',
									html: i18n.gettext('The password must be at least 8 characters in the English alphabet, and also contain at least one lowercase character, one uppercase character, one number and one of the following characters ! @ # $ % ^ & * . _')

								}
							]
						}
					]
				}
			]
		}
	],
	buttonAlign: 'center',
	buttons: [{
		xtype: 'button',
		iconCls: 'x-fa fa-times red',
		text: i18n.gettext('Cancel'),
		handler: 'cancelPassword'
	}, {
		xtype: 'button',
		margin: '0 0 0 15',
		iconCls: 'fi-save green-dark',
		text: i18n.gettext('Save'),
		handler: 'changePassword'
	}]
});
