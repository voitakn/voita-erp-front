Ext.define('Erp.view.partners.tabs.PartnersGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'partners_grid',
    reference: 'partners_grid',
    emptyText: i18n.gettext('Data is not found!'),
    bind: {
        store: '{partners_store}',
    },
    reserveScrollbar: true,
    autoSize: true,
    scrollable: 'y',
    plugins: {
        gridpagingtoolbar: true
    },
    items: [
        {
            xtype: 'head1',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    margin: '0 20 0 0',
                    iconCls: 'x-fa fa-plus green-dark',
                    text: i18n.gettext('Create Partner'),
                    hidden: true,
                    bind: {
                        hidden: '{no_b2b_partner_create}'
                    },
                    handler: 'onCreateNewPartner',
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'end'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            reference: 'partnertype',
                            label: `<b>${i18n.gettext('Type partners')}</b>`,
                            width: 180,
                            editable: false,
                            displayField: 'display',
                            value: null,
                            autoSelect: true,
                            store: [
                                {display: `${i18n.gettext('All')}`, value: null},
                                {display: `${i18n.gettext('Client')}`, value: true},
                                {display: `${i18n.gettext('Supplier')}`, value: false},
                            ],
                            bind: {
                                value: '{partner_type}',
                            }
                        },
                        {
                            xtype: 'searchfield',
                            width: 400,
                            margin: '0 0 0 20',
                            placeholder: i18n.gettext('Search by name(at least 3 characters)'),
                            bind: {
                                value: '{filter_search}'
                            }
                        },
                    ]
                }
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
            dataIndex: 'email',
            tpl: `<div>{email}</div><div>{phone}</div>`,
            cell: {encodeHtml: false, height: 48},
        },
        {
            text: i18n.gettext('Created'),
            dataIndex: 'created',
            flex: 1,
            tpl: `<div>{created_short}</div>`,
            cell: {encodeHtml: false, height: 48},
        },
        {
            text: i18n.gettext('Applied'),
            dataIndex: 'applied',
            flex: 1,
            tpl: `<div>{applied_short}</div>`,
            cell: {encodeHtml: false, height: 48},
        },
    ],
})