Ext.define('Erp.view.prices_rules.PricesRules', {
    extend: 'Erp.base.Module',
    xtype: 'prices_rules',
    reference: 'prices_rules',
    autoSize: true,
    layout: 'fit',
    session: true,
    controller: 'pricesrules_ctrl',
    viewModel: {
        type: 'pricesrules_vm'
    },
    requires: [
        'Erp.view.common.MenuCompany',
    ],
    scrollable: 'y',
    listeners: {
        activate: 'afterViewShow'
    },
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
            },
            items: [
                {
                    xtype: 'company_menu',
                },
                {
                    xtype: 'prices_rules_grid',
                    margin: '0 20 0 0',
                    flex: 1,
                }
            ]
        }
    ]
});
