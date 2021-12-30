Ext.define('Erp.view.sell.pos.edit.Amount', {
    extend: 'Erp.base.Dialog',
    xtype: 'sell_pos_amount',
    reference: 'sell_pos_amount',
    floated: true,
    width: 350,
    modal: true,
    centered: true,
    session: true,
    title: i18n.gettext('Quantity'),
    items: [
        {
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'container',
                    margin: '5 0',
                    cls: 'blue bolder size-15',
                    bind: {
                        html: '{amount_data.title}'
                    },
                },{
                    xtype: 'container',
                    margin: '5 0',
                    bind: {
                        html: '{amount_data.barcode}'
                    },
                }, {
                    xtype: 'container',
                    margin: '5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end',
                        align: 'middle'
                    },
                    cls: 'size-14 green-dark',
                    items: [
                        {
                            xtype: 'label',
                            margin: '0 30 0 0',
                            flex: 1,
                            html: `${i18n.gettext('Item discount')}:`,
                        }, {
                            xtype: 'label',
                            cls: 'bolder text-right',
                            bind: {html: '{amount_data.price.sale:erpMoney}'},
                        }
                    ]
                },{
                    xtype: 'container',
                    margin: '5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end',
                        align: 'middle'
                    },
                    cls: 'bolder size-16',
                    items: [
                        {
                            xtype: 'label',
                            margin: '0 30 0 0',
                            flex: 1,
                            html: `${i18n.gettext('Price')}:`,
                        }, {
                            xtype: 'label',
                            cls: ' text-right',
                            bind: {html: '{amount_data.price.price:erpMoney}'},
                        }
                    ]
                },
                {
                    xtype: 'spinnerfield',
                    label: `<b>${i18n.gettext('Quantity')}</b>`,
                    ui: 'payment',
                    margin: '10 0',
                    width: 300,
                    required: true,
                    clearable: true,
                    bind: {
                        value: '{amount_data.amount}'
                    },
                }
            ]
        }
    ],
    buttonAlign: 'center',
    buttons: {
        cancel: {
            margin: '0 10 0 10',
            iconCls: 'x-fa fa-times red',
            text: i18n.gettext('Cancel'),
            handler: function (btn) {
                btn.up('sell_pos_amount').hide();
            }
        },
        ok: {
            margin: '0 10 0 10',
            iconCls: 'x-fa fa-check green-dark',
            text: i18n.gettext('Add'),
            handler: 'addProdToOrder'
        }
    },
});
