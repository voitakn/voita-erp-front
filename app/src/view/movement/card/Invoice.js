Ext.define('Erp.view.movement.card.Invoice', {
    extend: 'Ext.grid.Grid',
    xtype: 'movement_card_invoice',
    reference: 'movement_card_invoice',
    autoSize: true,
    items: [
        {
            xtype: 'head1',
            items: [
                {
                    xtype: 'label',
                    cls: 'title',
                    html: i18n.gettext('Movement Invoice')
                },
                {
                    xtype: 'button',
                    margin: '0 15 0 20',
                    text: i18n.gettext('Back'),
                    iconCls: 'x-fa fa-arrow-left',
                    handler: 'toBack',
                },
                {
                    xtype: 'label',
                    padding: '0 15',
                    bind: {
                        html: '{status}',
                        cls: '{status_cls}'
                    }

                },
                {
                    xtype: 'button',
                    margin: '0 15 0 0',
                    text: i18n.gettext('Send Products'),
                    iconCls: 'x-fas fa-level-up-alt green-dark size-24',
                    handler: 'confirmStatusToSent',
                    hidden: true,
                    bind: {
                        hidden: '{no_move_dispatched}'
                    }
                },
                {
                    xtype: 'button',
                    margin: '0 15 0 0',
                    text: i18n.gettext('Receive Products'),
                    iconCls: 'x-fas fa-level-down-alt green-dark size-24',
                    handler: 'confirmStatusToReceive',
                    hidden: true,
                    bind: {
                        hidden: '{no_move_accepted}'
                    }
                },
                {
                    xtype: 'button',
                    margin: '0 15 0 0',
                    text: i18n.gettext('Print'),
                    handler: 'printReceiptInvoice',
                },
                {
                    xtype: 'container',
                    flex: 1
                }
            ]
        },
        {
            xtype: 'container',
            docked: 'top',
            cls: 'border-bottom',
            layout: {
                type: 'hbox',
            },
            defaults: {
                xtype: 'container',
                minWidth: 450,
                margin: '5 0',
                flex: 1,
                layout: {
                    type: 'vbox',
                    pack: 'start'
                },
                defaults: {
                    xtype: 'container',
                    margin: '3 0',
                    layout: {
                        type: 'hbox'
                    },
                    flex: 1,
                }
            },
            items: [
                {
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Document')}:`,
                                }, {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: `№ {show_invoice.doc_number}`,
                                    }
                                }
                            ]
                        }, {
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Date')}:`,
                                }, {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: `{show_invoice.date_create:date("Y-m-d H:i:s")}`,
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Moving from')}:`,
                                }, {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: `{show_invoice.from_place}`,
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Moving to')}:`,
                                }, {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: `{show_invoice.to_place}`,
                                    }
                                }
                            ]
                        },
                    ]
                },
                {
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'text-right',
                                    flex: 1,
                                    html: `${i18n.gettext('Manager')}:`,
                                }, {
                                    xtype: 'label',
                                    width: 120,
                                    cls: 'size-16 bolder text-right',
                                    bind: {
                                        html: `{show_invoice.user_from}`,
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'text-right',
                                    flex: 1,
                                    html: `${i18n.gettext('Quantity total')}:`,
                                }, {
                                    xtype: 'label',
                                    width: 120,
                                    cls: 'size-16 bolder text-right',
                                    bind: {
                                        html: `{show_invoice.amount_total}`,
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'text-right',
                                    flex: 1,
                                    html: `${i18n.gettext('Boxes')}:`,
                                }, {
                                    xtype: 'label',
                                    width: 120,
                                    cls: 'size-16 bolder text-right',
                                    bind: {
                                        html: `{show_invoice.boxes}`,
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'size-16 text-right bolder blue',
                                    flex: 1,
                                    html: `${i18n.gettext('Total price')}:`,
                                }, {
                                    xtype: 'label',
                                    width: 120,
                                    cls: 'size-18 bolder text-right blue',
                                    bind: {
                                        html: `{show_invoice.price_total:erpMoney}`,
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});