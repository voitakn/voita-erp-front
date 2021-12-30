Ext.define('Erp.view.catalog.Panel', {
    extend: 'Ext.Panel',
    xtype: 'catalog_panel',
    layout: 'fit',
    autoSize: true,
    items: [
        {
            xtype: 'container',
            reference: 'catalog_right',
            autoSize: true,
            layout: {
                type: 'card',
                animation: {
                    duration: 300,
                    easing: 'ease-out',
                    type: 'slide',
                    direction: 'left'
                }
            },
            defaults: {
                autoSize: true,
            },
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
                            xtype: 'catalog_tree_edit',
                            width: 350,
                            margin: '0 20 0 0',
                            autoSize: true,
                        }, {
                            xtype: 'catalog_produce',
                            flex: 1,
                            reference: 'catalog_produce_grid',
                        }
                    ]
                },{
                    xtype: 'catalog_new_produce',
                    reference: 'catalog_new_produce',
                },{
                    xtype: 'catalog_new_service',
                    reference: 'catalog_new_service',
                }
            ]
        },
    ]
});
