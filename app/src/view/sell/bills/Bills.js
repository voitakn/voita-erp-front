Ext.define('Erp.view.sell.bills.Bills', {
    extend: 'Erp.base.Module',
    xtype: 'sell_bills',
    reference: 'sell_bills',
    requires: [
        'Erp.view.sell.bills.BillsCtrl',
        'Erp.view.sell.bills.BillsModel',
        'Erp.view.sell.bills.Grid',
        'Erp.view.sell.bills.Invoice',
    ],
    controller: 'sell_bills_ctrl',
    viewModel: {
        type: 'sell_bills_vm'
    },
    storeUrl: null,
    autoSize: true,
    scrollable: 'y',
    layout: 'fit',
    items: [
        {
            xtype: 'bills_grid',
        },
        {
            xtype: 'bills_cancel_sale',
            reference: 'bills_cancel_sale',
            width: 400,
        }
    ]
});
