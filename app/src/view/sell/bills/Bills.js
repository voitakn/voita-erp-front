Ext.define('Erp.view.sell.bills.Bills', {
    extend: 'Erp.base.Module',
    xtype: 'sell_bills',
    reference: 'sell_bills',
    requires: [
        'Erp.view.sell.bills.BillsCtrl',
        'Erp.view.sell.bills.BillsModel',
        'Erp.view.sell.bills.Grid',
        'Erp.view.sell.bills.Invoice',
        'Erp.common.MenuRetail'
    ],
    controller: 'sell_bills_ctrl',
    viewModel: {
        type: 'sell_bills_vm'
    },
    storeUrl: null,
    autoSize: true,
    scrollable: 'y',
    layout: 'vbox',
    items: [
        {
            xtype: 'retail_menu',
        },
        {
            xtype: 'bills_grid',
            flex: 1
        },
        {
            xtype: 'bills_cancel_sale',
            reference: 'bills_cancel_sale',
            width: 400,
        }
    ]
});
