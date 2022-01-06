Ext.define('Erp.view.retail.RetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.retail_vm',
    formulas: {
        no_inv_sell_list_date_user(get) {
            return !User.checkAccess('inv.sell_list_date_user');
        },
        no_inv_cashopen_list(get) {
            return !User.checkAccess('inv.cashopen_list');
        },
        no_inv_cashopen_start(get) {
            return !User.checkAccess('inv.cashopen_start');
        },
        no_inv_sell_retail_create(get) {
            return !User.checkAccess('inv.sell_retail_create');
        },
        no_inv_sell_revert_list(get) {
            return !User.checkAccess('inv.sell_revert_list');
        },
        no_price_last_prices(get) {
            return !User.checkAccess('price.last_prices');
        },
    }
});