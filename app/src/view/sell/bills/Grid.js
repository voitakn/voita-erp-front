Ext.define('Erp.view.sell.bills.Grid', {
    extend: 'Ext.grid.Grid',
    xtype: 'bills_grid',
    reference: 'bills_grid',
    emptyText: i18n.gettext('Data was not found!'),
    bind: {
        store: '{sell_invoices}'
    },
    items: [
        {
            xtype: 'head1',
            items: [{
                xtype: 'label',
                cls: 'title',
                html: i18n.gettext('Selling list')
            },{
                xtype: 'button',
                margin: '0 0 0 20',
                iconCls: 'x-fa fa-shopping-basket',
                text: i18n.gettext('New selling'),
                handler: 'goToPos',
                hidden: true,
                bind: {
                    hidden: '{no_inv_sell_retail_create}' && '{no_inv_create_pos_sell}'
                }
            }]
        },
        {
            xtype: 'head2',
            items: [
                {
                    xtype: 'datefield',
                    reference: 'bills_sell_date',
                    label: `<b>${i18n.gettext('Date')}</b>`,
                    width: 180,
                    dateFormat: 'Y-m-d',
                    maxDate: new Date(),
                    required: true,
                    margin: '0 15 0 0',
                    listeners: {
                        change: 'changeFilterDate'
                    },
                    bind: {
                        value: '{date_today}'
                    }
                },{
                    xtype: 'combobox',
                    reference: 'bills_place_combobox',
                    autoSelect: true,
                    forceSelection: true,
                    required: true,
                    editable: false,
                    queryMode: 'local',
                    width: 200,
                    label: i18n.gettext('Point of sale'),
                    valueField: 'id',
                    displayField: 'title',
                    store: {},
                    bind: {
                        value: '{filter_place_id}'
                    }
                }
            ]
        },
    ],
    columns: [
        {
            menu: false,
            text: i18n.gettext('Document / Date'),
            minWidth: 100,
            flex: 1,
            dataIndex: 'doc_number',
            tpl: `<a href="/#sell_card/{id}"><b>FR{doc_number}</b></a>
                  <div>{date_create:date("Y-m-d H:i")}</div>`,
            cell: {
                encodeHtml: false
            }
        },{
            text: i18n.gettext('Amount'),
            minWidth: 150,
            align: 'right',
            tpl: `<div class="red">${i18n.gettext('Tax')}: {tax_total:erpMoney}</div>
                  <div class="bolder blue">${i18n.gettext('Total')}: {price_total:erpMoney}</div>`,
            cell: {
                align: 'right',
                encodeHtml: false
            }
        },{
            menu: false,
            text: i18n.gettext('Seller'),
            minWidth: 150,
            flex: 1,
            tpl: `<div>{user_data.params.name} {user_data.params.surname}</div><div>{user_data.login}</div>`,
            cell: {
                encodeHtml: false
            }
        },{
            text: i18n.gettext('Status'),
            renderer(value, record, dataIndex, cell) {
                let vl = i18n.gettext('Paid');
                if(!record.get('paid')) {
                    vl = i18n.gettext('Not paid');
                    cell.setUserCls('status-progress');
                    if(record.get('revert')) {
                        vl = i18n.gettext('Returned');
                        cell.setUserCls('status-failed');
                    }
                } else {
                    cell.setUserCls('status-confirm');
                }
                return vl;
            },
            align: 'center',
            cell: {
                align: 'center',
            }
        },{
            text: i18n.gettext('Payment'),
            width: 120,
            tpl: `{pay_type:payType}`,
            align: 'center',
            cell: {
                align: 'center'
            }
        },{
            menu: false,
            minWidth: 70,
            flex: 1,
            renderer(value, record, dataIndex, cell) {
                const tools = cell.getTools();
                tools[0].setHidden(!record.get('paid'));
                return value;
            },
            cell: {
                encodeHtml: false,
                tools: {
                    plus: {
                        iconCls: 'x-fas fa-undo red',
                        margin: '0 10 0 10',
                        tooltip: i18n.gettext('Return selling'),
                        handler: 'onCancelSale',
                        zone: 'start'
                    }
                }
            }
        }
    ]
});
