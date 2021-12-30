Ext.define('Erp.view.employee.Employee', {
	extend: 'Erp.base.Module',
	xtype: 'employee',
	reference: 'employee',
	controller: 'employee_ctrl',
	viewModel: {
		type: 'employee_vm'
	},
	requires: [
		'Erp.view.common.MenuCompany',
	],
	autoSize: true,
	scrollable: true,
	layout: {
		type: 'hbox',
	},
	items: [
		{
			xtype: 'company_menu',
		},
		{
			xtype: 'container',
			scrollable: 'y',
			flex: 1,
			items: [
				{
					xtype: 'container',
					items: [
						{
							xtype: 'head1',
							items: [
								{
									xtype: 'label',
									cls: 'title',
									html: i18n.gettext('User information')
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
										hidden: '{no_com_worker_save}'
									}
								}
							]
						},
						{
							xtype: 'container',
							docked: 'top',
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
													html: `${i18n.gettext('Name')}:`,
												},
												{
													xtype: 'label',
													flex: 1,
													//	cls: 'bolder',
													bind: {
														html: '{theCard.params.name}',
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
													html: `${i18n.gettext('Surname')}:`,
												},
												{
													xtype: 'label',
													flex: 1,
													//	cls: 'bolder',
													bind: {
														html: `{theCard.params.surname}`,
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
													html: `${i18n.gettext('Email')}:`,
												},
												{
													xtype: 'label',
													flex: 1,
													//	cls: 'bolder',
													bind: {
														html: `{theCard.login}`,
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
												},
											]
										},
										{
											items: [
												{
													xtype: 'label',
													width: 130,
													cls: 'bolder',
													html: `${i18n.gettext('Active')}:`,
												},
												{
													xtype: 'label',
													width: 40,
													cell: {
														encodeHtml: false,
														align: 'right'
													},
													bind: {
														html: `{theCard.active:checkIcon}`,
													}
												},{
													xtype: 'label',
													flex: 1,
													html: i18n.gettext('Can work in application')
												}
											]
										},
									]
								},
							]
						}
					]
				},
				{
					xtype: 'container',
					cls: 'border-top',
					height: 300,
					layout: {
						type: 'hbox'
					},
					items: [
						{
							xtype: 'employee_places_grid',
							margin: '10 10 0 0',
							flex: 1,
						},
						{
							xtype: 'employee_groups_grid',
							margin: '10 0 0 10',
							flex: 1,
						}
					]
				},
				{
					xtype: 'employee_edit'
				}
			]
		}
	],
});
