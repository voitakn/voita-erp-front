Ext.define('Erp.view.b2b.catalog.CatalogModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.b2b_catalog_vm',
    data: {
        cardId: null,
        partner_type: 'supplier',
        filter_search: '',
    },

    stores: {
        select_produce_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.RetailProduceList',
            autoLoad: true,
            autoSync: false,
            pageSize: 25,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.items.retail_produce_list
                },
                // extraParams: {
                //     catalog_id: '{filter.catalog_id}',
                //     place_id: '{filter.place_id}',
                //     search: '{filter.search}',
                //     only_amount: '{filter.only_amount}',
                // }
            }
        },
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

    },
});
