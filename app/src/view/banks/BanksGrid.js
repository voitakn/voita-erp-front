Ext.define('Erp.view.banks.BanksGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'banks_grid',
    reference: 'banks_grid',
    emptyText: i18n.gettext('No banks assigned!'),
    bind: {
        store: '{banks_store}',
    },
    columns: [
        {
            text: i18n.gettext('Name'),
            minWidth: 150,
            flex: 1,
            dataIndex: 'name',
            cell: {
                encodeHtml: false,
                tools: {
                    close: {
                        margin: '0 5 0 0',
                        cls: 'red',
                        hidden: true,
                        handler: 'onRemoveBank',
                        bind: {
                            hidden: '{no_com_customer_save}'
                        },
                        zone: 'end'
                    },
                    edit: {
                        cls: 'blue',
                        hidden: true,
                        handler: 'onEditBank',
                        bind: {
                            hidden: '{no_com_customer_save}'
                        },
                        zone: 'end'
                    },
                }

            },

        },
        {
            text: i18n.gettext('SWIFT'),
            minWidth: 150,
            flex: 1,
            dataIndex: 'swift'
        },
        {
            text: i18n.gettext('IBAN'),
            minWidth: 150,
            flex: 1,
            dataIndex: 'iban'
        },
        {
            menu: false,
            text: i18n.gettext('Default'),
            align: 'center',
            tpl: `{default:checkIcon}`,
            cell: {
                encodeHtml: false,
                align: 'center'
            }
        },

    ],
});
