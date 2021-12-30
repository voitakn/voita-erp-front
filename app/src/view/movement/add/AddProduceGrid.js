Ext.define('Erp.view.movement.add.AddProduceGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'movement_add_produce_grid',
    autoSize: true,
    bind: {
        store: '{select_produce_store}',
    },
    plugins: {
        gridpagingtoolbar: true
    },
    columns: [
        {
            text: i18n.gettext('Produce'),
            flex: 1,
            menu: false,
            tpl: `<div><b><a href="/#produce/{id}"><b>{title}</b></a></b></div><div>{barcode}</div>`,
            cell: {
                encodeHtml: false,
            }
        },
        {
            text: i18n.gettext('Qty'),
            width: 80,
            align: 'center',
            menu: false,
            tpl: `<div class="bolder">{amount:number("0.00")}</div>`,
            cell: {
                encodeHtml: false,
            }
        },
        {
            text: i18n.gettext('Item'),
            width: 120,
            align: 'center',
            tpl: `<div>{tax_value} %</div><div class="blue bolder">{price:erpMoney}</div>`,
            cell: {
                align: 'right',
                encodeHtml: false,
                tools: {
                    plus: {
                        iconCls: 'x-fas fa-arrow-right green-dark size-24',
                        margin: '0 0 0 15',
                        tooltip: i18n.gettext('Select'),
                        handler: 'onProdSelected',
                        zone: 'end',
                    },
                }
            }
        }
    ]
});
