Ext.define('Erp.store.Suppliers', {
    extend: 'Erp.data.Store',
    alias: 'store.suppliersStore',
    model: 'Erp.model.Supplier',
    storeId: 'suppliersStore',
    autoLoad: true,
    autoSync: false,
    pageSize: 50,
    remoteSort: true,
    proxy: {
        type: 'erp_api',
        api: {
            read: Api.com.supplier_list
        }
    }
});
