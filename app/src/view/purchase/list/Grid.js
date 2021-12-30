Ext.define('Erp.view.purchase.list.Grid', {
    extend: 'Ext.grid.Grid',
    xtype: 'purchase_grid',
    reference: 'purchase_grid',
    emptyText: i18n.gettext('Data is not available!'),
    bind: {
        store: '{buy_invoices}'
    },
    plugins: {
        gridpagingtoolbar: true
    },
    items: [
        {
            xtype: 'head1',
            items: [{
                xtype: 'label',
                cls: 'title',
                html: i18n.gettext('Purchases')
            },{
                xtype: 'button',
                margin: '0 0 0 15',
                iconCls: 'x-fa fa-plus green-dark',
                text: i18n.gettext('Add purchase'),
                hidden: true,
                bind: {
                    hidden: '{no_inv_buy_create}'
                },
                handler: 'onNewPurchase'
            },{
                xtype: 'combobox',
                reference: 'purchase_place_combobox',
                margin: '0 0 0 15',
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
                    value: '{filter_place_id}'
                }
            },{
                xtype: 'combobox',
                margin: '0 0 0 15',
                valueField: 'id',
                displayField: 'title',
                editable: false,
                queryMode: 'local',
                clearable: true,
                bind: {
                    value: '{filter_supplier_id}',
                    store: '{suppliers_store}'
                },
                label: i18n.gettext('Supplier'),
                labelAlign: 'left',
            }]
        },{
            xtype: 'containerfield',
            docked: 'top',
            cls: 'border-bottom',
            label: i18n.gettext('Filter by year and period'),
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
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
                        value: '{filter_year}',
                        store: '{years_data}'
                    }
                },
                {
                    xtype: 'segmentedbutton',
                    reference: 'purchase_month_select',
                    margin: '0 0 10 0',
                    defaults: {
                        ui: 'default',
                    },
                    bind: {
                        value: '{filter_month}'
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
            text: i18n.gettext('Number / Date'),
            tpl: `<b><a href="/#purchase_card/{id}">{doc_number}</a></b>
                  <div>{doc_date}</div>`,
            width: 150,
            cell: {
                encodeHtml: false,
            }
        },{
            text: i18n.gettext('Status'),
            renderer(value, record, dataIndex, cell) {
                let vl = i18n.gettext('Paid');
                if(!record.get('paid')) {
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
        },{
            text: i18n.gettext('Total price'),
            width: 110,
            align: 'right',
            tpl: `<b>{price_total:erpMoney}</b>`,
            cell: {
                align: 'right',
                encodeHtml: false
            }
        },{
            text: i18n.gettext('Taxes'),
            width: 100,
            align: 'right',
            tpl: `{tax_total:erpMoney}`,
            cell: {
                align: 'right',
                encodeHtml: false
            }
        },{
            text: i18n.gettext('POS'),
            dataIndex: 'place_title',
            minWidth: 120,
            flex: 1,
        },{
            text: i18n.gettext('Manager'),
            tpl: `<div>{user_data.params.name} {user_data.params.surname}</div>`,
            minWidth: 120,
            flex: 1,
            cell: {
                encodeHtml: false,
            }
        },{
            text: i18n.gettext('Supplier'),
            tpl: `<a href="/#supplier/{supplier_id}">{params.supplier_title}</a>`,
            minWidth: 120,
            flex: 1,
            cell: {
                encodeHtml: false,
            }
        }
    ]
});
