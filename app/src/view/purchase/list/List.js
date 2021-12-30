Ext.define('Erp.view.purchase.list.List', {
    extend: 'Erp.base.Module',
    xtype: 'purchase_list',
    requires: [
        'Erp.view.purchase.list.ListModel',
        'Erp.view.purchase.list.ListCtrl',
        'Erp.view.purchase.list.Grid'
    ],
    controller: 'purchase_list_ctrl',
    viewModel: {
        type: 'purchase_list_vm'
    },
    autoSize: true,
    layout: 'fit',
    items: [
        {
            xtype: 'purchase_grid',
        }
    ]
});