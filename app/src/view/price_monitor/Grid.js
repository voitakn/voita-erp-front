Ext.define('Erp.view.price_monitor.Grid', {
    extend: 'Ext.grid.Grid',
    xtype: 'price_monitor_grid',
    reference: 'price_monitor_grid',
    scrollable: 'y',
    reserveScrollbar: true,
    autoSize: true,
    bind: {
        store: '{last_prices_store}',
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
                html: i18n.gettext('Price monitor')
            },{
                xtype: 'button',
                margin: '0 0 0 20',
                iconCls: 'x-fa fa-print',
                text: i18n.gettext('Print stickers'),
                disabled: true,
                handler: 'printStickers',
                bind: {
                    disabled: '{!countPrices}'
                }
            },{
                xtype: 'combobox',
                margin: '0 0 0 20',
                reference: 'place_combobox',
                editable: false,
                required: true,
                queryMode: 'local',
                width: 300,
                label: i18n.gettext('Point of sale'),
                labelAlign: 'left',
                labelWidth: 120,
                valueField: 'id',
                displayField: 'title',
                store: {},
                bind: {
                    value: '{filter.place_id}'
                }
            },{
                xtype: 'datefield',
                margin: '0 0 0 20',
                reference: 'filter_by_date',
                label: i18n.gettext('Date from'),
                width: 250,
                labelAlign: 'left',
                labelWidth: 110,
                dateFormat: 'Y-m-d',
                maxDate: new Date(),
                required: true,
                value: new Date(),
                listeners: {
                    change: 'changeFilterDate'
                },
            }]
        }
    ],
    columns: [
        {
            text: i18n.gettext('Produce name'),
            flex: 1,
            tpl: `<div><b><a href="/#produce/{id}"><b>{title}</b></a></b></div><div>{barcode}</div>`,
            cell: {encodeHtml: false}
        },
        {
            text: i18n.gettext('Price'),
            width: 160,
            align: 'center',
            tpl: `<div>${i18n.gettext('Basic price')}: {price.price_base:erpMoney}</div>
                  <div class="blue">${i18n.gettext('Total price')}: <b>{price.price:erpMoney}</b></div>`,
            cell: {align: 'right', encodeHtml: false}
        },
        {
            text: i18n.gettext('Discount'),
            width: 100,
            align: 'center',
            tpl: `<div class="green-dark">{price.sale_percent} %</div>
                  <div class="green-dark"><b>{price.sale:erpMoney}</b></div>`,
            cell: {align: 'right', encodeHtml: false}
        },
        {
            text: i18n.gettext('Tax'),
            width: 70,
            align: 'center',
            tpl: '{tax_value} %',
            cell: {align: 'center', encodeHtml: false}
        },
        {
            text: i18n.gettext('Unit type'),
            width: 160,
            align: 'center',
            tpl: `{unit_type}`,
            cell: {align: 'center', encodeHtml: false}
        },
        {
            text: i18n.gettext('Date update'),
            width: 160,
            align: 'center',
            tpl: `{date_update:date("Y-m-d H:i")}`,
            cell: {align: 'center', encodeHtml: false}
        },
    ]
});
