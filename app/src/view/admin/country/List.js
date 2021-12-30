Ext.define('Erp.view.admin.country.List', {
    extend: 'Ext.grid.Grid',
    xtype: 'country_list',
    reference: 'country_list',
    scrollable: 'y',
    reserveScrollbar: true,
    autoSize: true,
    plugins: {
        gridpagingtoolbar: true
    },
    selectable: {
        columns: false,
        cells: false,
        row: false,
        extensible: false,
        mode: 'single',
    },
    bind: {
        store: '{country_store}',
        selection: '{country_sel}'
    },
    items: [
        {
            xtype: 'head1',
            items: [
                {
                    xtype: 'label',
                    html: Ext.String.format('<b>{0}</b>', i18n.gettext('Countries management'))
                },
                {
                    xtype: 'button',
                    margin: '0 0 0 20',
                    text: i18n.gettext('New country'),
                    iconCls: 'x-fas fa-plus green-dark',
                    handler: 'onAddNewCountry',
                }
            ]
        }
    ],
    columns: [
        {
            text: i18n.gettext('id'),
            dataIndex: 'id',
            width: 50
        },
        {
            text: i18n.gettext('Country_en'),
            dataIndex: 'country_en',
            flex: 1
        },
        {
            text: i18n.gettext('Country_orig'),
            dataIndex: 'country_orig',
            flex: 1
        },
        {
            text: i18n.gettext('Active'),
            dataIndex: 'active',
            tpl: `{active:checkIcon}`,
            width: 80,
            cell: {
                encodeHtml: false,
                align: 'center'
            },
        }
    ]
});
