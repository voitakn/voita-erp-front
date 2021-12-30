Ext.define('Erp.store.UserPlaces', {
    extend: 'Erp.data.Store',
    alias: 'store.user_places',
    model: 'Erp.model.Place',
    storeId: 'user_places',
    proxy: {
        type: 'memory',
    }
});