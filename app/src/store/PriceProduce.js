Ext.define('Erp.store.PriceProduce', {
    extend: 'Erp.data.Store',
    alias: 'store.price_plist_produce',
    model: 'Erp.model.PlistProduce',
    autoLoad: false,
    autoSync: false,
    proxy: {
        type: 'erp_api',
        api: {
            read: Api.price.plist_produce
        }
    }
});