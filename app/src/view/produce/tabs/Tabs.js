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
                    height: 600,
                    items: [
                        {
                            title: 'Prices',
                            xtype: 'produce_price_container',
                        },
                        {
                            title: 'Wholesale',
                            xtype: 'wholesale_price_container'
                        },
                        {
                            title: 'History',
                            xtype: 'purchase_price_container',
                        },
                        {
                            title: 'Marketplace',
                            xtype: 'produce_marketplace_container',
                        }
                    ]
                }
            ]
        }
    ]
});
