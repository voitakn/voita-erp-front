Ext.define('Erp.view.b2b.catalog.CatalogModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.b2b_catalog_vm',
    data: {
        cardId: null,
        partner_type: 'supplier',
        item_data: {
            amount: 1
        },
        filter: {
            catalog_id: null,
            search: null,
        },
        bill_tax_total: 0.00,
        bill_amount_total: 0.00,
        bill_price_total: 0.00,
        bill_sale_total: 0.00,
        bill_products_total: 0,
        bill_sell_current: 1,
        bill_sell_total: 1,
        previous_order: false
    },

    stores: {
        b2bTreeCatalog: {
            type: 'tree',
            rootVisible: false,
            proxy: {
                type: 'ajax',
                url: Api.markets.catalog_json,
                paramsAsJson: true,
                extraParams: {
                    connId: '{cardId}'
                },
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                }
            }
        },
        market_produce_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.MarketProduceList',
            autoLoad: false,
            autoSync: false,
            pageSize: 25,
            proxy: {
                type: 'erp_api',
                paramsAsJson: true,
                api: {
                    read: Api.markets.produce_list
                },
                extraParams: {
                    connId: '{cardId}',
                    catalog_id: '{filter.catalog_id}',
                    search: '{filter.search}',
                }
            },
        },
        cart_items_store: {
            model: 'Erp.model.MarketSell',
            autoSync: true,
            proxy: {
                type: 'memory'
            },
            listeners: {
                datachanged: 'cartItemsChanged'
            }
        },
    },
});
