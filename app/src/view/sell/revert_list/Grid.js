Ext.define('Erp.view.sell.revert_list.Grid', {
    extend: 'Ext.grid.Grid',
    xtype: 'revert_grid',
    reference: 'revert_grid',
    scrollable: 'y',
    reserveScrollbar: true,
    autoSize: true,
    bind: {
        store: '{revert_list_store}',
    },
    items: [
        {
            xtype: 'containerfield',
            docked: 'top',
            label: i18n.gettext('Filter by year and period'),
            layout: {
                type: 'hbox',
                align: 'end'
            },
            items: [
                {
                    xtype: 'combobox',
                    margin: '0 15 10 0',
                    autoSelect: true,
                    forceSelection: true,
                    editable: false,
                    queryMode: 'local',
                    width: 100,
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
        }
    ],
    columns: [
        {
            menu: false,
            text: i18n.gettext('Receipt / Date'),
            tpl: `<a href="/#sell_card/{invoice_id}"><b>FR{doc_number}</b></a><div>{doc_date}</div>`,
            width: 120,
            cell: {
                encodeHtml: false
            }
        },{
            menu: false,
            text: i18n.gettext('Price total'),
            width: 90,
            tpl: `<div class="blue bolder">{price_total:erpMoney}</div>`,
            align: 'right',
            cell: {
                encodeHtml: false,
                align: 'right'
            }
        }, {
            width: 70,
            menu: false,
            hidden: true,
            bind: {
                hidden: '{no_inv_sell_revert_close}'
            },
            renderer(value, record, dataIndex, cell) {
                const tools = cell.getTools();
                if (record.get('opened') === true) {
                    tools[0].setHidden(false);
                    tools[1].setHidden(false);
                } else {
                    tools[0].setHidden(true);
                    tools[1].setHidden(true);
                }
                return value;
            },
            align: 'center',
            cell: {
                encodeHtml: false,
                align: 'center',
                tools: {
                    trash: {
                        margin: '0 10 0 0',
                        cls: 'red',
                        iconCls: 'x-far fa-times-circle',
                        tooltip: i18n.gettext('Cancel request'),
                        handler: 'onCancelRequest',
                        zone: 'start',
                    },
                    plus: {
                        iconCls: 'x-fas fa-check green-dark',
                        tooltip: i18n.gettext('Approve request'),
                        handler: 'onConfirmRequest',
                        zone: 'end',
                    }
                }
            }
        },{
            menu: false,
            text: i18n.gettext('Status'),
            dataIndex: 'req_result',
            minWidth: 100,
            align: 'center',
            renderer(value, record, dataIndex, cell) {
                const data = record.data;
                if(data.event === 'approved') {
                    cell.setUserCls('status-confirm');
                } else if(data.event === 'rejected') {
                    cell.setUserCls('status-failed');
                } else {
                    cell.setUserCls('status-progress');
                }
                return `<div>${value}</div>`;
            },
            cell: {
                encodeHtml: false,
                align: 'center'
            }
        },{
            menu: false,
            text: i18n.gettext('Started by | Date | Comment'),
            minWidth: 180,
            flex: 1,
            tpl: `<div><b>{user_title}</b> | {date_create:date("Y-m-d H:i")}</div><div>{comment}</div>`,
            cell: {
                encodeHtml: false
            }
        },{
            menu: false,
            text: i18n.gettext('Closed by | Date'),
            minWidth: 180,
            flex: 1,
            tpl: `<div><b>{admin_title}</b> | {date_closed:date("Y-m-d H:i")}</div>`,
            cell: {
                encodeHtml: false,
            }
        },{
            menu: false,
            text: i18n.gettext('Active'),
            tpl: `{opened:checkIcon}`,
            width: 70,
            cell: {
                encodeHtml: false,
                align: 'center'
            },
        }
    ]
});
