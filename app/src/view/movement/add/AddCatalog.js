Ext.define('Erp.view.movement.add.AddCatalog', {
    extend: 'Ext.Container',
    xtype: 'movement_add_catalog',
    layout: 'fit',
    autoSize: true,
    scrollable: 'y',
    items: [
        {
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'movement_add_catalog_tree',
                    width: 220,
                    margin: '0 20 0 0',
                    autoSize: true,
                },
                {
                    xtype: 'movement_add_produce_grid',
                    flex: 1,
                    reference: 'movement_add_catalog_produce_grid',
                }
            ]
        }
    ]
});
