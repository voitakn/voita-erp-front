Ext.define('Erp.view.prices_rules.Grid', {
    extend: 'Ext.grid.Grid',
    xtype: 'prices_rules_grid',
    reference: 'prices_rules_grid',
    emptyText: i18n.gettext('Data is not available!'),
    bind: {
        store: '{prices_rules_store}',
    },
    scrollable: 'y',
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
                html: i18n.gettext('Prices rules')
            }, {
                xtype: 'button',
                margin: '0 0 0 20',
                iconCls: 'x-fa fa-plus green-dark',
                text: i18n.gettext('New rules'),
                handler: 'addNewRules',
                hidden: true,
                bind: {
                    hidden: '{no_price_cols_save}'
                }
            }]
        },
        {
            xtype: 'prices_rules_new',
        },
        {
            xtype: 'price_rules_edit',
        },

    ],
    columns: [
        {
            menu: false,
            text: i18n.gettext('Price name'),
            flex: 1,
            tpl: `{title}`,
            cell: {
                encodeHtml: false,
            }
        },
        {
            menu: false,
            text: i18n.gettext('Change %'),
            width: 100,
            align: 'center',
            renderer(value, record, dataIndex, cell) {
                let vl = Ext.util.Format.toFloat(record.get('percent'));
                if (record.get('type_change') < 1) {
                    cell.setCls('red bolder');
                } else {
                    cell.setCls('green bolder');
                }
                return vl;
            },
            cell: {
                encodeHtml: false,
                align: 'center'
            }
        },
        {
            menu: false,
            text: i18n.gettext('Type of change'),
            width: 150,
            align: 'center',
            renderer(value, record, dataIndex, cell) {
                let vl = i18n.gettext('markup');
                if (record.get('type_change') < 1) {
                    vl = i18n.gettext('markdown');
                    cell.setCls('red bolder');
                } else {
                    cell.setCls('green bolder');
                }
                return vl;
            },
            cell: {
                encodeHtml: false,
                align: 'center',
            }
        },
        {
            menu: false,
            text: i18n.gettext('Affected price'),
            width: 150,
            tpl: `{affect_price}`,
            cell: {
                encodeHtml: false,
                tools: {
                    edit: {
                        cls: 'blue',
                        zone: 'end',
                        handler: 'onEdit'
                    }
                }
            }
        },
        {
            menu: false,
            text: i18n.gettext('Retail'),
            align: 'center',
            tpl: `{retail:checkIcon}`,
            cell: {
                encodeHtml: false,
                align: 'center'
            }
        },
        {
            menu: false,
            text: i18n.gettext('Purchase'),
            align: 'center',
            tpl: `{purchase:checkIcon}`,
            cell: {
                encodeHtml: false,
                align: 'center'
            }
        },
        {
            menu: false,
            text: i18n.gettext('Updated'),
            flex: 1,
            tpl: `<div>{date_update_short}</div>
                  <div>{user_title}</div>`,
            cell: {
                encodeHtml: false,
            }
        }
    ],
});
