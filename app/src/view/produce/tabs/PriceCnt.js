Ext.define('Erp.view.produce.PriceContainer', {
    extend: 'Ext.Container',
    xtype: 'produce_price_container',
    reference: 'produce_price_container',
    items: [
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
                        },{
                            cls: 'bolder size-16',
                            bind: {
                                html: '{mainPrice.price_base:erpMoney}'
                            }
                        }
                    ]
                },{
                    items: [
                        {
                            cls: 'bolder size-15 green-dark',
                            html: `${i18n.gettext('Discount')}`
                        },{
                            cls: 'bolder size-16 green-dark',
                            bind: {
                                html: '{mainPrice.sale_percent}% = {mainPrice.sale:erpMoney}'
                            }
                        }
                    ]
                },{
                    items: [
                        {
                            cls: 'bolder size-15 blue',
                            html: `${i18n.gettext('Total price')}`
                        },{
                            cls: 'bolder size-16 blue',
                            bind: {
                                html: '{mainPrice.price:erpMoney}'
                            }
                        }
                    ]
                },{
                    flex: 0,
                    items: [
                        {
                            xtype: 'button',
                            text: i18n.gettext('Edit'),
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
                    xtype: 'head2',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'bolder',
                            html: i18n.gettext('POS prices')
                        },{
                            xtype: 'togglefield',
                            margin: '0 0 0 20',
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
                }, {
                    xtype: 'container',
                    margin: '0 0 10 0',
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
                    hidden: true,
                    height: 350,
                    bind: {
                        hidden: '{!theCardOrigin.params.places_prices}'
                    }
                }
            ]
        },
        {
            xtype: 'produce_edit_mainprice',
            reference: 'produce_edit_mainprice',
        }
    ]
});