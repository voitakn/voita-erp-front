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
        }
    },
    stores: {
        taxes_store() {
            return User.taxesStore;
        },
        produce_places_price_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.RetailByPlaces',
            autoLoad: false,
            autoSync: false,
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
    },
    formulas: {
        no_price_cols_save(get) {
            return !User.checkAccess('price.cols_save');
        },
        no_price_retail_save(get) {
            return !User.checkAccess('price.retail_save');
        },
        no_com_produce_save(get) {
            return !User.checkAccess('com.produce_save');
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
