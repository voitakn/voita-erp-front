Ext.define('Erp.view.produce.WholeSaleCnt', {
    extend: 'Ext.Container',
    xtype: 'wholesale_price_container',
    reference: 'wholesale_price_container',
    items: [
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'rules_price',
                    margin: '0 0 10 0',
                    height: 350,
                }
            ]
        },
    ]
});