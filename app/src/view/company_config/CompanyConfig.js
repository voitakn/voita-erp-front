Ext.define('Erp.view.company_config.CompanyConfig', {
    extend: 'Erp.base.Module',
    xtype: 'company_config',
    reference: 'company_config',
    autoSize: true,
    session: true,
    scrollable: 'y',
    viewModel: {
        type: 'company_config_vm'
    },
    controller: 'company_config_ctrl',
    layout: 'hbox',
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
                    xtype: 'head1',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'title',
                            html: i18n.gettext('Company settings')
                        },
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
                            readOnly: true,
                            bind: {
                                value: '{edit_configs.tax_include}',
                                readOnly: '{no_com_customer_save}',

                            }
                        },
                        {
                            xtype: 'togglefield',
                            labelAlign: 'left',
                            labelWidth: 200,
                            label: i18n.gettext('Enable strict POS mode'),
                            boxLabel: i18n.gettext('Allow retail selling only through pos and virtual checkouts'),
                            prm: 'pos_mode',
                            readOnly: true,
                            bind: {
                                value: '{edit_configs.pos_mode}',
                                readOnly: '{no_com_customer_save}',
                            }
                        }
                    ]
                }

            ]
        },

    ]
})