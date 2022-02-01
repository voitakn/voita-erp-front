Ext.define('Erp.view.produce.RulesPrices', {
    extend: 'Ext.grid.Grid',
    xtype: 'rules_price',
    reference: 'rules_price',
    bind: {
        store: '{rules_price_store}'
    },
    columns: [
        {
            menu: false,
            text: i18n.gettext('Price name'),
            flex: 1,
            tpl: `{title}`,
            cell: {
                encodeHtml: false,
                cls: 'bolder',
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
            text: i18n.gettext('Total price'),
            width: 150,
            tpl: '{price:erpMoney}',
            cell: {
                encodeHtml: false,
                cls: 'bolder blue',
            }
        },
        {
            menu: false,
            text: i18n.gettext('Active'),
            align: 'center',
            tpl: `{price_active:checkIcon}`,
            cell: {
                encodeHtml: false,
                align: 'center'
            }
        },
    ],
});