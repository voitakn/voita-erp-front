Ext.define('Erp.view.catalog.Catalog', {
    extend: 'Erp.base.Module',
    xtype: 'catalog',
    requires: [
        'Erp.view.catalog.Panel'
    ],
    viewModel: {
        type: 'catalog_vm'
    },
    controller: 'catalog_ctrl',
    items: [
        {
            xtype: 'catalog_panel',
            autoSize: true,
        },
        {
            xtype: 'catalog_edit_tooltip',
            listeners: {
                onCancel: 'cancelCatalogEdit'
            }
        },
        {
            xtype: 'wholesale_price'
        }

    ]
});
