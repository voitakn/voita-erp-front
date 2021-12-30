Ext.define('Erp.store.admin.Groups', {
    extend: 'Erp.data.Store',
    alias: 'store.group_list_store',
    model: 'Erp.model.admin.Group',
    storeId: 'groupsStore',
    autoLoad: true,
    autoSync: true,
    pageSize: 50,
    proxy: {
        type: 'erp_api',
        api: {
            read: Api.adm.group_list,
            create: Api.adm.group_save,
            update: Api.adm.group_save,
            destroy: Api.adm.group_delete
        }
    }
});