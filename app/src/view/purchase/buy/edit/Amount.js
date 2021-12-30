Ext.define('Erp.view.purchase.buy.edit.Amount', {
    extend: 'Erp.base.ToolTip',
    xtype: 'buy_edit_amount',
    reference: 'buy_edit_amount',
    align: 'r-l',
    title: i18n.gettext('Options of purchasing product'),
    items: [
        {
            xtype: 'formpanel',
            width: 300,
            layout: 'hbox',
            items: [
                {
                    xtype: 'numberfield',
                    flex: 1,
                    label: i18n.gettext('Purchase price'),
                    margin: '0 10 0 0',
                    required: true,
                    bind: {
                        value: '{price_data.price}',
                    },
                },{
                    xtype: 'spinnerfield',
                    label: i18n.gettext('Quantity'),
                    margin: '0 0 0 10',
                    flex: 1,
                    required: true,
                    minValue: 0.001,
                    decimals: 4,
                    decimalSeparator: '.',
                    bind: {
                        value: '{price_data.amount}'
                    },
                }
            ]
        }
    ],
    buttonAlign: 'center',
    buttons: [
        {
            xtype: 'button',
            iconCls: 'x-fa fa-times red',
            text: i18n.gettext('Cancel'),
            handler: function(btn){
                btn.up('buy_edit_amount').hide();
            }
        }, {
            xtype: 'button',
            margin: '0 0 0 15',
            iconCls: 'x-fa fa-check green-dark',
            text: i18n.gettext('Add'),
            handler: 'addToInvoice'
        }
    ]
});
