Ext.define('Erp.view.produce.WholeSaleCnt', {
    extend: 'Ext.Container',
    xtype: 'wholesale_price_container',
    reference: 'wholesale_price_container',
    listeners: {
        show: 'loadPriceRules'
    },
    items: [
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'button',
                    margin: '10 0 10 0',
                    text: i18n.gettext('Prices rules'),
                    handler: 'toRules',
                    hidden: true,
                    bind: {
                        hidden: '{no_price_cols_list}'
                    }
                },
                {
                    xtype: 'rules_price',
                    margin: '0 0 10 0',
                    height: 350,
                }
            ]
        },
        {
            xtype: 'rules_edit'
        }
    ]
});