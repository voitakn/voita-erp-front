Ext.define('Erp.view.company.CompanyConfig', {
	extend: 'Ext.Container',
	xtype: 'company_config',
	reference: 'company_config',
	// autoSize: true,
	items: [
		{
			xtype: 'container',
			cls: 'border-bottom',
			margin: '15 0 0 0',
			items: [
				{
					xtype: 'container',
					html: i18n.gettext('Settings'),
					cls: 'bolder size-18',
					margin: '10 0 10 0',
				}
			]
		},
		{
			xtype: 'container',
			margin: '10 0 0 0',
			layout: {
				type: 'hbox',
				pack: 'start',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'container',
					margin: '0 20 0 0',
					bind: {
						width: '{widthCnt * 4}'
					},

					layout: {
						type: 'vbox',
					},
					items: [
						{
							xtype: 'container',
							cls: 'text-center',
							items: [
								{
									xtype: 'container',
									margin: '0 0 5 0',
									cls: 'head-1 bolder text-center',
									html: i18n.gettext('Receipt template'),
								},
								{
									xtype: 'button',
									margin: '0 0 5 0',
									width: 95,
									iconCls: 'fi-pencil blue',
									text: i18n.gettext('Edit'),
									handler: 'onEditTemplate',
									hidden: true,
									bind: {
										hidden: '{no_com_customer_save}'
									}
								},
							]
						},
						{
							xtype: 'container',
							margin: '0 0 5 0',
							cls: 'bolder',
							layout: {
								type: 'hbox',
							},
							items: [
								{
									xtype: 'container',
									margin: '0 20 0 0',

									html: `${i18n.gettext('Series')}:`

								},
								{
									xtype: 'container',
									margin: '0 0 0 0',
									bind: {
										html: '{series_template}'
									}

								}

							]
						},
						{
							xtype: 'container',
							margin: '0 0 10 0',
							cls: 'bolder',
							bind: {
								width: '{widthCnt * 3.75}'
							},
							layout: {
								type: 'hbox',
							},
							items: [
								{
									xtype: 'container',
									margin: '0 5 0 0',

									html: '<--------'
								},
								{
									xtype: 'container',
									margin: '0 0 0 0',
									cls: 'text-center',
									flex: 1,
									bind: {
										html: '{widthCnt}' + 'mm'
									}
								},
								{
									xtype: 'container',
									margin: '0 0 0 5',
									html: '-------->'
								}
							]
						},
						{
							xtype: 'container',
							flex: 1,
							reference: 'print_content',
						}
					]
				},
				{
					xtype: 'container',
					items: [
						{
							xtype: 'togglefield',
							labelAlign: 'left',
							labelWidth: 200,
							label: i18n.gettext('Enable VAT taxes'),
							boxLabel: i18n.gettext('Used when printing invoices and calculate taxes'),
							prm: 'tax_include',
							bind: {
								value: '{edit_configs.tax_include}'
							}
						},
						{
							xtype: 'togglefield',
							labelAlign: 'left',
							labelWidth: 200,
							label: i18n.gettext('Enable strict POS mode'),
							boxLabel: i18n.gettext('Allow retail selling only through pos and virtual checkouts'),
							prm: 'pos_mode',
							bind: {
								value: '{edit_configs.pos_mode}'
							}
						}
					]
				}
			]
		},
	]
})