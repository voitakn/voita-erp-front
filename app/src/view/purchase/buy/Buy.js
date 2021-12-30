Ext.define('Erp.view.purchase.buy.Buy', {
    extend: 'Erp.base.Module',
    xtype: 'purchase_buy',
    requires: [
        'Erp.view.purchase.buy.Invoice',
        'Erp.common.ProduceSelect',
        'Erp.view.purchase.buy.edit.Amount',
        'Erp.view.purchase.buy.edit.NewProduce'
    ],
    controller: 'purchase_buy_ctrl',
    viewModel: {
        type: 'purchase_buy_vm'
    },
    autoSize: true,
    scrollable: 'y',
    layout: 'fit',
    listeners: {
        activate: 'afterViewShow'
    },
    items: [

        {
            xtype: 'container',
            scrollable: 'x',
            layout: {
                type: 'hbox',
            },
            items: [
                {
                    xtype: 'buy_invoice',
                    margin: '0 20 0 0',
                    minWidth: 650,
                    flex: 1,
                },{
                    xtype: 'purchase_produce_grid',
                    reference: 'produce_select',
                    minWidth: 550,
                    flex: 1,
                }
            ]
        },{
            xtype: 'buy_edit_amount'
        },{
            xtype: 'buy_edit_produce'
        }
    ]
});