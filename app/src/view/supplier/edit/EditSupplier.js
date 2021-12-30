Ext.define('Erp.view.supplier.edit.EditSupplier', {
	extend: 'Erp.base.ToolTip',
	xtype: 'supplier_edit',
	reference: 'supplier_edit',
	autoSize: true,
	session: true,
	title: i18n.gettext('Edit supplier'),
	items: [
		{
			xtype: 'formpanel',
			items: [
				{
					xtype: 'container',
					layout: 'hbox',
					items: [
						{
							xtype: 'textfield',
							label: i18n.gettext('Title'),
							flex: 1,
							required: true,
							bind: {
								value: '{theCardEdit.title}'
							},
						}
					]
				}, {
					xtype: 'container',
					layout: 'hbox',
					items: [
						{
							xtype: 'emailfield',
							label: i18n.gettext('E-mail'),
							flex: 1,
							bind: {
								value: '{theCardEdit.email}'
							},
							validators: 'email'
						}, {
							xtype: 'togglefield',
							label: i18n.gettext('Send an invitation'),
							maxWidth: 150,
							margin: '0 0 0 20',
							boxLabel: i18n.gettext('Yes'),
							hidden: false,
							bind: {
								value: '{theCardEdit.invite}',
								hidden: '{theCardEdit.invite}'
							}
						}
					
					]
				}, {
					xtype: 'container',
					layout: 'hbox',
					items: [
						{
							xtype: 'textfield',
							label: i18n.gettext('Postcode'),
							margin: '0 20 0 0',
							maxWidth: 100,
							//	required: true,
							bind: {
								value: '{theCardEdit.postcode}'
							},
						}, {
							xtype: 'textfield',
							label: i18n.gettext('City'),
							//	required: true,
							flex: 1,
							bind: {
								value: '{theCardEdit.city}'
							},
						}
					]
				}, {
					xtype: 'textfield',
					label: i18n.gettext('Address'),
					bind: {
						value: '{theCardEdit.address}'
					},
				}, {
					xtype: 'container',
					layout: 'hbox',
					items: [
						{
							xtype: 'textfield',
							label: i18n.gettext('Name'),
							flex: 1,
							margin: '0 20 0 0',
							bind: {
								value: '{theCardEdit.name}'
							},
						}, {
							xtype: 'textfield',
							label: i18n.gettext('Surname'),
							flex: 1,
							bind: {
								value: '{theCardEdit.surname}'
							},
						}
					]
				}, {
					xtype: 'textfield',
					label: i18n.gettext('Phone'),
					bind: {
						value: '{theCardEdit.phone}'
					},
				}
			],
			buttonAlign: 'center',
			buttons: {
				cancel: {
					iconCls: 'x-fa fa-times red',
					margin: '0 10',
					text: i18n.gettext('Cancel'),
					handler(btn) {
						btn.up('supplier_edit').hide()
					}
				},
				save: {
					iconCls: 'fi-save green-dark',
					margin: '0 10',
					text: i18n.gettext('Save'),
					handler: 'onSaveEdit'
				}
			}
		}
	]
});
