Ext.define('Erp.view.point.Point', {
	extend: 'Erp.base.Module',
	xtype: 'point',
	reference: 'point',
	controller: 'point_ctrl',
	viewModel: {
		type: 'point_vm'
	},
	autoSize: true,
	scrollable: 'y',
	items: [
		{
			xtype: 'container',
			layout: {
				type: 'hbox',
			},
			items: [
				{
					xtype: 'company_menu',
				},{
					xtype: 'container',
					width: 650,
					layout: {
						type: 'vbox',
					},
					items: [
						{
							xtype: 'head1',
							items: [
								{
									xtype: 'label',
									cls: 'title',
									html: i18n.gettext('Point card')
								},
								{
									xtype: 'button',
									margin: '0 15 0 20',
									text: i18n.gettext('Back'),
									iconCls: 'x-fa fa-arrow-left',
									handler: 'toBack',
								},
								{
									text: i18n.gettext('Edit'),
									iconCls: 'fi-pencil blue',
									handler: 'onEditCard',
									margin: '0 0 0 10',
									hidden: true,
									bind: {
										hidden: '{no_com_place_save}'
									}
								}
							]
						},
						{
							xtype: 'container',
							docked: 'top',
							cls: 'border-bottom',
							layout: {
								type: 'hbox',
							},
							defaults: {
								xtype: 'container',
								minWidth: 250,
								margin: '5 0',
								flex: 1,
								layout: {
									type: 'vbox',
									pack: 'start'
								},
								defaults: {
									xtype: 'container',
									margin: '5 0',
									layout: {
										type: 'hbox'
									},
									flex: 1,
								}
							},
							items: [
								{
									items: [
										{
											items: [
												{
													xtype: 'label',
													width: 130,
													cls: 'bolder',
													html: `${i18n.gettext('Point of sale')}:`,
												},
												{
													xtype: 'label',
													flex: 1,
													//	cls: 'bolder',
													bind: {
														html: '{theCard.title}',
													}
												}
											]
										},
										{
											items: [
												{
													xtype: 'label',
													width: 130,
													cls: 'bolder',
													html: `${i18n.gettext('Phone')}:`,
												},
												{
													xtype: 'label',
													flex: 1,
													//	cls: 'bolder',
													bind: {
														html: `{theCard.params.phone}`,
													}
												}
											]
										},
										{
											items: [
												{
													xtype: 'label',
													width: 130,
													cls: 'bolder',
													html: `${i18n.gettext('City')}:`,
												},
												{
													xtype: 'label',
													flex: 1,
													bind: {
														html: `{theCard.params.city}`,
													}
												}
											]
										},
										{
											items: [
												{
													xtype: 'label',
													width: 130,
													cls: 'bolder',
													html: `${i18n.gettext('Postcode')}:`,
												},
												{
													xtype: 'label',
													flex: 1,
													bind: {
														html: `{theCard.params.postcode}`,
													}
												}
											]
										},
										{
											items: [
												{
													xtype: 'label',
													width: 130,
													cls: 'bolder',
													html: `${i18n.gettext('Address')}:`,
												},
												{
													xtype: 'label',
													flex: 1,
													bind: {
														html: `{theCard.params.address}`,
													}
												}
											]
										},
										{
											items: [
												{
													xtype: 'label',
													width: 130,
													cls: 'bolder',
													html: `${i18n.gettext('Director')}:`,
												},
												{
													xtype: 'label',
													flex: 1,
													//	cls: 'bolder',
													bind: {
														html: `{theCard.params.director}`,
													}
												},
											]
										},
										{
											items: [
												{
													xtype: 'label',
													width: 130,
													cls: 'bolder',
													html: `${i18n.gettext('Is main')}:`,
												},
												{
													xtype: 'label',
													flex: 1,
													cell: {
														encodeHtml: false,
														align: 'right'
													},
													bind: {
														html: `{theCard.main:checkIcon}`,
													}
												}
											]
										},

									]
								},
							]
						},{
							xtype: 'container',
							margin: '10 0 0 0',
							cls: 'border-bottom',
							items: [
								{
									xtype: 'label',
									cls: 'bolder size-18',
									html: i18n.gettext('Checkouts')
								},
								{
									xtype: 'list',
									reference: 'pointCheckoutList',
									margin: '10 0',
									bind: {
										store: '{checkout_store}'
									},
									itemConfig: {
										xtype: 'checkoutitem'
									}
								},
								{
									xtype: 'container',
									margin: '5 0 15 0',
									layout: {
										type: 'hbox',
										pack: 'end'
									},
									items: [
										{
											xtype: 'button',
											iconCls: 'x-fa fa-plus green-dark',
											text: i18n.gettext('Checkout'),
											handler: 'addNewCheckout',
										}
									]
								}
							]
						}
					]
				}
			]
		},
		{
			xtype: 'point_edit'
		},
		{
			xtype: 'point_checkout_edit'
		}

	],
});
