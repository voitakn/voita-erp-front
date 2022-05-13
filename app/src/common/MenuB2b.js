Ext.define('Erp.common.MenuB2b', {
    extend: 'Erp.base.Head1',
    xtype: 'b2b_menu',
    cls: 'head-1',
    items: [
        {
            xtype: 'label',
            cls: 'title',
            html: i18n.gettext('B2B')
        },
        {
            xtype: 'segmentedbutton',
            reference: 'b2b_menu',
            defaults: {
                ui: 'default',
                handler: 'onB2bMenuClick',
            },
            bind: {
                value: '{active_b2b_menu}'
            },
            items: [
                {
                    tooltip: i18n.gettext('Partners'),
                    text: i18n.gettext('Partners'),
                    value: 'partners',
                },
                {
                    tooltip: i18n.gettext('Orders'),
                    text: i18n.gettext('Orders'),
                    value: 'b2b_orders',
                    disabled: true,
                },
                // {
                //     tooltip: i18n.gettext('Catalog'),
                //     text: i18n.gettext('Catalog'),
                //     value: 'b2b_catalog',
                //     disabled: true,
                //     // hidden: true,
                //     // bind: {
                //     //     hidden: '{no_inv_cashopen_start}' || '{no_inv_sell_b2b_create}'
                //     // }
                // },
            ]
        },

    ]
})
