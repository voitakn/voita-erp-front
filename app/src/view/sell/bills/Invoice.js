Ext.define('Erp.view.sell.bills.Invoice', {
    extend: 'Ext.grid.Grid',
    xtype: 'sell_bills_invoice',
    reference: 'sell_bills_invoice',
    autoSize: true,
    bind: {
        store: '{invoice_items_store}'
    },
    columns: [
        {
            text: i18n.gettext('Title'),
            flex: 1,
            menu: false,
            minWidth: 200,
            tpl: `<a href="/#produce/{produce_id}"><b data-qtip="${i18n.gettext('Go to the product card')}">{item_params.title}</b></a> <i>{item_params.barcode}</i>
                    <div>${i18n.gettext('Tax rate')}: {tax_value}%</div>`,
            cell: {
                encodeHtml: false,
            }
        },{
            text: i18n.gettext('Quantity'),
            width: 75,
            align: 'right',
            tpl: `<b>{amount:number("0.00")}</b>`,
            cell: {
                align: 'right',
                encodeHtml: false,
            }
        },{
            text: i18n.gettext('Price'),
            width: 160,
            align: 'right',
            cell: {
                align: 'right',
                encodeHtml: false,
            },
            tpl: `<div>{[i18n.gettext('Without tax')]}: {price_no_tax:erpMoney}</div>
                  <div class="red">{[i18n.gettext('Tax')]}: {tax_price:erpMoney}</div>
                  <div class="blue bolder">{[i18n.gettext('Price')]}: {price:erpMoney}</div>`
        },{
            text: i18n.gettext('Amount'),
            width: 180,
            align: 'right',
            tpl: `<div>{[i18n.gettext('Without tax')]}: {total_no_tax:erpMoney}</div>
                  <div class="red">{[i18n.gettext('Tax')]}: {tax_total:erpMoney}</div>
                  <div class="blue bolder">{[i18n.gettext('Total')]}: {price_total:erpMoney}</div>`,
            cell: {
                align: 'right',
                encodeHtml: false,
            }
        }
    ],
    items: [
        {
            xtype: 'head1',
            items: [
                {
                    xtype: 'button',
                    margin: '0 15 0 0',
                    text: i18n.gettext('Back'),
                    iconCls: 'x-fa fa-arrow-left',
                    handler: 'onCloseBill',
                },{
                    xtype: 'button',
                    text: i18n.gettext('Print'),
                    iconCls: 'x-fa fa-print',
                    handler: 'onPrintBill',
                }
            ]
        },{
            xtype: 'container',
            docked: 'top',
            cls: 'border-bottom',
            layout: {
                type: 'hbox',
            },
            defaults: {
                xtype: 'container',
                minWidth: 250,
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
                                },{
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: `№ {show_invoice.doc_number}`,
                                    }
                                }
                            ]
                        },{
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Date')}:`,
                                },{
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: `{show_invoice.date_create:date("Y-m-d H:i:s")}`,
                                    }
                                }
                            ]
                        },{
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Seller')}:`,
                                },{
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: `{show_invoice.user_data.name} {show_invoice.user_data.surname}`,
                                    }
                                }
                            ]
                        },{
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Point of sale')}:`,
                                },{
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: `{show_invoice.place_title}`,
                                    }
                                }
                            ]
                        },{
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Payment method')}:`,
                                },{
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: `{show_invoice.pay_type:payType}`,
                                    }
                                }
                            ]
                        },{
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Payment number')}:`,
                                },{
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: `{show_invoice.pay_params.pay_number}`,
                                    }
                                }
                            ]
                        }
                    ]
                }, {
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'text-right bolder',
                                    flex: 1,
                                    html: `${i18n.gettext('Quantity')}:`,
                                },{
                                    xtype: 'label',
                                    width: 120,
                                    cls: 'size-16 bolder text-right',
                                    bind: {
                                        html: `{show_invoice.amount_total}`,
                                    }
                                }
                            ]
                        },{
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'text-right bolder red',
                                    flex: 1,
                                    html: `${i18n.gettext('Tax')}:`,
                                },{
                                    xtype: 'label',
                                    width: 120,
                                    cls: 'size-16 bolder text-right red',
                                    bind: {
                                        html: `{show_invoice.tax_total:erpMoney}`,
                                    }
                                }
                            ]
                        },{
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'text-right bolder green-dark',
                                    flex: 1,
                                    html: `${i18n.gettext('Discount')}:`,
                                },{
                                    xtype: 'label',
                                    width: 120,
                                    cls: 'size-16 bolder text-right green-dark',
                                    bind: {
                                        html: `{show_invoice.sale_total:erpMoney}`,
                                    }
                                }
                            ]
                        },{
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'text-right bolder',
                                    flex: 1,
                                    html: `${i18n.gettext('Without tax')}:`,
                                },{
                                    xtype: 'label',
                                    width: 120,
                                    cls: 'size-16 bolder text-right',
                                    bind: {
                                        html: `{(show_invoice.price_total - show_invoice.tax_total):erpMoney}`,
                                    }
                                }
                            ]
                        },{
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'size-16 text-right bolder blue',
                                    flex: 1,
                                    html: `${i18n.gettext('Total')}:`,
                                },{
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
        }, {
            xtype: 'container',
            docked: 'bottom',
            cls: 'border-top',
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'container',
                    margin: '10 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'size-18 text-right bolder blue',
                            flex: 1,
                            html: `${i18n.gettext('Total')}:`,
                        },{
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
});
