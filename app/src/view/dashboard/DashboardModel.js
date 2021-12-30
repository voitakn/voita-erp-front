Ext.define('Erp.view.dashboard.DashboardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard_vm',
    data: {
        mainData: {},
        company: {}
    },
    formulas: {
        no_desk_main_stat(get) {
            return !User.checkAccess('com.desk_main_stat');
        },
    }
});
