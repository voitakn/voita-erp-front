Ext.define('Erp.view.movement.list.ListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.movement_list_vm',
    data: {
        filter: {
            place_id: null,
            year: Ext.Date.format(new Date(), 'Y'),
            month: Ext.Date.format(new Date(), 'm'),
            period: null
        },
    },
    stores: {
        movement_list_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.MoveList',
            autoLoad: false,
            autoSync: false,
            pageSize: 100,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.inv.move_list_month,
                },
                extraParams: {
                    place_id: '{filter.place_id}',
                    y_m: `{filter.period}` || '{filter.year}' + '-' + '{filter.month}',
                }
            }
        },
    },
    formulas: {
        years_data(get) {
            const startY = 2021;
            const lastY = Number(Ext.Date.format(new Date(), 'Y'));
            const years = [];
            if (lastY > startY) {
                for (let i = startY; i <= lastY; i++) {
                    years.push({id: i});
                }
            } else {
                years.push({id: startY});
            }
            return years;
        },
        no_inv_move_create(get) {
            return !User.checkAccess('inv.move_create');
        },
    }

});
