Ext.define('Erp.view.supplier.SupplierRight', {
	extend: 'Ext.Container',
	xtype: 'supplier_right',
	layout: 'fit',
	items: [
		{
			xtype: 'container',
			layout: 'center',
			cls: 'text-center size-16 bolder blue',
			html:  i18n.gettext('To view items, select the supplier from the list'),
			flex: 1,
			hidden: false,
			bind: {
				hidden: '{theCardView.id}'
			}
		},
		{
			xtype: 'container',
			hidden: true,
			bind: {
				hidden: '{!theCardView.id}'
			},
			items: [
				{
					xtype: 'container',
					margin: '0 0 10 0',
					defaults: {
						xtype: 'container',
						margin: '3 0',
						layout: {
							type: 'hbox'
						},
						flex: 1,
					},
					items: [
						{
							xtype: 'head1',
							items: [{
									xtype: 'label',
									cls: 'title',
									html: i18n.gettext('Supplier information')
								},{
									text: i18n.gettext('Back'),
									iconCls: 'x-fa fa-arrow-left',
									handler: 'toList',
									margin: '0 10 0 10',
									disabled: true,
									hidden: true,
									bind: {
										disabled: '{!editCard}',
										hidden: '{no_com_supplier_save}'
									},
								},
								{
									text: i18n.gettext('Edit'),
									iconCls: 'fi-pencil blue',
									handler: 'onEditSupplier',
									disabled: true,
									hidden: true,
									bind: {
										disabled: '{!editCard}',
										hidden: '{no_com_supplier_save}'
									},
								}
							]
						},
						{
							items: [
								{
									xtype: 'label',
									html: i18n.gettext('Name'),
									flex: 1,
									maxWidth: 130,
								},
								{
									xtype: 'label',
									flex: 1,
									cls: 'bolder',
									bind: {
										html: '{theCardView.title}'
									}
								}
							]
						},
						{
							items: [
								{
									xtype: 'label',
									html: i18n.gettext('Country'),
									flex: 1,
									maxWidth: 130,
								},
								{
									xtype: 'label',
									flex: 1,
									cls: 'bolder',
									bind: {
										html: '{theCardView.country_en}'
									}
								}
							]
						},
						{
							items: [
								{
									xtype: 'label',
									html: i18n.gettext('Address'),
									flex: 1,
									maxWidth: 130,
								},
								{
									xtype: 'label',
									flex: 1,
									cls: 'bolder',
									bind: {
										html: '{theCardView.address_row}'
									}
								}
							]
						},
						{
							items: [
								{
									xtype: 'label',
									html: i18n.gettext('Phone'),
									flex: 1,
									maxWidth: 130,
								},
								{
									xtype: 'label',
									flex: 1,
									cls: 'bolder',
									bind: {
										html: '{theCardView.phone}'
									}
								}
							]
						},
						{
							items: [
								{
									xtype: 'label',
									html: i18n.gettext('Email'),
									flex: 1,
									maxWidth: 130,
								},
								{
									xtype: 'label',
									flex: 1,
									cls: 'bolder',
									bind: {
										html: '<a href= mailto:{theCardView.email}><b>{theCardView.email}</b></a>'
									}
								}
							]
						},
						{
							items: [
								{
									xtype: 'label',
									html: i18n.gettext('Person'),
									flex: 1,
									maxWidth: 130,
								},
								{
									xtype: 'label',
									flex: 1,
									cls: 'bolder',
									bind: {
										html: '{theCardView.name} {theCardView.surname}'
									}
								}
							]
						},
					],
				},
				{
					xtype: 'container',
					cls: 'border-bottom',
					autoSize: true,
					hidden: true,
					bind: {
						hidden: '{no_com_supplier_save}'
					},
					items: [
						{
							xtype: 'head2',
							items: [{
								xtype: 'label',
								cls: 'title',
								flex: 1,
								maxWidth: 120,
								html: i18n.gettext('Purchases')
							},
								{
									xtype: 'button',
									text: i18n.gettext('New Purchase'),
									iconCls: 'x-fa fa-plus green-dark',
									hidden: true,
									bind: {
										hidden: '{no_items_purchase_produce_list}'
									},
									handler: 'addNewPurchase',
								}
							]
						},
						{
							xtype: 'supplier_purchase_list',
							minHeight: 500
						}
					],
				}
			]
		}
	],
});
