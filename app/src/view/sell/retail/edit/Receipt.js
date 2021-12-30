Ext.define('Erp.view.sell.retail.edit.Receipt', {
    extend: 'Ext.Container',
    xtype: 'sell_retail_receipt',
    layout: 'fit',
    items: [
        {
            xtype: 'head1',
            items: [{
                xtype: 'label',
                cls: 'title',
                html: i18n.gettext('Retail sale')
            },{
                xtype: 'button',
                margin: '1 0 5 10',
                iconCls: 'x-fas fa-list',
                text: i18n.gettext('Selling list'),
                handler(btn) {
                    btn.up('sell_retail').getController().redirectTo('sell_bills');
                }
            },{
                xtype: 'button',
                margin: '1 0 5 15',
                iconCls: 'x-far fa-times-circle red',
                text: i18n.gettext('Cancel'),
                handler: 'cancelBill',
                disabled: true,
                border: true,
                bind: {
                    disabled: '{bill_price_total > 0 ? false : true}'
                }
            }]
        },
        {
            xtype: 'container',
            docked: 'top',
            cls: 'border-bottom',
            layout: {
                type: 'hbox',
            },
            items: [
                {
                    xtype: 'container',
                    minWidth: 250,
                    margin: '5 0',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        pack: 'start'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margin: '3 0',
                            layout: {
                                type: 'hbox'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'label',
                                    width: 110,
                                    html: `${i18n.gettext('Date')}:`,
                                },{
                                    xtype: 'label',
                                    flex: 1,
                                    html: `<b>${Ext.Date.format(new Date(), 'd.m.Y')}</b>`,
                                }
                            ]
                        },{
                            xtype: 'container',
                            margin: '3 0',
                            layout: {
                                type: 'hbox'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'label',
                                    width: 110,
                                    html: `${i18n.gettext('Seller')}:`,
                                },{
                                    xtype: 'label',
                                    flex: 1,
                                    bind: {html: '<b>{seller_full_name}</b>'},
                                }
                            ]
                        },{
                            xtype: 'container',
                            margin: '3 0',
                            layout: {
                                type: 'hbox'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'label',
                                    width: 110,
                                    html: `${i18n.gettext('Point of sale')}:`,
                                },{
                                    xtype: 'label',
                                    flex: 1,
                                    bind: {html: '<b>{sell_market_place}</b>'},
                                }
                            ]
                        }
                    ]
                },{
                    xtype: 'container',
                    margin: '5 0',
                    minWidth: 350,
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'end',
                    },
                    items: [
                        {
                            xtype: 'container',
                            margin: '5 0',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    margin: '7 20 5 0',
                                    cls: 'size-16 text-right',
                                    html: `<b>${i18n.gettext('Payment')}:</b>`
                                },{
                                    xtype: 'button',
                                    margin: '0 15 0 0',
                                    iconCls: 'x-far fa-credit-card green-dark',
                                    text: i18n.gettext('By card'),
                                    handler: 'payByCard',
                                    disabled: true,
                                    bind: {
                                        disabled: '{bill_price_total > 0 ? false : true}'
                                    },
                                },{
                                    xtype: 'button',
                                    iconCls: 'x-fas fa-cash-register green-dark',
                                    text: i18n.gettext('Cash'),
                                    handler: 'payByCash',
                                    disabled: true,
                                    bind: {
                                        disabled: '{bill_price_total > 0 ? false : true}'
                                    },
                                }
                            ]
                        },{
                            xtype: 'container',
                            margin: '5 0',
                            width: 250,
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'size-16 bolder blue',
                                    flex: 1,
                                    html: `${i18n.gettext('Total')}:`,
                                },{
                                    xtype: 'label',
                                    width: 100,
                                    cls: 'size-16 bolder text-right blue',
                                    bind: {html: '{bill_price_total:erpMoney}'},
                                }
                            ]
                        }
                    ]
                }
            ]
        }, {
            xtype: 'container',
            docked: 'bottom',
            cls: 'border-top',
            layout: {
                type: 'hbox'
            },
            defaults: {
                xtype: 'container',
                margin: '5 0',
                flex: 1,
                defaults: {
                    xtype: 'container',
                    width: 250,
                    margin: '5 0',
                },
            },
            items: [
                {
                    layout: {
                        type: 'vbox',
                        align: 'start'
                    },
                    items: [
                        {
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'size-14 bolder',
                                    flex: 1,
                                    html: `${i18n.gettext('Quantity')}:`,
                                },{
                                    xtype: 'label',
                                    width: 100,
                                    cls: 'size-16 bolder text-right',
                                    bind: {html: '{bill_amount_total:number("0.00")}'},
                                }
                            ]
                        },
                        {
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'size-14 bolder green-dark',
                                    flex: 1,
                                    html: `${i18n.gettext('Discount')}:`,
                                },{
                                    xtype: 'label',
                                    width: 100,
                                    cls: 'size-16 bolder text-right green-dark',
                                    bind: {html: '{bill_sale_total:erpMoney}'},
                                }
                            ]
                        }
                    ]

                },{
                    layout: {
                        type: 'vbox',
                        align: 'end'
                    },
                    items: [
                        {
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'size-14 bolder blue',
                                    flex: 1,
                                    html: `${i18n.gettext('Total')}:`,
                                },{
                                    xtype: 'label',
                                    width: 100,
                                    cls: 'size-16 bolder text-right blue',
                                    bind: {html: '{bill_price_total:erpMoney}'},
                                }
                            ]
                        },
                        {
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'size-14 bolder red',
                                    flex: 1,
                                    html: `${i18n.gettext('Taxes')}:`,
                                },{
                                    xtype: 'label',
                                    width: 100,
                                    cls: 'size-16 bolder text-right red',
                                    bind: {html: '{bill_tax_total:erpMoney}'},
                                }
                            ]
                        }
                    ]
                }
            ]
        }, {
            xtype: 'sell_retail_items',
        }, {
            xtype: 'sell_retail_amount',
            listeners: {
                onCancel: 'onCloseAmount'
            }
        }, {
            xtype: 'sell_retail_paycard',
            listeners: {
                onCancel: 'onClosePayCard'
            }
        }, {
            xtype: 'sell_retail_paycash',
            listeners: {
                onCancel: 'onClosePaycash',
                onSavePay: 'savePayCash'
            }
        }
    ]
});
