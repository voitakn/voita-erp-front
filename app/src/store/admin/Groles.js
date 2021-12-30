Ext.define('Erp.store.admin.Groles', {
    extend: 'Erp.data.Store',
    alias: 'store.admin_groles_store',
    model: 'Erp.model.admin.Grole',
    storeId: 'grolesStore',
    autoLoad: true,
    autoSync: true,
    pageSize: 50,
    remoteSort: true,
    sorters: {
        property: 'level'
    },
    proxy: {
        type: 'erp_api',
        api: {
            read: Api.adm.groles_list,
            create: Api.adm.groles_save,
            update: Api.adm.groles_save,
            destroy: Api.adm.groles_delete
        },
    },
});