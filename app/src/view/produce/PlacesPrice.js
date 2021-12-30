Ext.define('Erp.view.produce.PlacesPrice', {
    extend: 'Ext.grid.Grid',
    xtype: 'produce_places_price',
    reference: 'produce_places_price',
    bind: {
        store: '{produce_places_price_store}'
    },
    listeners: {
        show: 'LoadPlacesPrice'
    },
    columns: [
        {
            text: i18n.gettext('Store name'),
            dataIndex: 'title',
            flex: 1,
            tpl: `<b>{place_data.title}</b><div>{place_data.params.phone}</div>`,
            minWidth: 180,
            cell: {
                encodeHtml: false,
            }
        },{
            text: i18n.gettext('Price'),
            width: 150,
            align: 'right',
            tpl: `<div>${i18n.gettext('Basic price')}: {price_base:erpMoney}</div>
                  <div class="blue">${i18n.gettext('Total price')}: <b>{price:erpMoney}</b></div>`,
            cell: {align: 'right', encodeHtml: false}
        },{
            text: i18n.gettext('Discount'),
            width: 100,
            align: 'right',
            tpl: `<div class="green-dark">{sale_percent} %</div>
                  <div class="green-dark"><b>{sale:erpMoney}</b></div>`,
            cell: {align: 'right', encodeHtml: false}
        },{
            text: i18n.gettext('Active'),
            dataIndex: 'active',
            tpl: `{active:checkIcon}`,
            width: 80,
            cell: {
                encodeHtml: false,
                align: 'center'
            }
        },{
            width: 20,
            menu: false,
            hidden: true,
            bind: {
                hidden: '{no_price_retail_save}'
            },
            cell: {
                tools: {
                    edit: {
                        cls: 'blue',
                        tooltip: i18n.gettext('Change the price'),
                        handler: 'editPlacePrice',
                        zone: 'start',
                    },
                }
            }
        }
    ],
    items: [
        {
            xtype: 'produce_price_edit',
            listeners: {
                onCancel: 'onClosePriceEdit'
            }
        }
    ]

});