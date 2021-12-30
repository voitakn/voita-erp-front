Ext.define('Erp.view.admin.country.Country', {
    extend: 'Erp.base.Module',
    xtype: 'admin_country',
    viewModel: {
        type: 'admin_country_vm'
    },
    controller: 'admin_country_ctrl',
    layout: 'fit',
    items: [
        {
            xtype: 'country_list',
            margin: '0 20 0 0'
        },
        {
            xtype: 'country_right',
        }
    ]
});
