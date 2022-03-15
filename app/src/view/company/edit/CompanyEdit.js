Ext.define('Erp.view.company.edit.CompanyEdit', {
	extend: 'Erp.base.ToolTip',
	xtype: 'company_edit',
	reference: 'company_edit',
	autoSize: true,
	session: true,
	title: i18n.gettext('Edit company'),
	listeners: {
		onCancel: 'onCancelEdit'
	},
	items: [
		{
			xtype: 'formpanel',
			width: 500,
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'vbox',
					},
					defaults: {
					},
					items: [
						{
							xtype: 'textfield',
							minWidth: 130,
							cls: 'bolder',
							label: `${i18n.gettext('Company name')}:`,
							bind: {
								value: '{theCard.title}',
							}
						},
						{
							xtype: 'textfield',
							cls: 'bolder',
							label: `${i18n.gettext('Company full name')}:`,
							bind: {
								value: '{theCard.full_title}',
							}
						},
						{
							xtype: 'container',
							flex: 1,
							defaults: {
								layout: {
									type: 'hbox',
								},
							},
							items: [
								{
									items: [
										{
											xtype: 'textfield',
											flex: 1,
											margin: '0 10 0 0',
											bind: {
												label: '{tax_number_name}',
												value: '{theCard.tax_number}'
											}
										},{
											xtype: 'textfield',
											flex: 1,
											margin: '0 0 0 10',
											readOnly: true,
											label: `${i18n.gettext('Country')}:`,
											bind: {
												value: '{theCard.country_en}'
											}
										}
									]
								}
							]
						},{
							xtype: 'container',
							defaults: {
								layout: {
									type: 'hbox',
								},
							},
							items: [
								{
									items: [
										{
											xtype: 'emailfield',
											flex: 1,
											margin: '0 10 0 0',
											label: `${i18n.gettext('E-mail')}:`,
											bind: {
												value: `{theCard.email}`,
											},
											validators: 'email'
										},
										{
											xtype: 'textfield',
											flex: 1,
											reference: 'company_phone',
											margin: '0 0 0 10',
											label: `${i18n.gettext('Phone')}:`,
											bind: {
												value: `{theCard.phone}`,
											}
										}
									]
								},{
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
									items: [
										{
											xtype: 'textfield',
											flex: 1,
											label: `${i18n.gettext('Address')}:`,
											bind: {
												value: `{theCard.address}`,
											}
										}
									]
								}
							]
						}
					]
				},
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
					ui: 'alt confirm',
					iconCls: 'fi-save',
					margin: '0 10',
					text: i18n.gettext('Save'),
					handler: 'onSaveEdit'
				}
			]
		}
	]
});
