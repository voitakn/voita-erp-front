Ext.define('Erp.view.movement.list.Grid', {
    extend: 'Ext.grid.Grid',
    xtype: 'movement_list_grid',
    reference: 'movement_list_grid',
    scrollable: 'y',
    reserveScrollbar: true,
    autoSize: true,
    bind: {
        store: '{movement_list_store}',
    },
    items: [

        {
            xtype: 'head1',
            items: [
                {
                    xtype: 'label',
                    cls: 'title',
                    html: i18n.gettext('Movements')
                },
                {
                    xtype: 'button',
                    margin: '0 20 0 10',
                    iconCls: 'x-fa fa-plus green-dark',
                    text: i18n.gettext('Add Movement'),
                    hidden: true,
                    bind: {
                        hidden: '{no_inv_move_create}'
                    },
                    handler(btn) {
                        btn.up('movement_list').getController().redirectTo('movement_add');
                    }
                },
                {
                    xtype: 'combobox',
                    reference: 'move_place_combobox',
                    autoSelect: true,
                    forceSelection: true,
                    editable: false,
                    queryMode: 'local',
                    width: 300,
                    label: i18n.gettext('Point of sale'),
                    labelAlign: 'left',
                    labelWidth: 120,
                    valueField: 'id',
                    displayField: 'title',
                    store: {},
                    bind: {
                        value: '{filter.place_id}'
                    }
                },
            ]
        },
        {
            xtype: 'containerfield',
            docked: 'top',
            label: i18n.gettext('Filter by year and period'),
            cls: 'border-bottom',
            layout: {
                type: 'hbox',
                align: 'end'
            },
            items: [
                {
                    xtype: 'combobox',
                    margin: '0 15 10 0',
                    width: 100,
                    autoSelect: true,
                    forceSelection: true,
                    editable: false,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'id',
                    bind: {
                        value: '{filter.year}',
                        store: '{years_data}'
                    }
                },
                {
                    xtype: 'segmentedbutton',
                    margin: '0 0 10 0',
                    defaults: {
                        ui: 'default',
                    },
                    bind: {
                        value: '{filter.month}'
                    },
                    items: [
                        {tooltip: i18n.gettext('January'), text: i18n.gettext('Jan'), value: '01'},
                        {tooltip: i18n.gettext('February'), text: i18n.gettext('Feb'), value: '02'},
                        {tooltip: i18n.gettext('March'), text: i18n.gettext('Mar'), value: '03'},
                        {tooltip: i18n.gettext('April'), text: i18n.gettext('Apr'), value: '04'},
                        {tooltip: i18n.gettext('May'), text: i18n.gettext('May'), value: '05'},
                        {tooltip: i18n.gettext('June'), text: i18n.gettext('Jun'), value: '06'},
                        {tooltip: i18n.gettext('July'), text: i18n.gettext('Jul'), value: '07'},
                        {tooltip: i18n.gettext('August'), text: i18n.gettext('Aug'), value: '08'},
                        {tooltip: i18n.gettext('September'), text: i18n.gettext('Sep'), value: '09'},
                        {tooltip: i18n.gettext('October'), text: i18n.gettext('Oct'), value: '10'},
                        {tooltip: i18n.gettext('November'), text: i18n.gettext('Nov'), value: '11'},
                        {tooltip: i18n.gettext('December'), text: i18n.gettext('Dec'), value: '12'}
                    ]
                }
            ]
        },
    ],
    columns: [
        {
            menu: false,
            text: i18n.gettext('Invoice / Date'),
            tpl: `<a href="/#movement_card/{id}"><b>MI{doc_number}</b></a><div>{date_create_short}</div>`,
            width: 150,
            cell: {
                encodeHtml: false
            }
        },
        {
            menu: false,
            text: i18n.gettext('Price total'),
            width: 90,
            tpl: `<b>{price_total:erpMoney}</b>`,
            align: 'right',
            cell: {
                encodeHtml: false,
                align: 'right'
            }
        },
        {
            menu: false,
            text: i18n.gettext('Status'),
            dataIndex: 'status',
            minWidth: 100,
            align: 'center',
            renderer(value, record, dataIndex, cell) {
                const data = record.data;
                if (data.status === '0') {
                    cell.setUserCls('gray-light-bg');
                    value = `${i18n.gettext('Created')}`;
                } else if (data.status === '1') {
                    cell.setUserCls('blue-light-bg');
                    value = `${i18n.gettext('Sent')}`;
                } else if (data.status === '2') {
                    cell.setUserCls('yellow-bg');
                    value = `${i18n.gettext('Is not complete')}`;
                } else if (data.status === '3') {
                    cell.setUserCls('blue-light-bg');
                    value = `${i18n.gettext('Item sent back')}`;
                } else if (data.status === '4') {
                    cell.setUserCls('gray-bg');
                    value = `${i18n.gettext('Item returned')}`;
                } else if (data.status === '10') {
                    cell.setUserCls('status-confirm');
                    value = `${i18n.gettext('Received')}`;
                } else if (data.status === '-1') {
                    cell.setUserCls('status-failed');
                    value = `${i18n.gettext('Lost')}`;
                } else {
                    cell.setUserCls('status-failed');
                    value = `${i18n.gettext('Undefined')}`;
                }
                return `<div>${value}</div>`;
            },
            cell: {
                encodeHtml: false,
                align: 'center',
            }
        },
        {
            menu: false,
            width: 30,
            renderer(value, record, dataIndex, cell) {
                const tools = cell.getTools();
                if (record.get('status') === '0') {
                    tools[0].setHidden(false);
                    tools[1].setHidden(true);
                } else {
                    if (record.get('status') !== '10') {
                        tools[0].setHidden(true);
                        tools[1].setHidden(false);
                    } else {
                        tools[0].setHidden(true);
                        tools[1].setHidden(true);
                    }
                }
                return value;
            },
            cell: {
                encodeHtml: false,
                align: 'center',
                tools: {
                    plus: {
                        iconCls: 'x-fas fa-level-up-alt green-dark',
                        tooltip: i18n.gettext('Sent'),
                        hidden: true,
                        handler: 'confirmStatusToSent',
                    },
                    edit: {
                        iconCls: 'x-fas fa-level-down-alt green-dark',
                        tooltip: i18n.gettext('Receive'),
                        hidden: true,
                        handler: 'confirmStatusToReceive',
                    },
                }
            }
        },
        {
            xtype: 'datecolumn',
            format: 'Y-m-d H:i',
            menu: false,
            dataIndex: 'date_update',
            text: i18n.gettext('Update'),
            width: 120,
            cell: {
                encodeHtml: false,
            }
        },
        {
            menu: false,
            text: i18n.gettext('Boxes'),
            width: 70,
            tpl: `<div><b>{params.boxes}</b></div>`,
            cell: {
                encodeHtml: false,
                align: 'center'
            }
        },
        {
            menu: false,
            text: i18n.gettext('Source POS'),
            flex: 1,
            tpl: `<div><b>{params.from_place.title}</b> {params.from_place.postcode} {params.from_place.city}</div>
                  <div>{params.from_place.address}</div>`,
            cell: {
                encodeHtml: false,
            }
        },
        {
            menu: false,
            text: i18n.gettext('Destination POS'),
            flex: 1,
            tpl: `<div><b>{params.to_place.title}</b> {params.to_place.postcode} {params.to_place.city}</div>
                  <div>{params.to_place.address}</div>`,
            cell: {
                encodeHtml: false,
            }
        },
        {
            menu: false,
            text: i18n.gettext('Comment'),
            minWidth: 180,
            flex: 1,
            tpl: `<div>{params.comment}</div>`,
            cell: {
                encodeHtml: false
            }
        },
    ]
});
