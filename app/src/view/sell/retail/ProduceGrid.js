Ext.define('Erp.view.sell.retail.ProduceGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'retail_produce_grid',
    autoSize: true,
    plugins: {
        gridpagingtoolbar: true
    },
    bind: {
        store: '{select_produce_store}',
    },
    items: [
        {
            xtype: 'head2',
            items: [
                {
                    xtype: 'togglefield',
                    margin: '0 0 0 15',
                    width: 140,
                    label: `<b>${i18n.gettext('Only available')}</b>`,
                    boxLabel: i18n.gettext('Switch on'),
                    bind: {
                        value: '{filter.only_amount}'
                    }
                }, {
                    xtype: 'searchfield',
                    margin: '0 0 0 15',
                    label: i18n.gettext('By name or barcode'),
                    flex: 1,
                    placeholder: i18n.gettext('By name and barcode (at least 3 characters)'),
                    bind: {
                        value: '{filter.search}'
                    }
                }
            ]
        }, {
            xtype: 'container',
            docked: 'top',
            cls: 'border-bottom',
            items: [
                {
                    xtype: 'catalogfield',
                    margin: '0 0 10 0',
                    flex: 1,
                    minWidth: 300,
                    viewModel: {
                        data: {
                            parent_field: 'filter.catalog_id',
                            labelText: false,
                            can_edit: true,
                            btnText: i18n.gettext('Categories'),
                            label_def_text: i18n.gettext('Filter by catalog. Select to refine the list of products.'),
                        },
                        links: {
                            catalog_id: '{filter.catalog_id}'
                        }
                    }
                }
            ]
        }
    ],
    columns: [
        {
            text: i18n.gettext('Products and services'),
            minWidth: 130,
            flex: 1,
            tpl: `<b>{title}</b> <i>{barcode}</i><div>{params.description}</div>`,
            cell: {
                encodeHtml: false,
                tools: {
                    plus: {
                        iconCls: 'x-fas fa-arrow-left green-dark size-24',
                        margin: '0 15 0 0',
                        tooltip: i18n.gettext('Select'),
                        handler: 'onProdSelected',
                        zone: 'start',
                    },
                }
            }
        }, {
            text: i18n.gettext('Quantity'),
            width: 90,
            align: 'right',
            tpl: `<tpl if="serv == false">
                        <div class="bolder">{amount:number("0.00")}</div>
                    </tpl>`,
            cell: {align: 'right', encodeHtml: false}
        }, {
            text: i18n.gettext('Price'),
            width: 120,
            align: 'right',
            tpl: `<div>${i18n.gettext('Main.')}: {price.price_base:erpMoney}</div>
                  <div class="blue"><b>${i18n.gettext('Total')}: {price.price:erpMoney}</b></div>`,
            cell: {align: 'right', encodeHtml: false}
        }, {
            text: i18n.gettext('Discount'),
            width: 75,
            flex: 1,

            align: 'right',
            tpl: `{price.sale_percent} %<div class="green-dark bolder">{price.sale:erpMoney}</div>`,
            cell: {align: 'right', encodeHtml: false}
        }
    ]
});
