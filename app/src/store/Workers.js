Ext.define('Erp.store.Workers', {
    extend: 'Erp.data.Store',
    alias: 'store.workersStore',
    model: 'Erp.model.Worker',
    storeId: 'workersStore',
    autoLoad: true,
    autoSync: true,
    pageSize: 50,
    remoteSort: true,
    sorters: {
        property: 'login'
    },
    proxy: {
        type: 'erp_api',
        api: {
            read: Api.com.worker_list
        },
    },
});
