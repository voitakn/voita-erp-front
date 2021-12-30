Ext.define('Erp.view.movement.card.Grid', {
    extend: 'Ext.grid.Grid',
    xtype: 'movement_card_grid',
    reference: 'movement_card_grid',
    autoSize: true,
    bind: {
        store: '{move_invoice_items_store}'
    },
    columns: [
        {
            text: i18n.gettext('Title'),
            flex: 1,
            menu: false,
            minWidth: 200,
            tpl: `<a href="/#produce/{produce_id}"><b data-qtip="${i18n.gettext('Go to the product card')}">{item_params.title}</b></a> <i>{item_params.barcode}</i>`,
            cell: {
                encodeHtml: false,
            }
        }, {
            text: i18n.gettext('Quantity'),
            minWidth: 75,
            align: 'right',
            tpl: `<b>{amount:number("0.00")}</b>`,
            cell: {
                align: 'right',
                encodeHtml: false,
            }
        }, {
            text: i18n.gettext('Price'),
            minWidth: 160,
            align: 'right',
            cell: {
                align: 'right',
                encodeHtml: false,
            },
            tpl: `<div class="red">{[i18n.gettext('Tax')]}: {tax_price:erpMoney}</div>
                  <div class="blue bolder">{[i18n.gettext('Price')]}: {price:erpMoney}</div>`
        }, {
            text: i18n.gettext('Total'),
            minWidth: 180,
            align: 'right',
            tpl: `<div class="red">{[i18n.gettext('Tax')]}: {tax_total:erpMoney}</div>
                  <div class="blue bolder">{[i18n.gettext('Total')]}: {price_total:erpMoney}</div>`,
            cell: {
                align: 'right',
                encodeHtml: false,
            }
        }
    ]
});