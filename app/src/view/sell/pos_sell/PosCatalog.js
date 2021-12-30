Ext.define('Erp.view.sell.pos_sell.PosCatalog', {
    extend: 'Ext.Container',
    xtype: 'pos_sell_catalog',
    layout: 'fit',
    autoSize: true,
    scrollable: 'y',
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'pos_sell_catalog_tree',
                    width: 220,
                    margin: '0 20 0 0',
                    autoSize: true,
                }, {
                    xtype: 'pos_sell_produce_grid',
                    flex: 1,
                    reference: 'pos_sell_catalog_produce_grid',
                }
            ]
        }
    ]
});
