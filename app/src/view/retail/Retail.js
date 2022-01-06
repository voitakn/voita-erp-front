Ext.define('Erp.view.retail.Retail', {
    extend: 'Erp.base.Module',
    xtype: 'retail',
    controller: 'retail_ctrl',
    viewModel: {
        type: 'retail_vm'
    },
    layout: 'fit',
    padding: '0 0 0 0',
    items: [
        {
            xtype: 'container',
            docked: 'top',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            padding: '5 10 5 20',
            cls: 'head-1 border-bottom',
            items: [
                {
                    xtype: 'label',
                    cls: 'title',
                    html: i18n.gettext('Retail')
                }, {
                    xtype: 'segmentedbutton',
                    reference: 'retail_menu',
                    defaults: {
                        ui: 'default',
                    },
                    bind: {
                        value: '{active_retail_menu}'
                    },
                    items: [
                        {
                            tooltip: i18n.gettext('Sales'),
                            text: i18n.gettext('Sales'),
                            value: 'sell_bills',
                            hidden: true,
                            bind: {
                                hidden: '{no_inv_sell_list_date_user}'
                            }
                        },
                        {
                            tooltip: i18n.gettext('POS'),
                            text: i18n.gettext('POS'),
                            value: 'pos_sell',
                            hidden: true,
                            bind: {
                                hidden: '{no_inv_cashopen_start}' || '{no_inv_sell_retail_create}'
                            }
                        },
                        {
                            tooltip: i18n.gettext('Checkouts'),
                            text: i18n.gettext('Checkouts'),
                            value: 'pos_list',
                            hidden: true,
                            bind: {
                                hidden: '{no_inv_cashopen_list}'
                            }
                        },
                        {
                            tooltip: i18n.gettext('Refunds'),
                            text: i18n.gettext('Refunds'),
                            value: 'revert_list',
                            hidden: true,
                            bind: {
                                hidden: '{no_inv_sell_revert_list}'
                            }
                        },
                        {
                            tooltip: i18n.gettext('Price Stickers'),
                            text: i18n.gettext('Price Stickers'),
                            value: 'price_monitor',
                            hidden: true,
                            bind: {
                                hidden: '{no_price_last_prices}'
                            }
                        },
                    ]
                },
            ]
        },
        {
            xtype: 'container',
            scrollable: 'y',
            reference: 'retail_menu_card',
            autoSize: true,
            layout: {
                type: 'card',
            },
            items: [{
                xtype: 'pos_sell',
            }, {
                xtype: 'sell_pos',
            }, {
                xtype: 'sell_bills',
            }, {
                xtype: 'pos_list',
            }, {
                xtype: 'revert_list',
            }, {
                xtype: 'price_monitor',
            },
            ]
        }
    ]
});