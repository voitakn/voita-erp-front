Ext.define('Erp.view.sell.pos_sell.PosSell', {
    extend: 'Erp.base.Module',
    requires: [
        'Erp.base.Dialog',
        'Erp.util.Nominal',
        'Erp.view.common.MenuRetail'
    ],
    xtype: 'pos_sell',
    controller: 'pos_sell_ctrl',
    viewModel: {
        type: 'pos_sell_vm'
    },
    autoSize: true,
    scrollable: true,
    layout: 'vbox',
    items: [
        {
            xtype: 'retail_menu',
        },
        {
            xtype: 'container',
            reference: 'pos_sell',
            margin: '5 0 0 0',
            listeners: {
                element: 'element',
                click: 'onViewClick'
            },
            scrollable: 'x',
            layout: {
                type: 'hbox',
            },
            flex: 1,
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    margin: '0 20 0 0',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'head1',
                            items: [
                                {
                                    xtype: 'label',
                                    bind: {
                                        html: `{pos_market_place}`,
                                    }
                                },{
                                    xtype: 'button',
                                    iconCls: 'fi-pencil blue',
                                    tooltip: i18n.gettext('Change point of sale'),
                                    handler: 'onSelectStore'
                                },{
                                    xtype: 'container',
                                    flex: 1
                                },{
                                    xtype: 'segmentedbutton',
                                    margin: '0 0 0 0',
                                    bind: {
                                        value: '{retail_type}'
                                    },
                                    defaults: {
                                        iconAlign: 'left',
                                        ui: 'raised',
                                        border: 1
                                    },
                                    items: [
                                        {text: i18n.gettext('BARCODE'), value: true, iconCls: 'x-fa fa-barcode blue'},
                                        {text: i18n.gettext('CATALOG'), value: false, iconCls: 'x-fa fa-sitemap blue'},
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'pos_sell_catalog',
                            flex: 1,
                            hidden: true,
                            bind: {
                                hidden: '{retail_type}'
                            },
                        },
                        {
                            xtype: 'pos_sell_panel',
                            flex: 1,
                            bind: {
                                hidden: '{!retail_type}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'pos_sell_receipt',
                    minWidth: 500,
                }
            ]
        },
        {
            xtype: 'pos_sell_amount',
            listeners: {
                hide: 'onCloseAmount'
            }
        },
        {
            xtype: 'pos_sell_config'
        },
        {
            xtype: 'pos_sell_paycard',
            listeners: {
                hide: 'onClosePayCard',
                onSavePayCard: 'savePayCard'
            }
        },
        {
            xtype: 'pos_sell_paycash',
            listeners: {
                hide: 'onClosePaycash',
                onSavePayCash: 'savePayCash'
            }
        },
        {
            xtype: 'pos_sell_trash',
            reference: 'pos_sell_trash_confirm',
        }

    ]
});
