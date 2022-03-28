Ext.define('Erp.view.produce.ProduceModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.produce_vm',
    requires: [],
    data: {
        cardId: null,
        theCardEdit: false,
        editMainPrice: false,
        extra: {
            tax_name: '',
            unit_name: ''
        },
        history_mode: 'retail',
    },
    stores: {
        taxes_store() {
            return User.taxesStore;
        },
        produce_places_price_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.RetailByPlaces',
            autoLoad: true,
            autoSync: false,
            pageSize: 25,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.price.retail_by_places
                },
                extraParams: {
                    produce_id: '{cardId}'
                }
            }
        },
        rules_price_store: {
            extend: 'Erp.data.Store',
            autoLoad: false,
            autoSync: false,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.price.produce_cols
                },
                extraParams: {
                    produce_id: '{cardId}'
                }
            }
        },
        history_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.History',
            autoLoad: false,
            autoSync: false,
            pageSize: 25,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.price.produce_history
                },
                extraParams: {
                    produce_id: '{cardId}',
                    cols_base: '{history_mode}'
                    // cols_base: 'purchase'
                }
            }
        },
    },
    formulas: {
        no_price_cols_save(get) {
            return !User.checkAccess('price.cols_save');
        },
        no_price_retail_save(get) {
            return !User.checkAccess('price.retail_save');
        },
        no_items_produce_save(get) {
            return !User.checkAccess('items.produce_save');
        },
        no_price_purchase_save(get) {
            return !User.checkAccess('price.purchase_save');
        },
        no_price_cols_list(get) {
            return !User.checkAccess('price.cols_list');
        },

        price_places: {
            bind: {
                price_plc: '{theCardOrigin.params.places_prices}'
            },
            get(data) {
                //console.('price_places', data.price_plc);
                return !!data.price_plc;
            }
        },
    },
});
