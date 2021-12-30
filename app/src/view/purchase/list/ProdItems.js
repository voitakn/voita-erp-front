Ext.define('Erp.view.purchase.list.ProdItems', {
    extend: 'Ext.grid.Grid',
    xtype: 'purchase_list_proditems',
    reference: 'purchase_list_proditems',
    bind: {
        store: '{invoice_items_store}'
    },
    columns: [
        {
            text: i18n.gettext('Title'),
            flex: 1,
            menu: false,
            minWidth: 200,
            tpl: `<a href="/#produce/{produce_id}"><b data-qtip="${i18n.gettext('Go to the product card')}">{item_params.title}</b></a> <i>{item_params.barcode}</i>
                    <div>${i18n.gettext('Tax rate')}: {tax_value}%</div>`,
            cell: {
                encodeHtml: false,
            }
        },{
            text: i18n.gettext('Per item'),
            width: 160,
            align: 'right',
            cell: {
                align: 'right',
                encodeHtml: false,
            },
            tpl: `<div>{[i18n.gettext('Qty')]}: {amount:number("0.00")}</div>
                  <div class="blue bolder">{[i18n.gettext('Price')]}: {price:erpMoney}</div>`
        },{
            text: i18n.gettext('Amount'),
            width: 180,
            align: 'right',
            tpl: `<div class="red">{[i18n.gettext('Tax')]}: {item_params.tax_total:erpMoney}</div>
                  <div class="blue bolder">{[i18n.gettext('Total')]}: {price_total:erpMoney}</div>`,
            cell: {
                align: 'right',
                encodeHtml: false,
            }
        }
    ],
    items: [
        {
            xtype: 'container',
            docked: 'bottom',
            cls: 'border-top',
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'container',
                    margin: '10 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'size-16 text-right bolder blue',
                            flex: 1,
                            html: `${i18n.gettext('Total amount')}:`,
                        },{
                            xtype: 'label',
                            width: 120,
                            cls: 'size-16 bolder text-right blue',
                            bind: {
                                html: `{show_invoice.price_total:erpMoney}`,
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
