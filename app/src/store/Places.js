Ext.define('Erp.store.Places', {
    extend: 'Erp.data.Store',
    alias: 'store.placesStore',
    model: 'Erp.model.Place',
    storeId: 'placesStore',
    autoLoad: true,
    autoSync: false,
    pageSize: 50,
    remoteSort: true,
    sorters: {
        property: 'title'
    },
    proxy: {
        type: 'erp_api',
        api: {
            read: Api.com.place_list_all
        },
    },
});
