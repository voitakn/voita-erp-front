Ext.define('Erp.store.Produces', {
    extend: 'Erp.data.Store',
    alias: 'store.com_produce_list',
    model: 'Erp.model.ProduceList',
    autoLoad: true,
    autoSync: false,
    pageSize: 50,
    proxy: {
        type: 'erp_api',
        api: {
            read: Api.items.produce_list
        }
    }
});
