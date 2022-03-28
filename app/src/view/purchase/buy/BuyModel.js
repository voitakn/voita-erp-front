Ext.define('Erp.view.purchase.buy.BuyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.purchase_buy_vm',
    requires: [
        'Erp.model.ItemBuy'
    ],
    data: {
        add_record: null,
        price_retail: {},
        price_data: {},
        produce: {},
        buy_data: {
            invoice_total: 0.00,
            paid_params: {
                type: null,
                doc_number: null,
                date: Ext.Date.dateFormat(new Date(), 'Y-m-d'),
            }
        },
        buy_doc_date: Ext.Date.dateFormat(new Date(), 'Y-m-d'),
        filter: {
            catalog_id: null,
            search: null
        },
        supplier: {
            supplier_id: ''
        },
    },
    stores: {
        buy_items_store: {
            model: 'Erp.model.ItemBuy',
            autoSync: true,
            proxy: {
                type: 'memory'
            },
            listeners: {
                datachanged: 'onItemsChanged'
            }
        },
        taxes_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.Iva',
            proxy: {
                type: 'memory'
            },
            data: []
        },
        select_produce_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.BuyProduceList',
            autoLoad: true,
            autoSync: false,
            pageSize: 25,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.items.purchase_produce_list
                },
                extraParams: {
                    catalog_id: '{filter.catalog_id}',
                    search: '{filter.search}'
                }
            }
        },
        suppliers_store: {
            type: 'suppliersStore'
        }
    },
    formulas: {
        buy_market_place: function(get){
            const places = User.places();
            if(places.length > 0){
                const buy_data = get('buy_data');
                buy_data.place_id = places[0].id;
                this.set('buy_data', buy_data);
                this.set('hide_one_place', false);
                return places[0].title;
            }
            this.set('hide_one_place', true);
        },
        seller_full_name: function(get){
            return `<b>${User.fullName()}</b>`
        }
    }
});
