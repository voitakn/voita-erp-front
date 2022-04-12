Ext.define('Erp.view.purchase.buy.Invoice', {
    extend: 'Ext.Container',
    xtype: 'buy_invoice',
    requires: [
        'Erp.base.GridRowedit',
    ],
    layout: 'fit',
    items: [
        {
            xtype: 'head1',
            items: [{
                xtype: 'label',
                cls: 'title',
                html: i18n.gettext('New purchase')
            },{
                xtype: 'button',
                margin: '0 0 0 10',
                iconCls: 'x-fas fa-list',
                text: i18n.gettext('Purchases list'),
                handler(btn) {
                    btn.up('purchase_buy').getController().redirectTo('purchase_list');
                }
            },{
                xtype: 'button',
                iconCls: 'x-far fa-times-circle red',
                margin: '0 0 0 10',
                text: i18n.gettext('Clean'),
                handler: 'clearInvoice'
            },{
                xtype: 'spacer',
                flex: 1
            },{
                xtype: 'button',
                margin: '0 0 0 10',
                iconCls: 'fi-save green-dark',
                text: i18n.gettext('Save'),
                handler: 'saveInvoice'
            }]
        }, {
            xtype: 'formpanel',
            docked: 'top',
            reference: 'buy_invoice_form',
            bodyPadding: '0 0 0 0',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'start'
                    },
                    defaults: {
                        xtype: 'container',
                        layout: {
                            type: 'vbox',
                            pack: 'start'
                        },
                        defaults: {
                            labelAlign: 'left',
                            labelWidth: 130,
                            clearable: true,
                        }
                    },
                    items: [
                        {
                            margin: '5 10 15 0',
                            flex: 1.2,
                            items: [
                                {
                                    xtype: 'placebox',
                                    width: 250,
                                    reference: 'purchase_buy_place_combobox',
                                    viewModel: {
                                        data: {
                                            parent_field: 'buy_data.place_id',
                                            autoSelect: true,
                                            required: true,
                                            editable: false,
                                        },
                                        links: {
                                            place_id: '{buy_data.place_id}'
                                        }
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    label: i18n.gettext('Employee'),
                                    bind: {
                                        html: '{seller_full_name}'
                                    }
                                },{
                                    xtype: 'combobox',
                                    valueField: 'id',
                                    displayField: 'title',
                                    editable: false,
                                    queryMode: 'local',
                                    bind: {
                                        value: '{buy_data.supplier_id}',
                                        store: '{suppliers_store}'
                                    },
                                    label: i18n.gettext('Supplier'),
                                }
                            ]
                        },{
                            margin: '5 0 15 10',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'textfield',
                                    label: i18n.gettext('Purchase №'),
                                    required: true,
                                    clearable: true,
                                    bind: {
                                        value: '{buy_data.doc_number}'
                                    }
                                },{
                                    xtype: 'datefield',
                                    reference: 'buy_date_field',
                                    label: i18n.gettext('Date'),
                                    dateFormat: 'Y-m-d',
                                    maxDate: new Date(),
                                    required: true,
                                    editable: false,
                                    clearable: true,
                                    bind: {
                                        value: '{buy_doc_date}'
                                    }
                                },{
                                    xtype: 'textfield',
                                    label: i18n.gettext('Comment'),
                                    bind: {
                                        value: '{buy_data.title}'
                                    }
                                }
                            ]
                        }
                    ]
                },{
                    xtype: 'container',
                    cls: 'border-bottom',
                    items: [
                        {
                            xtype: 'container',
                            margin: '0 0 10 0',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'togglefield',
                                    labelAlign: 'left',
                                    //labelWidth: 130,
                                    label: i18n.gettext('Is Paid'),
                                    boxLabel: i18n.gettext('Yes'),
                                    bind: {
                                        value: '{buy_data.paid}'
                                    }
                                },{
                                    xtype: 'selectfield',
                                    margin: '0 0 0 15',
                                    width: 110,
                                    clearable: true,
                                    editable: false,
                                    placeholder: i18n.gettext('Type of payment'),
                                    queryMode: 'local',
                                    valueField: 'id',
                                    displayField: 'text',
                                    forceSelection: true,
                                    disabled: true,
                                    required: false,
                                    store: {
                                        data: [
                                            {id: 'cash', text: i18n.gettext('Cash')},
                                            {id: 'bank', text: i18n.gettext('Bank')}
                                        ]
                                    },
                                    bind: {
                                        value: '{buy_data.paid_params.type}',
                                        disabled: '{!buy_data.paid}',
                                        required: '{buy_data.paid}'
                                    }
                                },{
                                    xtype: 'textfield',
                                    placeholder: i18n.gettext('Document number'),
                                    margin: '0 0 0 15',
                                    width: 140,
                                    disabled: true,
                                    clearable: true,
                                    required: false,
                                    bind: {
                                        value: '{buy_data.paid_params.doc_number}',
                                        disabled: '{!buy_data.paid}',
                                        required: '{buy_data.paid}'
                                    }
                                },{
                                    xtype: 'datefield',
                                    placeholder: i18n.gettext('Date of payment'),
                                    dateFormat: 'Y-m-d',
                                    margin: '0 0 0 15',
                                    maxDate: new Date(),
                                    width: 140,
                                    required: false,
                                    clearable: true,
                                    disabled: true,
                                    editable: false,
                                    bind: {
                                        value: '{buy_data.paid_params_date}',
                                        disabled: '{!buy_data.paid}',
                                        required: '{buy_data.paid}'
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
                type: 'hbox',
                pack: 'end',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    margin: '15 0 10 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'size-20 text-right bolder',
                            margin: '0 20 0 0',
                            flex: 1,
                            html: `${i18n.gettext('Total')}:`
                        },{
                            xtype: 'label',
                            cls: 'size-22 text-right bolder green-dark',
                            bind: {
                                html: '{buy_data.invoice_total:erpMoney}'
                            }
                        }
                    ]
                },
            ]
        },
        {
            xtype: 'base_grid_rowedit',
            reference: 'purchase_buy_items',
            bind: {
                store: '{buy_items_store}'
            },
            plugins: {
                gridpagingtoolbar: false,
            },
            columns: [
                {
                    flex: 1,
                    menu: false,
                    text: i18n.gettext('Products'),
                    minWidth: 220,
                    tpl: `<b>{title}</b><div><i>{barcode}</i></div>`,
                    cell: {
                        encodeHtml: false,
                        tools: {
                            plus: {
                                iconCls: 'x-far fa-times-circle red size-24',
                                margin: '0 0 0 5',
                                tooltip: i18n.gettext('Delete from the list'),
                                handler: 'deleteFromItems',
                                zone: 'end',
                            },
                        }
                    }
                },{
                    text: i18n.gettext('Price buy'),
                    width: 120,
                    menu: false,
                    dataIndex: 'price',
                    align: 'right',
                    tpl: `{price:erpMoney}`,
                    editor: {
                        xtype: 'numberfield',
                        required: true,
                    },
                    cell: {
                        align: 'right',
                        encodeHtml: false,
                    }
                },{
                    text: i18n.gettext('Quantity'),
                    width: 90,
                    menu: false,
                    align: 'right',
                    dataIndex: 'amount',
                    tpl: `{amount:number("0.00")}`,
                    editor: {
                        xtype: 'spinnerfield',
                        required: true,
                    },
                    cell: {
                        align: 'right',
                        encodeHtml: false,
                    }
                },{

                    width: 180,
                    menu: false,
                    align: 'right',
                    dataIndex: 'price_total',
                    tpl: `{price_total:erpMoney}`,
                    bind: {
                        text: `${i18n.gettext('Total')}: {buy_data.invoice_total:erpMoney}`
                    },
                    cell: {
                        align: 'right',
                        encodeHtml: false,
                        tools: {
                            edit: {
                                zone: 'start',
                                cls: 'green-dark',
                                tooltip: i18n.gettext('Edit'),
                                handler: 'editBuyItem'
                            }
                        }
                    }
                }
            ]
        }
    ]
});