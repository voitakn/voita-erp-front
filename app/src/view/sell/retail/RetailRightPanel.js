Ext.define('Erp.view.sell.retail.RetailRightPanel', {
    extend: 'Ext.grid.Grid',
    xtype: 'retail_right_panel',
    autoSize: true,
    autoSelect: true,
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
            docked: 'top',
            height: 280,
            layout: {
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    items: [
                        {
                            xtype: 'head2',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'title',
                                    html: i18n.gettext('Quantity'),
                                },
                            ]
                        },{
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
                },{
                    xtype: 'container',
                    flex: 1,
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'head2',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'title',
                                            html: i18n.gettext('Find by Barcode or Article'),
                                        },
                                    ]
                                },{
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
                                            ui: 'solo',
                                            shadow: true,
                                            reference: 'find_barcode',
                                            focusable: true,
                                            textAlign: 'center',
                                            //cls: 'font-weight-bold',
                                            width: 200,
                                            bind: {
                                                value: '{filter.barcode}'
                                            },
                                        }
                                    ]
                                }
                            ]
                        },{
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'head2',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'title',
                                            html: i18n.gettext('Last found Barcode or Article'),
                                        },
                                    ]
                                },{
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
                                            ui: 'solo',
                                            shadow: true,
                                            readOnly: true,
                                            disabled: true,
                                            textAlign: 'center',
                                            reference: 'last_find_barcode',
                                            width: 200,
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
            tpl: `<b>{title}</b><br><div>{params.description}</div>`,
            cell: {
                encodeHtml: false,
                tools: {
                    plus: {
                        iconCls: 'x-fas fa-arrow-left green-dark size-24',
                        margin: '0 15 0 0',
                        tooltip: i18n.gettext('Select'),
                        handler: 'onProdSelectedByBarcode',
                        zone: 'start',
                        hidden: true
                    },

                },

            }
        }, {
            text: i18n.gettext('Barcode'),
            width: 130,
            align: 'right',
            tpl: `<b>{barcode}</b>`,
            cell: {align: 'right', encodeHtml: false}
        }, {
            text: i18n.gettext('Quantity'),
            width: 90,
            align: 'center',
            tpl: `<b>{amount}</b>`,
            cell: {align: 'right', encodeHtml: false}
        }, {
            text: i18n.gettext('Discount'),
            width: 90,
            align: 'left',
            tpl: `<div class="green-dark bolder">{price.sale:erpMoney}</div>`,
            cell: {align: 'right', encodeHtml: false}
        }, {
            text: i18n.gettext('Price'),
            width: 120,
            align: 'right',
            tpl: `<div class="red bolder">${i18n.gettext('Tax')}: {tax_rate:erpMoney}</div>
                  <div class="blue bolder"><b>${i18n.gettext('Price')}: {price.price:erpMoney}</b></div>`,
            cell: {align: 'right', encodeHtml: false}
        }
    ]
});
