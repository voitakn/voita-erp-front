Ext.define('Erp.view.sell.pos_sell.PosPanel', {
    extend: 'Ext.grid.Grid',
    xtype: 'pos_sell_panel',
    autoSize: true,
    autoSelect: true,
    layout: 'fit',
    requires: [
        'Erp.common.QtyCalc'
    ],
    bind: {
        store: '{select_by_barcode_produce_store}',
    },
    listeners: {
        show: 'focusBarcode'
    },
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            docked: 'top',
            cls: 'border-bottom',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'center',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'head2',
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'title text-center',
                                    html: i18n.gettext('Quantity'),
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'qtycalc',
                                    viewModel: {
                                        data: {
                                            parent_field: 'quantity'
                                        },
                                        links: {
                                            quantity_calc: '{quantity}'
                                        }
                                    }
                                }
                            ]
                        },
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'center',
                    },
                    flex: 1,
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '10 0',
                                    cls: 'size-16 bolder text-center',
                                    html: i18n.gettext('Find by Barcode or Article'),
                                }, {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    height: 60,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            ui: 'payment',
                                            shadow: true,
                                            reference: 'find_barcode',
                                            textAlign: 'center',
                                            width: 250,
                                            bind: {
                                                value: '{filter.barcode}'
                                            },
                                        }
                                    ]
                                }
                            ]
                        }, {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '10 0',
                                    cls: 'size-16 bolder text-center',
                                    html: i18n.gettext('Last found Barcode or Article'),
                                }, {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    height: 60,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            ui: 'payment',
                                            shadow: true,
                                            readOnly: true,
                                            disabled: true,
                                            textAlign: 'center',
                                            reference: 'last_find_barcode',
                                            width: 250,
                                            bind: {
                                                value: '{barcode_last}'
                                            },
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    columns: [
        {
            text: i18n.gettext('Last produce'),
            minWidth: 130,
            flex: 1,
            tpl: `<div><b>{title}</b></div><div>{barcode}</div>`,
            cell: {align: 'left', encodeHtml: false},
        },
        {
            text: i18n.gettext('Quantity'),
            width: 90,
            align: 'center',
            tpl: `<b>{amount}</b>`,
            cell: {align: 'center', encodeHtml: false}
        },
        {
            text: i18n.gettext('Tax'),
            width: 90,
            align: 'left',
            tpl: `<div class="bolder">{tax_value} %</div>`,
            cell: {align: 'left', encodeHtml: false}
        },
        {
            text: i18n.gettext('Price'),
            width: 120,
            align: 'left',
            tpl: `<div class="blue bolder">{price.price:erpMoney}</div>`,
            cell: {
                align: 'left',
                encodeHtml: false,
                tools: {
                    plus: {
                        iconCls: 'x-fas fa-arrow-right green-dark size-24',
                        margin: '0 0 0 15',
                        tooltip: i18n.gettext('Select'),
                        handler: 'onProdSelectedByBarcode',
                        zone: 'end',
                        //   hidden: true
                    }
                }
            }
        }
    ]
});
