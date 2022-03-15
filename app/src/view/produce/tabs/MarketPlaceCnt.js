Ext.define('Erp.view.produce.tabs.MarketPlaceCnt', {
    extend: 'Ext.Container',
    xtype: 'produce_marketplace_container',
    reference: 'produce_marketplace_container',
    autoSize: true,
    listeners: {
        hide: 'onHideMarketplace'
    },
    items: [
        {
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'container',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'head2',
                            margin: '10 0 0 0',
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    html: i18n.gettext('Marketplace configuration')
                                },
                                {
                                    text: i18n.gettext('Edit'),
                                    iconCls: 'fi-pencil',
                                    margin: '0 0 0 0',
                                    disabled: false,
                                    handler: 'onEditHtml',
                                    bind: {
                                        disabled: '{no_com_produce_save}',
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                pack: 'start'
                            },
                            defaults: {
                                xtype: 'container',
                                minWidth: 250,
                                flex: 1,
                            },
                            items: [
                                {
                                    defaults: {
                                        xtype: 'container',
                                        margin: '10 0',
                                        layout: {
                                            type: 'hbox'
                                        },
                                        flex: 1,
                                        defaults: {
                                            xtype: 'label',
                                        }
                                    },
                                    items: [
                                        {
                                            items: [
                                                {
                                                    width: 130,
                                                    cls: 'bolder',
                                                    html: `${i18n.gettext('Title')}:`
                                                },
                                                {
                                                    flex: 1,
                                                    bind: {
                                                        html: '{theCard.params.html.title}',
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    width: 130,
                                                    cls: 'bolder',
                                                    html: `${i18n.gettext('Description')}:`
                                                },
                                                {
                                                    flex: 1,
                                                    bind: {
                                                        html: '{theCard.params.html.desc}',
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    width: 130,
                                                    cls: 'bolder',
                                                    html: `${i18n.gettext('H1')}:`
                                                },
                                                {
                                                    flex: 1,
                                                    bind: {
                                                        html: '{theCard.params.html.h1}',
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    width: 130,
                                                    cls: 'bolder',
                                                    html: `${i18n.gettext('Keywords')}:`
                                                },
                                                {
                                                    flex: 1,
                                                    bind: {
                                                        html: '{theCard.params.html.key}',
                                                    }
                                                }
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                },

            ],
        },
        {
            xtype: 'market_edit_html',
        }
    ]
});