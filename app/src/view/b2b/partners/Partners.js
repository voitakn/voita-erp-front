Ext.define('Erp.view.b2b.partners.Partners', {
    extend: 'Erp.base.Module',
    xtype: 'partners',
    controller: 'partners_ctrl',
    requires: [
        'Erp.common.MenuB2b'
    ],
    viewModel: {
        type: 'partners_vm'
    },
    autoSize: true,
    scrollable: 'y',
    items: [
        {
            xtype: 'b2b_menu',
            docked: 'top',
            margin: '5 0 0 20',
        },
        {
            xtype: 'partners_tabs',
            reference: 'partners_tabs',
            flex: 1,
        },
        {
            xtype: 'create_partner',
        },
        {
            xtype: 'add_partner',
        },
        {
            xtype: 'accept_invite'
        },
        {
            xtype: 'edit_partner'
        }
    ]
});
