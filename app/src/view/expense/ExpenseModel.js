Ext.define('Erp.view.expense.ExpenseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.expense_vm',
    data: {
        filter: {
            place_id: null,
            year: Ext.Date.format(new Date(), 'Y'),
            month: Ext.Date.format(new Date(), 'm'),
            period: null
        },
    },
    stores: {
        expense_list_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.Expenses',
            autoLoad: false,
            autoSync: false,
            pageSize: 25,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.inv.expense_list,
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
        no_inv_expense_edit(get) {
            return !User.checkAccess('inv.expense_edit');
        },
        // date_create_short(get) {
        //     return Ext.Date.format(data.date_create, "Y-m-d H:i");
        // }
    }

});
