Ext.define('Erp.view.partners.tabs.PartnersIncomingGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'partners_incoming_grid',
    reference: 'partners_incoming_grid',
    emptyText: i18n.gettext('Data is not found!'),
    bind: {
        store: '{partners_incoming_store}',
    },
    reserveScrollbar: true,
    autoSize: true,
    scrollable: 'y',
    plugins: {
        gridpagingtoolbar: true
    },
    selectable: {
        columns: false,
        rows: true,
        cells: false,
        checkbox: false,
        headerCheckbox: false,
        extensible: true,
        mode: 'single',
    },
    items: [
        {
            xtype: 'head1',
            items: [{
                xtype: 'label',
                cls: 'title',
                margin: '0 0 0 10',
                html: i18n.gettext('Sent Requests')
            },
            ]
        },
    ],
    columns: [
        {
            text: i18n.gettext('Partner name'),
            flex: 1,
            dataIndex: 'title',
            tpl: `<div><a href="/#partners/{id}"><b>{title}</b></a></div>`,
            cell: {encodeHtml: false, height: 48}
        },
        {
            text: i18n.gettext('E-mail'),
            width: 160,
            tpl: `<div>{email}</div><div>{phone}</div>`,
            cell: {encodeHtml: false, height: 48},
        },
        {
            text: i18n.gettext('Created'),
            flex: 1,
            tpl: `<div>{created_short}</div>`,
            cell: {encodeHtml: false, height: 48},
        },
        {
            text: i18n.gettext('Applied'),
            flex: 1,
            tpl: `<div>{applied_short}</div>`,
            cell: {encodeHtml: false, height: 48},
        },
    ],
})