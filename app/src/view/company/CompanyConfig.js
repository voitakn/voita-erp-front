Ext.define('Erp.view.company.CompanyConfig', {
	extend: 'Ext.Container',
	xtype: 'company_config',
	reference: 'company_config',
	autoSize: true,
	items: [
		{
			xtype: 'container',
			cls: 'border-bottom',
			margin: '15 0 0 0',
			items: [
				{
					xtype: 'container',
					html: i18n.gettext('Company configuration'),
					cls: 'bolder size-18',
					margin: '10 0 10 0',
				}
			]
		},
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
		},{
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
})