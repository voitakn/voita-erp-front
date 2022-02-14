Ext.define('Erp.view.partners.Partners', {
    extend: 'Erp.base.Module',
    xtype: 'partners',
    // reference: 'partners',
    controller: 'partners_ctrl',
    viewModel: {
        type: 'partners_vm'
    },
    autoSize: true,
    scrollable: 'y',
    layout: 'vbox',
    items: [
        {
            xtype: 'b2b_menu',
        },
        {
            xtype: 'partners_tabs',
        },
        {
            xtype: 'add_partner',
        }
    ]
});