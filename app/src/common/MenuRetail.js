Ext.define('Erp.common.MenuRetail', {
    extend: 'Ext.Container',
    xtype: 'retail_menu',
    requires: [
        'Erp.view.base.BaseCtrl'
    ],
    viewModel: {
        formulas: {
            no_inv_sell_list_date_user(get) {
                return !User.checkAccess('inv.sell_list_date_user');
            },
            no_inv_cashopen_list(get) {
                return !User.checkAccess('inv.cashopen_list');
            },
            no_inv_cashopen_start(get) {
                return !User.checkAccess('inv.cashopen_start');
            },
            no_inv_sell_retail_create(get) {
                return !User.checkAccess('inv.sell_retail_create');
            },
            no_inv_sell_revert_list(get) {
                return !User.checkAccess('inv.sell_revert_list');
            },
            no_price_last_prices(get) {
                return !User.checkAccess('price.last_prices');
            },
        }
    },
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
                    cls: 'title',
                    html: i18n.gettext('Retail')
                },
                {
                    xtype: 'segmentedbutton',
                    reference: 'retail_menu',
                    defaults: {
                        ui: 'default',
                        handler: 'onRetailMenuClick',
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
                            value: 'pos',
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
    ]
})
