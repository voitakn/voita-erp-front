Ext.define('Erp.view.home.HomeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.home_desktop_vm',
    data: {
        filter_day_from_purchases: Ext.Date.format(new Date(new Date() - (6*24*3600000) ), 'd M'),
        filter_day_to_purchases: Ext.Date.format(new Date(), 'd M'),
        filter_period_purchases: 1,
        filter_day_from_sales: Ext.Date.format(new Date(new Date() - (6*24*3600000) ), 'd M'),
        filter_day_to_sales: Ext.Date.format(new Date(), 'd M'),
        filter_period_sales: 1,
        filter_day_from_expenses: Ext.Date.format(new Date(new Date() - (6*24*3600000) ), 'd M'),
        filter_day_to_expenses: Ext.Date.format(new Date(), 'd M'),
        filter_period_expenses: 1,
    },
    formulas: {
    }
});
