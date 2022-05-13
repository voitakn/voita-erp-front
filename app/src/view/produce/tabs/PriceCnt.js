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
                            html: i18n.gettext('Base prices')
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
                pack: 'start',
                align: 'center'
            },
            defaults: {
                xtype: 'container',
                cls: 'size-16',
                margin: '0 20 10 0'
            },
            items: [
                {
                    width: 180,
                    bind: {
                        html: `${i18n.gettext('Purchase price')}</br> <b>{purchasePrice.price_base:erpMoney}</b>`
                    }
                },{
                    width: 180,
                },{
                    width: 180,
                    bind: {
                        html: `${i18n.gettext('Full purchase')}</br> <b>{purchasePrice.price:erpMoney}</b>`
                    }
                }, {
                    flex: 1,
                    margin: '0 0 0 0',
                },
                {
                    margin: '0 0 10 0',
                    items: [
                        {
                            xtype: 'button',
                            text: i18n.gettext('Purchase price'),
                            iconCls: 'fi-pencil',
                            hidden: true,
                            handler: 'editPurchasePrice',
                            bind: {
                                hidden: '{no_price_purchase_save}'
                            }
                        }
                    ]
                }

            ]
        },
        {
            xtype: 'container',
            cls: 'border-bottom',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'center'
            },
            defaults: {
                xtype: 'container',
                cls: 'size-16',
                margin: '10 20 10 0'
            },
            items: [
                {
                    width: 180,
                    bind: {
                        html: `${i18n.gettext('Retail price')}</br> <b>{mainPrice.price_base:erpMoney}</b>`,
                    }
                },
                {
                    width: 180,
                    cls: 'size-16 green-dark',
                    bind: {
                        html: `${i18n.gettext('Discount')} {mainPrice.sale_percent}%</br> <b> {mainPrice.sale:erpMoney}</b>`
                    }
                },
                {
                    width: 180,
                    bind: {
                        html: `${i18n.gettext('Full retail price')}</br> <b>{mainPrice.price:erpMoney}</b>`
                    }
                }, {
                    flex: 1,
                    margin: '0 0 0 0',
                }, {
                    margin: '10 0 10 0',
                    items: [
                        {
                            xtype: 'button',
                            text: i18n.gettext('Retail price'),
                            iconCls: 'fi-pencil',
                            hidden: true,
                            handler: 'editMainPrice',
                            bind: {
                                hidden: '{no_price_retail_save}'
                            }
                        }
                    ]
                }

            ]
        },
        {
            xtype: 'container',
            cls: 'border-bottom',
            items: [
                {
                    xtype: 'container',
                    margin: '10 0 10 0',
                    cls: 'head-1',
                    docked: 'top',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'title',
                            html: i18n.gettext('POS prices')
                        },
                        {
                            xtype: 'togglefield',
                            margin: '0 0 0 25',
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
                    margin: '0 0 15 0',
                    hidden: false,
                    bind: {
                        hidden: '{theCardOrigin.params.places_prices}'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'size-15',
                            html: i18n.gettext('For managing prices of each POS you can turn it on.')
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
            xtype: 'produce_edit_mainprice',
            reference: 'produce_edit_mainprice',
        },
        {
            xtype: 'produce_edit_purchaseprice',
            reference: 'produce_edit_purchaseprice',
        }
    ]
});
