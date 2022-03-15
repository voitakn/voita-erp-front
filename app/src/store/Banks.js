Ext.define('Erp.store.Banks', {
    extend: 'Erp.data.Store',
    alias: 'store.banksStore',
    model: 'Erp.model.Banks',
    storeId: 'banksStore',
    autoLoad: false,
    autoSync: true,
    pageSize: 25,
});
