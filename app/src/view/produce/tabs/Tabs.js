Ext.define('Erp.view.produce.tabs.Tabs', {
    extend: 'Ext.Container',
    xtype: 'produce_tabs',
    items: [
        {
            xtype: 'panel',
            items: [
                {
                    xtype: 'tabpanel',
                    reference: 'produce_tabs',
                    height: 400,
                    items: [
                        {
                            title: 'Retail',
                            xtype: 'produce_price_container',

                        },
                        {
                            title: 'Purchase',
                            xtype: 'purchase_price_container',
                        },
                        {
                            title: 'Wholesale',
                            xtype: 'wholesale_price_container'
                        },
                        {
                            title: 'Marketplace',
                            disabled: true
                        }
                    ]
                }
            ]
        }
    ]
});
