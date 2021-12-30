Ext.define('Erp.view.admin.customer.Customer', {
    extend: 'Erp.base.Module',
    xtype: 'admin_customer',
    requires: [
        'Erp.view.admin.customer.cmp.View'
    ],
    viewModel: {
        type: 'admin_customer_vm'
    },
    controller: 'admin_customer_ctrl',
    layout: 'fit',
    items: [
        {
            xtype: 'admin_customer_view'
        }
    ]
});
