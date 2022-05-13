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
    items: [
        {
            xtype: 'container',
            layout: 'fit',
            items: [
                {
                    xtype: 'b2b_menu',
                    docked: 'top',
                },
                {
                    xtype: 'partners_tabs',
                    reference: 'partners_tabs',
                },
            ]
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
