Ext.define('Erp.view.produce.tabs.PriceCnt', {
    extend: 'Ext.Container',
    xtype: 'produce_price_container',
    reference: 'produce_price_container',
    autoSize: true,
    items: [
        {
            xtype: 'container',
            margin: '10 0 0 0',
            docked: 'top',
            items: [
                {
                    xtype: 'container',
                    cls: 'head-1',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'title',
                            html: i18n.gettext('Retail prices')
                        },
                    ]
                },
            ]
        },
        {
            xtype: 'container',
            cls: 'border-bottom',
            layout: {
                type: 'hbox',
                pack: 'end',
                align: 'center'
            },
            defaults: {
                xtype: 'container',
                flex: 1,
                defaults: {
                    xtype: 'label',
                    margin: '7 0',
                },
            },
            items: [
                {
                    items: [
                        {
                            cls: 'bolder size-15',
                            html: `${i18n.gettext('Basic price')}`
                        }, {
                            cls: 'bolder size-16',
                            bind: {
                                html: '{mainPrice.price_base:erpMoney}'
                            }
                        }
                    ]
                },
                {
                    items: [
                        {
                            cls: 'bolder size-15 green-dark',
                            html: `${i18n.gettext('Discount')}`
                        }, {
                            cls: 'bolder size-16 green-dark',
                            bind: {
                                html: '{mainPrice.sale_percent}% = {mainPrice.sale:erpMoney}'
                            }
                        }
                    ]
                },
                {
                    items: [
                        {
                            cls: 'bolder size-15 blue',
                            html: `${i18n.gettext('Total price')}`
                        }, {
                            cls: 'bolder size-16 blue',
                            bind: {
                                html: '{mainPrice.price:erpMoney}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'button',
                    flex: 0,
                    text: i18n.gettext('Edit'),
                    iconCls: 'fi-pencil',
                    hidden: true,
                    handler: 'editMainPrice',
                    bind: {
                        hidden: '{no_price_retail_save}'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            margin: '0 0 20 0',
            cls: 'border-bottom',
            items: [
                {
                    xtype: 'head2',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'bolder',
                            html: i18n.gettext('POS prices')
                        },
                        {
                            xtype: 'togglefield',
                            margin: '10 0 0 10',
                            flex: 1,
                            boxLabel: i18n.gettext('Enable different prices for each POS'),
                            readOnly: true,
                            bind: {
                                value: '{theCard.params.places_prices}',
                                readOnly: '{no_price_retail_save}'
                            },
                            listeners: {
                                change: 'savePlacesPrices'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '0 0 20 0',
                    hidden: false,
                    bind: {
                        hidden: '{theCardOrigin.params.places_prices}'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'size-15',
                            html: i18n.gettext('Manage prices of each POS is inactive. You can turn it on.')
                        }
                    ]
                },
                {
                    xtype: 'produce_places_price',
                    margin: '0 0 10 0',
                    height: 300,
                    hidden: true,
                    bind: {
                        hidden: '{!theCardOrigin.params.places_prices}'
                    }
                },

            ]
        },
        {
            xtype: 'container',
            margin: '0 0 10 0',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'center'
            },
            defaults: {
                xtype: 'container',
                flex: 1,
                defaults: {
                    xtype: 'label',
                    margin: '7 0',
                },
            },
            items: [
                {
                    items: [
                        {
                            cls: 'bolder size-16',
                            bind: {
                                html: '{purchasePrice.title}'
                            }
                        }
                    ]
                },
                {
                    items: [
                        {
                            cls: 'bolder size-15 blue',
                            html: `${i18n.gettext('Total price')}`
                        }, {
                            cls: 'bolder size-16 blue',
                            bind: {
                                html: '{purchasePrice.price:erpMoney}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'button',
                    flex: 0,
                    text: i18n.gettext('Edit'),
                    iconCls: 'fi-pencil',
                    hidden: true,
                    handler: 'editPurchasePrice',
                    bind: {
                        hidden: '{no_price_purchase_save}'
                    }
                }
            ]
        },
        {
            xtype: 'produce_edit_mainprice',
            reference: 'produce_edit_mainprice',
        },
        {
            xtype: 'produce_edit_purchaseprice',
            reference: 'produce_edit_purchaseprice',
        }
    ]
});