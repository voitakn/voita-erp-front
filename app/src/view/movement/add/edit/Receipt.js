Ext.define('Erp.view.movement.add.edit.Receipt', {
    extend: 'Ext.Container',
    xtype: 'movement_add_receipt',
    reference: 'movement_add_receipt',
    layout: 'fit',
    items: [
        {
            xtype: 'head1',
            items: [
                {
                    xtype: 'label',
                    html: `${i18n.gettext('Destination POS')}:`,
                },{
                    xtype: 'label',
                    padding: '0 15',
                    bind: {
                        html: `{pos_market_place_to}`,
                        cls: `{pos_market_place_to === 'Not selected' ? 'status-failed' : 'status-confirm'}`,
                    }
                }, {
                    xtype: 'button',
                    iconCls: 'fi-pencil blue',
                    tooltip: i18n.gettext('Change point to movement'),
                    handler: 'onSelectStoreTo'
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'vbox',
            scrollable: 'y',
            items: [
                {
                    xtype: 'container',
                    cls: 'border-bottom',
                    items: [
                        {
                            xtype: 'container',
                            defaults: {
                                xtype: 'container',
                                margin: '10 0',
                                layout: {
                                    type: 'hbox'
                                },
                                flex: 1,
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 130,
                                            cls: 'bolder',
                                            html: `${i18n.gettext('City')}:`,
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            bind: {
                                                html: `{pos_market_place_to_city} {pos_market_place_to_postcode}`,
                                            }
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 130,
                                            cls: 'bolder',
                                            html: `${i18n.gettext('Address')}:`,
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            bind: {
                                                html: `{pos_market_place_to_address}`,
                                            }
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 130,
                                            cls: 'bolder',
                                            html: `${i18n.gettext('Phone')}:`,
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            bind: {
                                                html: `{pos_market_place_to_phone}`,
                                            }
                                        }
                                    ]
                                },
                            ]

                        }
                    ]
                },
                {
                    xtype: 'container',
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
                    xtype: 'movement_add_items',
                    layout: {
                        type: 'fit',
                    },
                    minHeight: 300,
                    flex: 1,
                },
                {
                    xtype: 'container',
                    margin: '5 5 5 5',
                    cls: 'blue-bg text-white',
                    items: [
                        {
                            xtype: 'container',
                            margin: '15',
                            layout: {
                                type: 'hbox',
                                pack: 'start',
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    width: 300,
                                    flex: 1,
                                    layout: {
                                        type: 'vbox',
                                        pack: 'start',
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '0 20 0 0',
                                            flex: 1,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'start',
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'size-16 bolder',
                                                    flex: 1,
                                                    bind: {
                                                        html: `${i18n.gettext('Products')}: {bill_products_total}`,
                                                    },

                                                },
                                                {
                                                    xtype: 'label',
                                                    cls: 'size-16 bolder text-left',
                                                    bind: {
                                                        html: `${i18n.gettext('Quantity')}: {bill_amount_total:number("0.00")}`,
                                                    }
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 20 0 0',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'start',
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
                                                    cls: 'size-24 bolder text-right',
                                                    bind: {
                                                        html: '{bill_price_total:erpMoney}'
                                                    },
                                                }
                                            ]
                                        },
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    cls: 'bg-white',
                                    items: [
                                        {
                                            xtype: 'button',
                                            ui: 'alt confirm',
                                            iconAlign: 'bottom',
                                            iconCls: 'x-far fa-save',
                                            text: i18n.gettext('Save Invoice'),
                                            disabled: true,
                                            bind: {
                                                disabled: '{(bill_price_total > 0) && (pos_market_place_from !== pos_market_place_to) && (pos_market_place_from !== null) &&' +
                                                    ' (pos_market_place_to !== null) && (pos_market_place_from !== "Not selected") &&' +
                                                    ' (pos_market_place_to !== "Not selected") ? false' +
                                                    ' : true}'
                                            },
                                            handler: 'showPrintDialog'
                                        },
                                    ]
                                }

                            ]
                        },
                    ]
                },
            ]
        }
    ]
});
