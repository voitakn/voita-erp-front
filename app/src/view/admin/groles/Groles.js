Ext.define('Erp.view.admin.groles.Groles', {
    extend: 'Erp.base.Module',
    xtype: 'admin_groles',
    requires: ['Erp.view.admin.groles.Groups'],
    viewModel: {
        type: 'admin_groles_vm'
    },
    controller: 'admin_groles_ctrl',
    platformConfig: {
        desktop: {},
        tablet: {},
        phone: {}
    },
    layout: {
        type: 'vbox'
    },
    items: [
        {
            xtype: 'admin_groles_grid',
            flex: 1,
            //width: 1000,
        },{
            xtype: 'admin_groles_groups',
            reference: 'groups_tooltip',
        }
    ]
});
