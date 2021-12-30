Ext.define('Erp.store.IvaStore', {
    extend: 'Erp.data.Store',
    alias: 'store.ivastore',
    model: 'Erp.model.Iva',
    storeId: 'ivaStore',
    proxy: {
        type: 'memory'
    }
});
