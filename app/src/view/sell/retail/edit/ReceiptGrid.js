Ext.define('Erp.view.sell.retail.edit.ReceiptGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'sell_retail_items',
    reference: 'sell_retail_items',
    autoSize: true,
    bind: {
        store: '{sell_items_store}'
    },
    columns: [
        {
            text: i18n.gettext('Title'),
            flex: 1,
            menu: false,
            tpl: `<div><b>{title}</b> <u><i>{barcode}</i></u></div><div>{params.description}</div>`,
            cell: {
                encodeHtml: false,
                tools: {
                    plus: {
                        iconCls: 'x-far fa-times-circle red size-24',
                        margin: '0 0 0 10',
                        tooltip: i18n.gettext('Remove from list'),
                        handler: 'deleteFromItems',
                        zone: 'end',
                    },
                }
            }
        },{
            text: i18n.gettext('Price'),
            width: 120,
            align: 'right',
            menu: false,
            tpl: `<div class="red text-right">${i18n.gettext('Tax')}: {tax_price:erpMoney}</div>
                  <div class="green-dark text-right">${i18n.gettext('Discount')}: {price.sale:erpMoney}</div>
                  <div class="blue bolder text-right">${i18n.gettext('Price')}: {price.price:erpMoney}</div>`,
            cell: {
                align: 'right',
                encodeHtml: false,
            }
        },{
            text: i18n.gettext('Item'),
            width: 100,
            menu: false,
            align: 'right',
            tpl: `<div class="red text-right">${i18n.gettext('Tax rate')}: {tax_value}%</div>
                  <div class="bolder text-right">${i18n.gettext('Quantity')}: {amount:number("0.00")}</div>`,
            cell: {
                align: 'right',
                encodeHtml: false,
            }
        },{
            text: i18n.gettext('Amount'),
            width: 140,
            align: 'right',
            menu: false,
            tpl: `<div class="red text-right">${i18n.gettext('Tax')}: {tax_total:erpMoney}</div>
                  <div class="green-dark text-right">${i18n.gettext('Discount')}: {sale_total:erpMoney}</div>
                  <div class="blue bolder text-right">${i18n.gettext('Amount')}: {price_total:erpMoney}</div>`,
            cell: {
                align: 'right',
                encodeHtml: false
            }
        }
    ]
});
