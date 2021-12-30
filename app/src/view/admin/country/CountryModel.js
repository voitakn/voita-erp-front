Ext.define('Erp.view.admin.country.CountryModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin_country_vm',
    stores: {
        country_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.admin.Country',
            autoLoad: false,
            autoSync: false,
            pageSize: 50,
            sorters: {
                property: 'id'
            },

            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.adm.country_list
                },
            },
        }
    }
});
