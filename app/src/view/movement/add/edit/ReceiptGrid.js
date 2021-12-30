Ext.define('Erp.view.movement.add.edit.ReceiptGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'movement_add_items',
    reference: 'movement_add_items',
    autoSize: true,
    bind: {
        store: '{sell_items_store}'
    },
    columns: [
        {
            text: i18n.gettext('Produce'),
            flex: 1,
            menu: false,
            tpl: `<div><b>{title}</b></div><div>{barcode}</div>`,
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
            text: i18n.gettext('Price'),
            width: 100,
            menu: false,
            tpl: `<div class="blue bolder">{price:erpMoney}</div>`,
            cell: {
                encodeHtml: false,
                tools: {
                    plus: {
                        iconCls: 'x-fa fa-times red',
                        margin: '0 0 0 10',
                        tooltip: i18n.gettext('Remove from list'),
                        handler: 'deleteFromItems',
                        zone: 'end',
                    },
                }
            }
        }
    ]
});
