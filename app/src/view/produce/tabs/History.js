Ext.define('Erp.view.produce.tabs.History', {
    extend: 'Ext.grid.Grid',
    xtype: 'history',
    reference: 'history',
    reserveScrollbar: true,
    plugins: {
        gridpagingtoolbar: true
    },
    bind: {
        store: '{history_store}'
    },
    autoSize: true,
    columns: [
        {
            menu: false,
            width: 150,
            text: i18n.gettext('Date create'),
            tpl: '{date_create_short}',
            cell: {
                encodeHtml: false,
                cls: 'bolder'
            }
        },
        {
            menu: false,
            text: i18n.gettext('Price name'),
            align: 'right',
            tpl: '{title}',
            cell: {
                encodeHtml: false,
                cls: 'bolder',
            }
        },
        {
            menu: false,
            text: i18n.gettext('Price'),
            tpl: '{price:erpMoney}',
            cell: {
                encodeHtml: false,
                cls: 'bolder blue',
            }
        },
        {
            menu: false,
            text: i18n.gettext('User'),
            flex: 1,
            tpl: '{user_title}',
            cell: {
                encodeHtml: false,
            }
        },
        {
            menu: false,
            text: i18n.gettext('POS'),
            flex: 1,
            hidden: true,
            bind: {
                hidden: `{history_mode != "retail"}`
            },
            tpl: '{place_title}',
            cell: {
                encodeHtml: false,
            }
        },

    ],
});