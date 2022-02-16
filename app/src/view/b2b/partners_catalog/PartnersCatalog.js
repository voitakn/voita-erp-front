Ext.define('Erp.view.partners_catalog.PartnersCatalog', {
    extend: 'Erp.base.Module',
    xtype: 'partners_catalog',
    // reference: 'partners_catalog',
    controller: 'partners_catalog_ctrl',
    viewModel: {
        type: 'partners_catalog_vm'
    },
    autoSize: true,
    scrollable: 'y',
    layout: 'vbox',
    items: [
        {
            xtype: 'b2b_menu',
        },
        {
            xtype: 'catalog',
            flex: 1,
        },

    ]
});