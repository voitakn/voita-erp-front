Ext.define('Erp.view.expense.ExpenseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.expense_vm',
    data: {
        micro: false,
        cardId: null,
        newExpense: {},
    },
    stores: {
        expense_store: {
            extend: 'Erp.data.Store',
            fields: [
                {name: 'id', type: 'string'},
                {name: 'title',  type: 'string'},
                {name: 'params',  type: 'auto'},
                {name: 'date_create',  type: 'string'},
                {name: 'amount',  type: 'number'}
            ],
            data: [
                {id: 'adfaddsdasd', title: 'My title expense 1', params: {}, date_create: '2021-02-19', amount: 23.10},
                {id: 'adfaddsdasd1', title: 'My title expense 2', params: {}, date_create: '2021-02-19', amount: 124.75},
                {id: 'adfaddsdasd2', title: 'My title expense 3', params: {}, date_create: '2021-02-19', amount: 432.50},
                {id: 'adfaddsdasd3', title: 'My title expense 4', params: {}, date_create: '2021-02-19', amount: 512.65},
                {id: 'adfaddsdasd4', title: 'My title expense 5', params: {}, date_create: '2021-02-19', amount: 278.20},
            ],
            proxy: {
                type: 'memory',
            }
        },
    },
    formulas: {
        expense_sels: {
            bind: {
                bindTo: '{micro}',
                deep: true
            },
            get(val) {
                if(val === true) {
                    return {
                        columns: false,
                        cells: false,
                        checkbox: false,
                        headerCheckbox: false,
                        extensible: true,
                        mode: 'single',
                    }
                } else {
                    return {
                        columns: false,
                        cells: false,
                        checkbox: true,
                        headerCheckbox: false,
                        extensible: true,
                        mode: 'single',
                    }
                }
            }
        },
        no_com_place_list_all(get) {
            return !User.checkAccess('com.place_list_all');
        },
        no_com_worker_list(get) {
            return !User.checkAccess('com.worker_list');
        }
    
    }
});
