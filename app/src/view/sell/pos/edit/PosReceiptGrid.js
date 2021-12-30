Ext.define('Erp.view.sell.pos.edit.PosReceiptGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'sell_pos_items',
    reference: 'sell_pos_items',
    autoSize: true,
    bind: {
        store: '{sell_items_store}'
    },
    columns: [
        {
            text: i18n.gettext('Produce'),
            flex: 1,
            menu: false,
            tpl: `<b>{title}</b>`,
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
            tpl: `<div class="blue bolder">{price.price:erpMoney}</div>`,
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
