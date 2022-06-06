Ext.define('Erp.view.b2b.catalog.Catalog', {
    extend: 'Erp.base.Module',
    xtype: 'b2b_catalog',
    reference: 'b2b_catalog',
    controller: 'b2b_catalog_ctrl',
    viewModel: {
        type: 'b2b_catalog_vm'
    },
    layout: {
        type: 'hbox',
        pack: 'start',
    },
    items: [
        {
            xtype: 'container',
            width: 250,
            margin: '0 20 0 0',
            items: [
                {
                    xtype: 'container',
                    docked: 'top',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    padding: '0 0 5 0',
                    cls: 'head-1 border-bottom',
                    items: [
                        {
                            xtype: 'label',
                            margin: '0 20 0 0',
                            cls: 'title',
                            html: i18n.gettext('B2B')
                        },
                        {
                            xtype: 'button',
                            text: i18n.gettext('Back'),
                            iconCls: 'x-fa fa-arrow-left',
                            handler: 'toBack',
                        },
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'container',
                            docked: 'top',
                            padding: '0 0 0 15',
                            cls: 'border-bottom',
                            defaults: {
                                xtype: 'container',
                                cls: 'size-12',
                                margin: '5 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                defaults: {
                                    xtype: 'label',
                                }
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            html: i18n.gettext('Company:'),
                                            margin: '0 15 0 0',
                                            cls: 'bolder',
                                        },{
                                            flex: 1,
                                            cls: 'text-right',
                                            bind: {html: '{partner.title}'}
                                        }
                                    ]
                                },{
                                    items: [
                                        {
                                            html: i18n.gettext('Address:'),
                                            margin: '0 15 0 0',
                                            cls: 'bolder',
                                        },{
                                            flex: 1,
                                            cls: 'text-right',
                                            bind: {html: '{partner.address}'}
                                        }
                                    ]
                                },{
                                    items: [
                                        {
                                            html: i18n.gettext('Phone:'),
                                            margin: '0 15 0 0',
                                            cls: 'bolder',
                                        },{
                                            flex: 1,
                                            cls: 'text-right',
                                            bind: {html: '{partner.phone}'}
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            docked: 'top',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'title',
                                    html: i18n.gettext('Categories')
                                },'->',{
                                    xtype: 'button',
                                    iconCls: 'erp-icon remove-done green-dark',
                                    tooltip: i18n.gettext('Clear selection'),
                                    handler: 'deselectCategory'
                                },
                            ]
                        },
                        {
                            xtype: 'container',
                            reference: 'b2b_catalog_tree_container',
                            layout: 'fit',
                        }
                    ]
                },
            ]
        },
        {
            xtype: 'container',
            margin: '0 20 0 0',
            flex: 1,
            layout: 'fit',
            items: [
                {
                    xtype: 'container',
                    docked: 'top',
                    items: [
                        {
                            xtype: 'head1',
                            padding: '0 0 5 0',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'title',
                                    html: i18n.gettext('Catalog')
                                }
                            ]
                        },
                    ]
                },
                {
                    xtype: 'componentdataview',
                    inline: true,
                    itemConfig: {
                        bodyCls: 'shadow-sm gray-light-bg border border-1 rounded margin-sh',
                        textAlign: 'center',
                        items: [
                            {
                                xtype: 'container',
                                padding: '10 5 10 5',
                                height: 260,
                                layout: {
                                    type: 'vbox',
                                    pack: 'start',
                                    align: 'center'
                                },
                                cls: 'text-center',
                                defaults: {
                                    width: 130,
                                },
                                items: [
                                    {
                                        xtype: 'image',
                                        margin: '0 0 5 0',
                                        width: 100,
                                        height: 100,
                                        bind: {
                                            src: 'resources/shared/images/no_logo.png',
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '0 0 5 0',
                                        cls: 'bolder',
                                        reference: 'textTitle'
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '0 0 5 0',
                                        cls: '',
                                        reference: 'textBarcode'
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '0 0 5 0',
                                        cls: 'bolder blue',
                                        reference: 'textPrice'
                                    },
                                    {
                                        xtype: 'spinnerfield',
                                        margin: '0 5 0 0',
                                        clearable: true,
                                        minValue: 1,
                                        decimals: 3,
                                        value: 1,
                                    },
                                    {
                                        xtype: 'button',
                                        width: 80,
                                        text: i18n.gettext('Add'),
                                        tooltip: i18n.gettext('Add to cart'),
                                        handler: 'addProdToCart'
                                    }
                                ]
                            },
                        ],
                    },
                    itemDataMap: {
                        textTitle: {
                            html: 'title'
                        },
                        textBarcode: {
                            html: 'barcode'
                        },
                        textAmount: {
                            html: 'amount'
                        },
                        textPrice: {
                            html: 'fmt_price'
                        },
                        textRetail: {
                            html: 'fmt_retail'
                        },
                    },
                    bind: {
                        store: '{market_produce_store}',
                    },
                },
            ]
        },
        {
            xtype: 'container',
            width: 280,
            layout: 'vbox',
            items: [
                {
                    xtype: 'head1',
                    padding: '0 0 5 0',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'title',
                            html: i18n.gettext('Cart')
                        }
                    ]
                },
                {
                    xtype: 'componentdataview',
                    margin: '0 0 10 0',
                    flex: 1,
                    // inline: true,
                    itemConfig: {
                        bodyCls: 'shadow-sm gray-light-bg border border-1 rounded margin-sh',
                        items: [
                            {
                                xtype: 'container',
                                // width: 120,
                                // height: 180,
                                padding: '10 10 10 10',
                                defaults: {
                                    xtype: 'container',
                                    cls: 'size-12',
                                },
                                items: [
                                    {
                                        layout: {
                                            type: 'hbox',
                                            pack: 'end',
                                            align: 'start'
                                        },
                                        items: [
                                            {
                                                margin: '0 10 0 0',
                                                flex: 1,
                                                defaults: {
                                                    xtype: 'container',
                                                    height: 40,
                                                    defaults: {
                                                        xtype: 'label',
                                                    }
                                                },
                                                items: [
                                                    {
                                                        items: [
                                                            {
                                                                cls: 'bolder',
                                                                reference: 'textTitle'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        items: [
                                                            {
                                                                cls: 'bolder',
                                                                reference: 'textBarcode'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        items: [
                                                            {
                                                                cls: 'bolder blue',
                                                                reference: 'textPrice'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        items: [
                                                            {
                                                                cls: 'bolder',
                                                                reference: 'textAmount',
                                                            },
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'image',
                                                width: 80,
                                                height: 80,
                                                bind: {
                                                    src: 'resources/shared/images/no_logo.png',
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                ui: 'decline noborder',
                                                iconCls: 'x-fa fa-times',
                                                tooltip: i18n.gettext('Remove from list'),
                                                handler: 'onRemoveFromCart',
                                            },
                                        ],
                                    },
                                ]
                            }
                        ],
                    },
                    itemDataMap: {
                        textTitle: {
                            html: 'title'
                        },
                        textBarcode: {
                            html: 'barcode'
                        },
                        textAmount: {
                            html: 'amount'
                        },
                        textPrice: {
                            html: 'fmt_price',
                        },
                    },
                    bind: {
                        store: '{cart_items_store}',
                    },
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'center',
                        align: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            margin: '0 15 10 0',
                            minWidth: 150,
                            cls: 'green-dark-bg text-white',
                            iconAlign: 'bottom',
                            iconCls: 'x-far fa-credit-card white',
                            text: i18n.gettext('Order Send'),
                            handler: 'saveOrder',
                            disabled: true,
                            bind: {
                                disabled: '{bill_price_total > 0 ? false : true}'
                            },
                        },
                    ]
                },
                {
                    xtype: 'container',
                    cls: 'blue-bg text-white',
                    items: [
                        {
                            xtype: 'container',
                            margin: '5 10 5 10',
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
                                            cls: 'bolder text-left',
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
                                            cls: 'bolder text-left',
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
                            margin: '0 10 10 10',
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
            ],
        }
    ]
});
