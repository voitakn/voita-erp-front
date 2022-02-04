Ext.define('Erp.view.produce.tabs.RulesPrices', {
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
            align: 'right',
            renderer(value, record, dataIndex, cell) {
                let row = cell.up();
                let vl = record.get('title');
                if (!record.get('cols_active')) {
                    row.addCls('row-disabled');
                } else {
                    row.removeCls('row-disabled');
                }
                return vl;
            },
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
            width: 30,
            align: 'center',
            cell: {
                encodeHtml: false,
                cls: 'bolder blue',
                renderer(value, record, dataIndex, cell) {
                    let vl = record.get('price:erpMoney');
                    let tools = cell.getTools();
                    if (!record.get('cols_active') || record.get('purchase') || record.get('retail')) {
                        tools[0].setHidden(true);
                    } else {
                        tools[0].setHidden(false);
                    }
                    return vl;
                },
                tools: {
                    edit: {
                        cls: 'blue',
                        zone: 'end',
                        handler: 'onEdit',
                    },
                }
            }
        },
        {
            menu: false,
            text: i18n.gettext('Calculated'),
            align: 'center',
            renderer(value, record, dataIndex, cell) {
                if (record.get('purchase') || record.get('retail') && record.get('price_active')) {
                    return Ext.util.Format.checkIcon(record.get('price_active'));
                }
                return Ext.util.Format.checkIcon(!record.get('price_active'));
            },
            cell: {
                encodeHtml: false,
                align: 'center',
            }
        },
        {
            menu: false,
            flex: 1,
            text: i18n.gettext('Rules'),
            renderer(value, record, dataIndex, cell) {
                let parent_id = record.get('parent_id') ? record.get('parent_id') : 'Not';
                let parent_title = parent_id && User.rulesObj[parent_id] ? User.rulesObj[parent_id].title : 'Not';
                if (record.get('purchase') || record.get('retail')) {
                    return;
                }
                if (record.get('price_active')) {
                    return `<div>${i18n.gettext('Setted for this  item')}</div>`;
                }
                return `<div>${i18n.gettext('Calculated from')} ${parent_title}</div>`;
            },
            cell: {
                encodeHtml: false,
            }
        },
    ],
});