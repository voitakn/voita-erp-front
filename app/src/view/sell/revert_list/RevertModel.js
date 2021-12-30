Ext.define('Erp.view.sell.revert_list.RevertModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.revert_list_vm',
    data: {
        filter: {
            place_id: null,
            is_active: true,
            year: Ext.Date.format(new Date(), 'Y'),
            month: Ext.Date.format(new Date(), 'm'),
            period: null
        },
        btn_text_cancel: i18n.gettext('No'),
        btn_text_save: i18n.gettext('Yes'),
    },
    stores: {
        revert_list_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.Revert',
            autoLoad: false,
            autoSync: false,
            pageSize: 100,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.inv.sell_revert_list,
                },
                extraParams: {
                    place_id: '{filter.place_id}',
                    period: `{filter.period}`,
                    opened: '{filter.is_active}'
                }
            }
        }
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
        no_inv_sell_list_date_user(get) {
            return !User.checkAccess('inv.sell_list_date_user');
        },
        no_inv_sell_revert_close(get) {
            return !User.checkAccess('inv.sell_revert_close');
        },

    }
});
