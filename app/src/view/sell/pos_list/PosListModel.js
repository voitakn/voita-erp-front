Ext.define('Erp.view.sell.pos_list.PosListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pos_list_vm',
    data: {
        filter: {
            place_id: null,
            by_date: new Date(),
            is_active: false
        }
    },
    stores: {
        cashopen_list_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.PosList',
            autoLoad: false,
            autoSync: false,
            pageSize: 100,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.inv.cashopen_list,
                },
                extraParams: {
                    place_id: '{filter.place_id}',
                    by_date: '{filter.by_date}',
                    is_active: '{filter.is_active}'
                }
            }
        }
    }
});
