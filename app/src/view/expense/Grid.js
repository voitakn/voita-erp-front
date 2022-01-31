Ext.define('Erp.view.expense.Grid', {
    extend: 'Ext.grid.Grid',
    xtype: 'expenses_grid',
    reference: 'expenses_grid',
    scrollable: 'y',
    reserveScrollbar: true,
    autoSize: true,
    bind: {
        store: '{expense_list_store}',
    },
    plugins: {
        gridpagingtoolbar: true
    },
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
            xtype: 'container',
            cls: 'border-bottom',
            docked: 'top',
            items: [
                {
                    xtype: 'container',
                    cls: 'head-1',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'center'
                    },
                    padding: '0 0 5 0',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'title',
                            html: i18n.gettext('Expenses')
                        },
                        {
                            xtype: 'button',
                            margin: '0 20 0 10',
                            iconCls: 'x-fa fa-plus green-dark',
                            text: i18n.gettext('Add New'),
                            hidden: true,
                            bind: {
                                hidden: '{no_inv_expense_edit}'
                            },
                            handler: 'addNewExpense'
                        },
                        {
                            xtype: 'combobox',
                            reference: 'expenses_place_combobox',
                            clearable: true,
                            queryMode: 'local',
                            width: 300,
                            label: i18n.gettext('Point of sale'),
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
                    label: i18n.gettext('Filter by year and period'),
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
            ]
        }


    ],
    columns: [
        {
            menu: false,
            text: i18n.gettext('Date'),
            tpl: `<div>{doc_date}</div>`,
            width: 150,
            cell: {
                encodeHtml: false
            }
        },
        {
            menu: false,
            text: i18n.gettext('Document'),
            tpl: `<a href="/#expense_card/{id}"><b>{doc_number}</b></a>`,
            width: 150,
            cell: {
                encodeHtml: false,
            }
        },
        {
            menu: false,
            text: i18n.gettext('Amount'),
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
            text: i18n.gettext('Tax'),
            // width: 90,
            tpl: `<b>{tax_total:erpMoney}</b>`,
            align: 'center',
            cell: {
                encodeHtml: false,
                align: 'right',
                tools: {
                    edit: {
                        margin: '0 0 0 15',
                        hidden: true,
                        bind: {
                            hidden: '{no_inv_expense_edit}'
                        },
                        cls: 'blue',
                        zone: 'end',
                        handler: 'onEditExpensePen'
                    }
                }

            }
        },
        // {
        //     width: 35,
        //     hidden: true,
        //     bind: {
        //         hidden: '{no_inv_expense_edit}'
        //     },
        //     menu: false,
        //     cell: {
        //         align: 'center',
        //         tools: {
        //             edit: {
        //                 cls: 'blue',
        //                 handler: 'onEditExpensePen'
        //             }
        //         }
        //     }
        // },
        {
            menu: false,
            text: i18n.gettext('Created'),
            tpl: `<div>{date_create_short}</div><div>{user_title}</div>`,
            width: 200,
            cell: {
                encodeHtml: false
            }
        },
        {
            menu: false,
            text: i18n.gettext('POS'),
            width: 200,
            tpl: `<div>{place_title}</div>`,
            cell: {
                encodeHtml: false,
            }
        },
        {
            text: i18n.gettext('Status'),
            renderer(value, record, dataIndex, cell) {
                let vl = i18n.gettext('Paid');
                if (!record.get('paid')) {
                    vl = i18n.gettext('Not paid');
                    cell.setUserCls('status-failed');
                } else {
                    cell.setUserCls('status-confirm');
                }
                return vl;
            },
            align: 'center',
            cell: {
                align: 'center',
            }
        },
        {
            menu: false,
            text: i18n.gettext('Comment'),
            minWidth: 180,
            flex: 1,
            tpl: `<div>{comment}</div>`,
            cell: {
                encodeHtml: false
            }
        },
    ]
});
