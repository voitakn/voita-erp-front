Ext.define('Erp.view.b2b.partners.PartnersModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.partners_vm',
    data: {
        cardId: null,
        partner_type: '',
        filter_search: '',
        isUserEmail: false,
        newCard: {},
        createCard: {},
        search_name: '',
        search_email: ''
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
            },
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
            },
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
            }
        },
        partners_search_name_store: {
            extend: 'Erp.data.Store',
            autoLoad: false,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.b2b.partners_search
                },
                extraParams: {
                    title: '{search_name}',
                    email: ''
                }
            },
        },
        partners_search_email_store: {
            extend: 'Erp.data.Store',
            autoLoad: false,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.b2b.partners_search
                },
                extraParams: {
                    title: '',
                    email: '{search_email}'
                }
            },
            listeners: {
                load: 'onChangeStore'
            }
        },
    },
    formulas: {
        no_b2b_partner_create(get) {
            return !User.checkAccess('b2b.partner_create');
        },
    }

});
