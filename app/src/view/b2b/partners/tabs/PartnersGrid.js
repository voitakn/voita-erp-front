Ext.define('Erp.view.b2b.partners.tabs.PartnersGrid', {
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
                                {display: `${i18n.gettext('All')}`, value: ''},
                                {display: `${i18n.gettext('Client')}`, value: 'client'},
                                {display: `${i18n.gettext('Supplier')}`, value: 'supplier'},
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
            tpl: `<div><a href="/#partners_card/{id}"><b>{title}</b></a></div>`,
            cell: {
                encodeHtml: false,
                height: 48,
            }
        },
        {
            width: 230,
            menu: false,
            align: 'center',
            cell: {
                encodeHtml: false,
                height: 48,
                renderer(value, record) {
                    if (!record.get('has_catalog')) {
                        return;
                    }
                    return `<a href="/#b2b_catalog/${record.get('id')}"><div class="x-component x-button x-has-text x-layout-box-item"><div class="x-inner-el"><div class="x-body-el"><div class="x-text-el"><b>${i18n.gettext('Go to catalog')}</b></div></div><div class="x-arrow-el x-font-icon"></div></div><div class="x-badge-el"></div><button class="x-button-el" type="button"></button></div></a>`;
                },
                tools: {
                    edit: {
                        cls: 'blue',
                        hidden: true,
                        handler: 'onEditItem',
                        bind: {
                            hidden: '{no_b2b_partner_create}'
                        },
                        zone: 'end'
                    },
                }
            },
        },
        {
            menu: false,
            text: i18n.gettext('Client'),
            align: 'center',
            renderer(value, record) {
                if (record.get('params')) {
                    return Ext.util.Format.checkIcon(record.get('params').client);
                }
                return Ext.util.Format.checkIcon(!record.get('params').client);
            },
            cell: {
                encodeHtml: false,
                align: 'center',
            }
        },
        {
            menu: false,
            text: i18n.gettext('Supplier'),
            align: 'center',
            renderer(value, record) {
                if (record.get('params')) {
                    return Ext.util.Format.checkIcon(record.get('params').supplier);
                }
                return Ext.util.Format.checkIcon(!record.get('params').supplier);
            },
            cell: {
                encodeHtml: false,
                align: 'center',
            }
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