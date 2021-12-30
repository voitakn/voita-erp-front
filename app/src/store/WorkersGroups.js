Ext.define('Erp.store.WorkersGroups', {
    extend: 'Erp.data.Store',
    alias: 'store.workersGroupStore',
    requires: [
        'Erp.model.WorkerGroup'
    ],
    model: 'Erp.model.WorkerGroup',
    storeId: 'workersGroupStore',
    autoLoad: true,
    proxy: {
        type: 'erp_api',
        api: {
            read: Api.com.worker_group_list
        },
    },
});
