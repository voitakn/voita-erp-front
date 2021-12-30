Ext.define('Erp.view.sell.pos.PosCatalog', {
    extend: 'Ext.Container',
    xtype: 'pos_catalog',
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
                    xtype: 'pos_catalog_tree',
                    width: 220,
                    margin: '0 20 0 0',
                    autoSize: true,
                }, {
                    xtype: 'pos_produce_grid',
                    flex: 1,
                    reference: 'pos_catalog_produce_grid',
                }
            ]
        }
    ]
});
