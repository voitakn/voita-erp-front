Ext.define('Erp.view.partners.tabs.PartnersOutgoingGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'partners_outgoing_grid',
    reference: 'partners_outgoing_grid',
    emptyText: i18n.gettext('Data is not found!'),
    bind: {
        store: '{partners_outgoing_store}',
    },
    reserveScrollbar: true,
    autoSize: true,
    scrollable: 'y',
    plugins: {
        gridpagingtoolbar: true
    },
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