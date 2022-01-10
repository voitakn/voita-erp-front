Ext.define('Erp.view.sell.pos_list.Grid', {
    extend: 'Ext.grid.Grid',
    xtype: 'pos_grid',
    reference: 'pos_grid',
    scrollable: 'y',
    reserveScrollbar: true,
    autoSize: true,
    bind: {
        store: '{cashopen_list_store}',
    },
    items: [
        {
            xtype: 'head2',
            items: [
                {
                    xtype: 'datefield',
                    reference: 'filter_by_date',
                    margin: '0 15 0 0',
                    label: `<b>${i18n.gettext('Date')}</b>`,
                    width: 180,
                    dateFormat: 'Y-m-d',
                    maxDate: new Date(),
                    required: true,
                    value: new Date(),
                    listeners: {
                        change: 'changeFilterDate'
                    },
                },
                {
                    xtype: 'combobox',
                    reference: 'pos_place_combobox',
                    margin: '0 15 0 0',
                    clearable: true,
                    editable: false,
                    queryMode: 'local',
                    width: 200,
                    label: i18n.gettext('Point of sale'),
                    valueField: 'id',
                    displayField: 'title',
                    store: {},
                    bind: {
                        value: '{filter.place_id}'
                    }
                },
                {
                    xtype: 'togglefield',
                    label: `<b>${i18n.gettext('Only active')}</b>`,
                    width: 180,
                    labelAlign: 'left',
                    bind: {
                        value: '{filter.is_active}',
                        boxLabel: `{!filter.is_active ? "${i18n.gettext('Off')}" : "${i18n.gettext('Yes')}"}`
                    }
                },

            ]
        }
    ],
    columns: [
        {
            text: i18n.gettext('Point of sale'),
            dataIndex: 'place_title',
            flex: 1,
            minWidth: 150,
            cell: {
                encodeHtml: false,
                renderer(value, record, dataIndex, cell) {
                    if (!record.get('active')) {
                        cell.setTools({});
                    } else {
                        cell.setTools({
                            plus: {
                                iconCls: 'x-far fa-stop-circle red size-24',
                                margin: '0 0 0 10',
                                tooltip: i18n.gettext('Close cash'),
                                handler: 'openFinishDialog',
                                zone: 'end',
                            },
                        });
                    }
                    return value;
                },
                tools: {}
            }
        },
        {
            text: i18n.gettext('Checkout'),
            dataIndex: 'title',
            align: 'center',
            width: 150,
            cell: {
                encodeHtml: false,
                align: 'center',
            }
        },
        {
            text: i18n.gettext('Amount'),
            align: 'right',
            width: 150,
            tpl: `<div class="blue">${i18n.gettext('Start')}: {amount_start:erpMoney}</div>
                  <div class="green-dark bolder">${i18n.gettext('Total')}: <b>{amount_end:erpMoney}</b></div>`,
            cell: {
                encodeHtml: false,
                align: 'right',
            }
        },
        {
            text: i18n.gettext('Date time'),
            align: 'right',
            width: 200,
            tpl: `<div class="blue">${i18n.gettext('From')}: {date_open:date("Y-m-d H:i")}</div>
                  <div class="green-dark">${i18n.gettext('To')}: {date_close:date("Y-m-d H:i")}</div>`,
            cell: {
                encodeHtml: false,
                align: 'right',
            }
        },
        {
            text: i18n.gettext('Employee'),
            dataIndex: 'user_title',
            flex: 1,
            minWidth: 200,
        },
        {
            text: i18n.gettext('Active'),
            tpl: `{active:checkIcon}`,
            width: 80,
            cell: {
                encodeHtml: false,
                align: 'center'
            },
        }
    ]
});
