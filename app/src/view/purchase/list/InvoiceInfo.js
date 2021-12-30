Ext.define('Erp.view.purchase.list.InvoiceInfo', {
    extend: 'Ext.Container',
    xtype: 'purchase_list_invoiceinfo',
    reference: 'purchase_list_invoiceinfo',
    items: [
        {
            xtype: 'head1',
            items: [
                {
                    xtype: 'button',
                    margin: '0 15 0 0',
                    text: i18n.gettext('Back'),
                    iconCls: 'x-fa fa-arrow-left',
                    handler: 'onCloseInvoice',
                },{
                    xtype: 'button',
                    margin: '0 15 0 0',
                    text: i18n.gettext('Print'),
                    iconCls: 'x-fa fa-print',
                    handler: 'onPrintInvoice',
                },{
                    xtype: 'button',
                    text: i18n.gettext('Change payment'),
                    iconCls: 'fi-pencil green-dark',
                    handler: 'onEditPaid',
                    hidden: true,
                    disabled: true,
                    bind: {
                        disabled: '{!(show_invoice.id && !show_invoice.paid)}',
                        hidden: '{no_inv_buy_paid_save}'
                    }
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
                                        html: `{show_invoice.doc_number} {show_invoice.doc_date}`,
                                    }
                                }
                            ]
                        },{
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Created')}:`,
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
                                    html: `${i18n.gettext('Employee')}:`,
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
                                    html: `${i18n.gettext('Supplier')}:`,
                                },{
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: `{show_invoice.supplier_title}`,
                                    }
                                }
                            ]
                        },{
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    html: `${i18n.gettext('Comment')}:`,
                                },{
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: `{show_invoice.title}`,
                                    }
                                }
                            ]
                        }
                    ]
                }, {
                    items: [
                        {
                            cls: 'text-right bolder',
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    html: `${i18n.gettext('Payment status')}:`,
                                    bind: {
                                        cls: `{show_invoice.paid ? 'green-dark' : 'red'}`,
                                    }
                                },{
                                    xtype: 'label',
                                    width: 120,
                                    bind: {
                                        html: `{invoice_pay}`,
                                        cls: `{show_invoice.paid ? 'green-dark' : 'red'}`,
                                    }
                                }
                            ]
                        },{
                            cls: 'text-right bolder',
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    html: `${i18n.gettext('Payment number')}:`,
                                    bind: {
                                        cls: `{show_invoice.paid ? 'green-dark' : 'red'}`,
                                    }
                                },{
                                    xtype: 'label',
                                    width: 120,
                                    bind: {
                                        html: `{show_invoice.paid_params.doc_number}`,
                                        cls: `{show_invoice.paid ? 'green-dark' : 'red'}`,
                                    }
                                }
                            ]
                        },{
                            cls: 'text-right bolder',
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    html: `${i18n.gettext('Payment date')}:`,
                                    bind: {
                                        cls: `{show_invoice.paid ? 'green-dark' : 'red'}`,
                                    }
                                },{
                                    xtype: 'label',
                                    width: 120,
                                    bind: {
                                        html: `{show_invoice.paid_params.date}`,
                                        cls: `{show_invoice.paid ? 'green-dark' : 'red'}`,
                                    }
                                }
                            ]
                        }, {
                            cls: 'text-right bolder',
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    html: `${i18n.gettext('Quantity')}:`,
                                },{
                                    xtype: 'label',
                                    width: 120,
                                    bind: {
                                        html: `{show_invoice.amount_total} ${i18n.gettext('un.')}`,
                                    }
                                }
                            ]
                        },{
                            cls: 'text-right bolder red',
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    html: `${i18n.gettext('Total taxes')}:`,
                                },{
                                    xtype: 'label',
                                    width: 120,
                                    bind: {
                                        html: `{show_invoice.tax_total:erpMoney}`,
                                    }
                                }
                            ]
                        },{
                            cls: 'text-right bolder blue',
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    html: `${i18n.gettext('Total amount')}:`,
                                },{
                                    xtype: 'label',
                                    width: 120,
                                    cls: 'size-16',
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
