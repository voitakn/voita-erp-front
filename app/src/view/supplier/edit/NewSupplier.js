Ext.define('Erp.view.supplier.edit.NewSupplier', {
	extend: 'Erp.base.ToolTip',
	xtype: 'supplier_new',
	reference: 'supplier_new',
	binding: {
		store: '{suppliers_store}',
	},
	autoSize: true,
	session: true,
	defaults: {
		scrollable: true,
	},
	title: i18n.gettext('New supplier'),
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
								value: '{newSupplier.title}'
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
								value: '{newSupplier.email}',
							},
							validators: 'email'
						}, {
							xtype: 'togglefield',
							label: i18n.gettext('Send an invitation'),
							margin: '0 0 0 20',
							maxWidth: 150,
							boxLabel: i18n.gettext('Yes'),
							disabled: true,
							bind: {
								value: '{newSupplier.invite}',
								disabled: '{!newSupplier.email}'
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
								value: '{newSupplier.postcode}'
							},
						}, {
							xtype: 'textfield',
							label: i18n.gettext('City'),
							//	required: true,
							flex: 1,
							bind: {
								value: '{newSupplier.city}'
							},
						}
					]
				}, {
					xtype: 'textfield',
					label: i18n.gettext('Address'),
					bind: {
						value: '{newSupplier.address}'
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
								value: '{newSupplier.name}'
							},
						}, {
							xtype: 'textfield',
							label: i18n.gettext('Surname'),
							flex: 1,
							bind: {
								value: '{newSupplier.surname}'
							},
						}
					]
				}, {
					xtype: 'textfield',
					label: i18n.gettext('Phone'),
					bind: {
						value: '{newSupplier.phone}'
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
						btn.up('supplier_new').hide()
					}
				},
				save: {
					iconCls: 'fi-save green-dark',
					margin: '0 10',
					text: i18n.gettext('Save'),
					handler: 'onSaveNew'
				}
			}
		}
	]
});
