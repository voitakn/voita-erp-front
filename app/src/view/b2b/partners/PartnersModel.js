Ext.define('Erp.view.partners.PartnersModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.partners_vm',
    data: {
        cardId: null,
        partner_type: null,
        filter_search: '',
        isUserEmail: false,
        newCard: {},
    },
    stores: {
        partners_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.Partners',
            autoLoad: true,
            autoSync: false,
            pageSize: 25,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.b2b.partners_list
                },
                extraParams: {
                    search: '{filter_search}',
                    partner_type: '{partner_type}',
                }
            },
            // listeners: {
            //     load: 'onLoadFirst'
            // }
        },
        partners_incoming_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.Partners',
            autoLoad: false,
            autoSync: false,
            pageSize: 25,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.b2b.partners_incoming
                },
                // extraParams: {
                //     search: '{filter_incoming_search}'
                // }
            },
            // listeners: {
            //     load: 'onLoadFirst'
            // }
        },
        partners_outgoing_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.Partners',
            autoLoad: false,
            autoSync: false,
            pageSize: 25,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.b2b.partners_outgoing
                },
                // extraParams: {
                //     search: '{filter_outgoing_search}'
                // }
            },
            // listeners: {
            //     load: 'onLoadFirst'
            // }
        },
        country_store: {
            extend: 'Erp.data.Store',
            autoLoad: true,
            autoSync: false,
            pageSize: 50,
            sorters: {
                property: 'id'
            },
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.com.countries
                },
            },
        },
        rules_price_store: {
            extend: 'Erp.data.Store',
            autoLoad: true,
            autoSync: false,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.price.produce_cols
                },
                // extraParams: {
                //     produce_id: '{cardId}'
                // }
            }
        },

    },
    formulas: {
        no_b2b_partner_create(get) {
            return !User.checkAccess('b2b.partner_create');
        },
    }

});