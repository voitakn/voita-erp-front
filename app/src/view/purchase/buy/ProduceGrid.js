Ext.define('Erp.view.purchase.buy.ProduceGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'purchase_produce_grid',
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
            margin: '10 0 10 0',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'start'
                    },
                    items: [
                        {
                            xtype: 'container',
                            cls: 'size-14 bolder',
                            margin: '10 0 0 0',
                            html: i18n.gettext('Choose products or')
                        },{
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'button',
                                    margin: '0 0 0 10',
                                    iconCls: 'x-fas fa-plus green-dark',
                                    text: i18n.gettext('Add new'),
                                    handler: 'addNewProduct'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'searchfield',
                    margin: '0 0 0 10',
                    flex: 1,
                    placeholder: i18n.gettext('By name or barcode (at least 3 char.)'),
                    bind: {
                        value: '{filter.search}'
                    }
                }
            ]
        },{
            xtype: 'container',
            docked: 'top',
            cls: 'border-bottom',
            items: [
                {
                    xtype: 'catalogfield',
                    margin: '0 0 10 0',
                    flex: 1,
                    minWidth: 300,
                    filter: 'prod',
                    viewModel: {
                        data: {
                            parent_field: 'filter.catalog_id',
                            labelText: false,
                            can_edit: true,
                            btnText: i18n.gettext('Categories'),
                            label_def_text: i18n.gettext('You can choose a category for products.'),
                        },
                        links: {
                            catalog_id: '{filter.catalog_id}',
                        }
                    }
                }
            ]
        }
    ],
    columns: [
        {
            text: i18n.gettext('Product name'),
            minWidth: 200,
            flex: 1,
            tpl: `<b>{title}</b><div>{params.description}</div>`,
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
        },{
            text: i18n.gettext('Barcode'),
            width: 120,
            tpl: `<i>{barcode}</i>`,
            align: 'center',
            cell: {
                encodeHtml: false,
                align: 'center'
            }
        },{
            text: i18n.gettext('Prices'),
            width: 200,
            align: 'right',
            //tpl: `<div class="bolder">${i18n.gettext('Balance')}: {amount_all:number("0.00")}</div>
            tpl: `<div class="blue">${i18n.gettext('Sell')}: <b>{price.retail:erpMoney}</b></div>
                  <div class="bolder green-dark">${i18n.gettext('Last buy')}: {price.last_buy:erpMoney}</div>`,
            cell: {align: 'right', encodeHtml: false}
        }
    ]
});
