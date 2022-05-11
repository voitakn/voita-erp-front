Ext.define('Erp.view.b2b.catalog.Catalog', {
    extend: 'Erp.base.Module',
    xtype: 'b2b_catalog',
    reference: 'b2b_catalog',
    controller: 'b2b_catalog_ctrl',
    viewModel: {
        type: 'b2b_catalog_vm'
    },
    autoSize: true,
    scrollable: 'y',
    layout: {
        type: 'hbox',
        pack: 'start',

    },
    items: [
        {
            xtype: 'container',
            width: 240,
            items: [
                {
                    xtype: 'container',
                    docked: 'top',
                    margin: '0 20 0 0',
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
                    margin: '0 20 0 0',
                    // width: 240,
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
            flex: 1,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    margin: '0 20 0 0',
                    layout: 'fit',
                    flex: 1,b
                    items: [
                        {
                            xtype: 'head1',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'title',
                                    html: i18n.gettext('Catalog')
                                }
                            ]
                        },
                        {
                            xtype: 'componentdataview',
                            inline: true,
                            itemConfig: {
                                bodyCls: 'shadow-sm bg-white border border-1 rounded margin-sh',
                                padding: '5 5 5 5',
                                textAlign: 'center',
                                // viewModel: true, // enable per-item record binding
                                items: [
                                    {
                                        xtype: 'container',
                                        width: 200,
                                        layout: {
                                            type: 'vbox',
                                            align: 'center',
                                        },

                                        items: [
                                            {
                                                xtype: 'image',
                                                // bodyCls: 'border border-1 rounded margin-sh',
                                                margin: '0 0 5 0',
                                                width: 100,
                                                height: 100,
                                                bind: {
                                                    src: 'resources/shared/images/no_logo.png',
                                                }
                                            },
                                            {
                                                items: [
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
                                                        cls: 'bolder',
                                                        // reference: 'textPrice'
                                                    },
                                                ]
                                            },
                                            {
                                                xtype: 'spinnerfield',
                                                ui: 'payment',
                                                margin: '0 5 0 0',
                                                width: 80,
                                                clearable: true,
                                                minValue: 1,
                                                value: 1,
                                            },
                                            {
                                                xtype: 'button',
                                                width: 80,
                                                // iconCls: 'x-fas fa-arrow-right green-dark size-24',
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
                                    html: 'price:erpMoney'
                                },
                            },
                            bind: {
                                store: '{select_produce_store}',
                            },
                        },
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'fit',
                    width: 250,
                    items: [
                        {
                            xtype: 'head1',
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
                            // inline: true,
                            itemConfig: {
                                bodyCls: 'shadow-sm bg-white border border-1 rounded margin-sh',
                                padding: '5 5 5 5',
                                textAlign: 'center',
                                defaults: {
                                    xtype: 'container',
                                    cls: 'size-12',
                                    defaults: {
                                        xtype: 'label',
                                    }
                                },
                                layout: {
                                    type: 'vbox',
                                    align: 'center',
                                },
                                items: [
                                    {
                                        xtype: 'image',
                                        // bodyCls: 'border border-1 rounded margin-sh',
                                        margin: '0 0 5 0',
                                        width: 100,
                                        height: 100,
                                        bind: {
                                            src: 'resources/shared/images/no_logo.png',
                                        }
                                    },
                                    {
                                        items: [
                                            {
                                                margin: '0 0 5 0',
                                                cls: 'bolder',
                                                reference: 'textTitle'
                                            },
                                            {
                                                margin: '0 0 5 0',
                                                cls: '',
                                                reference: 'textBarcode'
                                            },
                                            {
                                                margin: '0 0 5 0',
                                                cls: 'bolder blue',
                                                reference: 'textAmount'
                                            },
                                            {
                                                margin: '0 0 5 0',
                                                cls: 'bolder',
                                                // reference: 'textPrice'
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'button',
                                        width: 80,
                                        // iconCls: 'x-fas fa-arrow-right green-dark size-24',
                                        text: i18n.gettext('Add'),
                                        tooltip: i18n.gettext('Add to cart'),
                                        // handler: 'addProdToCart'
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
                                    html: 'price:erpMoney'
                                },
                            },
                            bind: {
                                store: '{cart_items_store}',
                                // selection: '{dataview_rec}',
                            },
                        },

                    ]
                },
            ]
        },
    ]
});
