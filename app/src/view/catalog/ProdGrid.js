Ext.define('Erp.view.catalog.ProdGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'catalog_produce',
    scrollable: 'y',
    reserveScrollbar: true,
    autoSize: true,
    plugins: {
        gridpagingtoolbar: true
    },
    bind: {
        store: '{produce_store}',
    },
    items: [
        {
            xtype: 'head1',
            items: [
                /*{
                    xtype: 'label',
                    cls: 'title',
                    html: i18n.gettext('Products and services')
                },*/{
                    text: i18n.gettext('Product'),
                    iconCls: 'x-fa fa-plus green-dark',
                    handler: 'addNewProduce',
                    hidden: true,
                    bind: {
                        hidden: '{no_com_produce_save}'
                    }
                },{
                    text: i18n.gettext('Service'),
                    iconCls: 'x-fa fa-plus green-dark',
                    handler: 'addNewService',
                    hidden: true,
                    bind: {
                        hidden: '{no_com_produce_save}'
                    }
                },{
                    xtype: 'searchfield',
                    margin: '0 0 0 0',
                    flex: 1,
                    placeholder: i18n.gettext('Search by name and barcode (at least 3 characters)'),
                    bind: {
                        value: '{filter_search}'
                    }
                }
            ]
        }
    ],
    columns: [
        {
            text: i18n.gettext('Product name'),
            flex: 1,
            tpl: `<a href="/#produce/{id}"><b>{title}</b></a><div>{params.description}</div>`,
            cell: {encodeHtml: false}
        },{
            text: i18n.gettext('Price'),
            width: 160,
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
            text: i18n.gettext('Tax'),
            dataIndex: 'tax_value',
            width: 70,
            tpl: '{tax_value} %',
            align: 'right',
            cell: {align: 'right', encodeHtml: false}
        },{
            text: i18n.gettext('Barcode'),
            dataIndex: 'barcode',
            minWidth: 160,
            flex: 1,
            align: 'center',
            cell: {align: 'center'}
        }
    ]
});