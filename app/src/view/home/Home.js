Ext.define('Erp.view.home.Home', {
	extend: 'Erp.base.Module',
	xtype: 'home_desktop',
	reference: 'home_desktop',
	requires: [],
	autoSize: true,
	scrollable: 'y',
	viewModel: {
		type: 'home_desktop_vm'
	},
	controller: 'home_desktop_ctrl',
	layout: 'vbox',
	defaults: {
	},
	items: [
		
		{
			xtype: 'container',
			margin: '0 20 0 0',
			cls: 'border',
			items: [
				{
					xtype: 'container',
					margin: '20',
					cls: 'text-center',
					html: i18n.gettext('Organization'),
					flex: 1,
					items: [
						{
							layout: {
								type: 'vbox'
							},
							items: [
								{
									xtype: 'container',
									docked: 'top',
									layout: {
										type: 'vbox',
									},
									defaults: {
										xtype: 'container',
										minWidth: 250,
										margin: '5 0',
										flex: 1,
										defaults: {
											xtype: 'container',
											margin: '10 0',
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
															width: 350,
															cls: 'bolder size-16 text-start',
															html: `${i18n.gettext('Company name')}:`,
															tooltip: i18n.gettext('Company name'),
														},
														{
															xtype: 'label',
															flex: 1,
															bind: {
																html: '{theCard.title}' || 'My Organization',
															}
														}
													]
												},
											
											]
										},
									]
								},
								{
									xtype: 'container',
									docked: 'top',
									layout: {
										type: 'vbox',
									},
									defaults: {
										xtype: 'container',
										minWidth: 250,
										margin: '5 0',
										flex: 1,
										defaults: {
											xtype: 'container',
											margin: '10 0',
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
															width: 350,
															cls: 'bolder size-16 text-start',
															html: `${i18n.gettext('Company Points')}:`,
															tooltip: i18n.gettext('Company Points'),
														},
														{
															xtype: 'label',
															flex: 1,
															bind: {
																html: '{theCard.title}',
															}
														}
													]
												},
											
											]
										},
									]
								},
								{
									xtype: 'container',
									docked: 'top',
									layout: {
										type: 'vbox',
									},
									defaults: {
										xtype: 'container',
										minWidth: 250,
										margin: '5 0',
										flex: 1,
										defaults: {
											xtype: 'container',
											margin: '10 0',
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
															width: 350,
															cls: 'bolder size-16 text-start',
															html: `${i18n.gettext('Company Employee')}:`,
															tooltip: i18n.gettext('Company Employee'),
														},
														{
															xtype: 'label',
															flex: 1,
															bind: {
																html: '{theCard.title}',
															}
														}
													]
												},
											
											]
										},
									]
								},
								{
									xtype: 'container',
									docked: 'top',
									layout: {
										type: 'vbox',
									},
									defaults: {
										xtype: 'container',
										minWidth: 250,
										margin: '5 0',
										flex: 1,
										defaults: {
											xtype: 'container',
											margin: '10 0',
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
															width: 350,
															cls: 'bolder size-16 text-start',
															html: `${i18n.gettext('Purchases from the period')}:`,
															tooltip: i18n.gettext('Purchases from the period'),
														},
														{
															xtype: 'label',
															flex: 1,
															bind: {
																html: '{theCard.title}',
															}
														}
													]
												},
											
											]
										},
									]
								},
								{
									xtype: 'container',
									docked: 'top',
									layout: {
										type: 'vbox',
									},
									defaults: {
										xtype: 'container',
										minWidth: 250,
										margin: '5 0',
										flex: 1,
										defaults: {
											xtype: 'container',
											margin: '10 0',
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
															width: 350,
															cls: 'bolder size-16 text-start',
															html: `${i18n.gettext('Sales from the period')}:`,
															tooltip: i18n.gettext('Sales from the period'),
														},
														{
															xtype: 'label',
															flex: 1,
															bind: {
																html: '{theCard.title}',
															}
														}
													]
												},
											
											]
										},
									]
								},
								{
									xtype: 'container',
									docked: 'top',
									layout: {
										type: 'vbox',
									},
									defaults: {
										xtype: 'container',
										minWidth: 250,
										margin: '5 0',
										flex: 1,
										defaults: {
											xtype: 'container',
											margin: '10 0',
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
															width: 350,
															cls: 'bolder size-16 text-start',
															html: `${i18n.gettext('Expenses from the period')}:`,
															tooltip: i18n.gettext('Expenses from the period'),
														},
														{
															xtype: 'label',
															flex: 1,
															bind: {
																html: '{theCard.title}',
															}
														}
													]
												},
											
											]
										},
									]
								},
							]
						},
					]
					
				}
			]
		},
		
		// {
		// 	xtype: 'container',
		// 	html: '<h3>Organization</h3>',
		// 	margin: '20 0',
		// 	cls: 'border',
		// 	flex: 1
		// },
		{
			xtype: 'container',
			margin: '0 20 0 0',
			cls: 'border',
			items: [
				{
					xtype: 'container',
					margin: '10 0 0 0',
					cls: 'text-center',
					html: `<h3>${i18n.gettext('Purchases for the period')}</h3>`,
				},
				{
					xtype: 'purchases_line_basic',
				}
			],
		},
		{
			xtype: 'container',
			margin: '0 20 0 0',
			cls: 'border',
			items: [
				{
					xtype: 'container',
					margin: '10 0 0 0',
					cls: 'text-center',
					html: `<h3>${i18n.gettext('Sales for the period')}</h3>`,
				},
				{
					xtype: 'sales_line_basic',
				}
			],
		},
		{
			xtype: 'container',
			margin: '0 20 0 0',
			cls: 'border',
			items: [
				{
					xtype: 'container',
					margin: '10 0 0 0',
					cls: 'text-center',
					html: `<h3>${i18n.gettext('Expenses for the period')}</h3>`,
				},
				{
					xtype: 'expenses_line_basic',
				}
			],
		},
	]
});
