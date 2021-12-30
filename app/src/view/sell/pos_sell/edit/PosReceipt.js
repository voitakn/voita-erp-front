Ext.define('Erp.view.sell.pos_sell.edit.PosReceipt', {
    extend: 'Ext.Container',
    xtype: 'pos_sell_receipt',
    reference: 'pos_sell_receipt',
    layout: 'fit',
    items: [
        {
            xtype: 'head1',
            items: [{
                xtype: 'container',
                margin: '0 20 0 0',
                minWidth: 220,
                flex: 1,
                layout: {
                    type: 'hbox',
                    pack: 'start',
                },
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                margin: '0 10 0 0',
                                tooltip: i18n.gettext('Previous sell'),
                                iconCls: 'x-fa fa-arrow-left',
                                ui: 'alt action',
                                bind: {
                                    disabled: '{prev_button}'
                                },
                                handler: 'prevSell',
                            }, {
                                xtype: 'label',
                                margin: '0 10',
                                cls: 'bolder',
                                html: i18n.gettext('Sellings')
                            },
                            {
                                xtype: 'label',
                                cls: 'bolder',
                                margin: '0 10',
                                bind: {
                                    html: '<div>{bill_sell_current}  of  {bill_sell_total}</div>'
                                }
                            }, {
                                xtype: 'button',
                                margin: '0 0 0 10',
                                tooltip: i18n.gettext('Next sell'),
                                ui: 'alt action',
                                iconCls: 'x-fa fa-arrow-right',
                                bind: {
                                    disabled: '{next_button}'
                                },
                                handler: 'nextSell',
                            },
                        ]
                    }
                ]
            }, {
                xtype: 'button',
                iconCls: 'x-fas fa-plus',
                ui: 'alt confirm',
                margin: '0 0 0 0',
                text: i18n.gettext('Selling'),
                handler: 'addItemsStores'
            }]
        },
        {
            xtype: 'container',
            flex: 1,
            cls: 'blue-light-bg',
            style: 'border: 1px solid #5ba1ca; border-top: 0;',
            layout: {
                type: 'vbox',
            },
            items: [
                {
                    xtype: 'container',
                    docked: 'top',
                    margin: '10',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                pack: 'start',
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'size-22 bolder line-35',
                                    bind: {
                                        html: `${i18n.gettext('Total')}: {bill_price_total:erpMoney}`,
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            ui: 'alt decline',
                            margin: '0 0 0 10',
                            iconCls: 'x-fa fa-trash',
                            text: i18n.gettext('Delete'),
                            handler: 'trashBill',
                            border: true,
                            hidden: true,
                            bind: {
                                hidden: '{bill_sell_current < 2}'
                            }
                        },
                        {
                            xtype: 'button',
                            ui: 'alt decline',
                            margin: '0 0 0 20',
                            iconCls: 'x-fa fa-times',
                            text: i18n.gettext('Clear'),
                            handler: 'cancelBill',
                            disabled: true,
                            border: true,
                            bind: {
                                disabled: '{bill_price_total > 0 ? false : true}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'pos_sell_items',
                    margin: '0 10',
                    cls: 'blue-light-bg',
                    flex: 1
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                    },
                    docked: 'bottom',
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            cls: 'bg-dark',
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'start',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            margin: '0 20 0 20',
                                            cls: 'size-16 text-left white',
                                            html: `<b>${i18n.gettext('Payment')}</b>`
                                        },
                                        {
                                            xtype: 'spacer',
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '10 15 10 0',
                                            minWidth: 150,
                                            cls: 'green-dark-bg text-white',
                                            iconAlign: 'bottom',
                                            iconCls: 'x-far fa-credit-card white',
                                            text: i18n.gettext('Bank card'),
                                            handler: 'payByCard',
                                            disabled: true,
                                            bind: {
                                                disabled: '{bill_price_total > 0 ? false : true}'
                                            },
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '10 15 10 0',
                                            minWidth: 150,
                                            cls: 'bg-white text-primary',
                                            iconAlign: 'bottom',
                                            iconCls: 'x-fas fa-cash-register green-dark',
                                            text: i18n.gettext('Cash'),
                                            handler: 'payByCash',
                                            disabled: true,
                                            bind: {
                                                disabled: '{bill_price_total > 0 ? false : true}'
                                            },
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            cls: 'blue-bg text-white',
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '15',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'start',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'start',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'size-16 bolder text-left',
                                                    bind: {
                                                        html: `${i18n.gettext('Products')}: {bill_products_total}`,
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'size-16 bolder text-left',
                                                    bind: {
                                                        html: `${i18n.gettext('Quantity')}: {bill_amount_total:number("0.00")}`,
                                                    }
                                                },
                                            ]
                                        },
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '15',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'start',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'size-24 bolder',
                                            flex: 1,
                                            html: `${i18n.gettext('Total')}:`,
                                        },
                                        {
                                            xtype: 'label',
                                            width: 100,
                                            cls: 'size-24 bolder text-right',
                                            bind: {html: '{bill_price_total:erpMoney}'},
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                }
            ]
        },
    ]
});
