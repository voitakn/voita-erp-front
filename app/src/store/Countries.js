Ext.define('Erp.store.Countries', {
    extend: 'Erp.data.Store',
    alias: 'store.counties_store',
    model: 'Erp.model.Country',
    autoLoad: true,
    proxy: {
        type: 'erp_api',
        url: Api.com.country_list,
    }
});