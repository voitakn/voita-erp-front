Ext.define('Erp.view.company.CompanyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.company_vm',
    data: {
        edit_configs: {},
        edit_config: true,
    },
    formulas: {
        no_com_place_list_all(get) {
            return !User.checkAccess('com.place_list_all');
        },
        no_com_worker_list(get) {
            return !User.checkAccess('com.worker_list');
        },
        no_inv_sell_card_by_id(get) {
            return !User.checkAccess('inv.sell_card_by_id');
        },
        no_com_customer_save(get) {
            return !User.checkAccess('com.customer_save');
        },
        tax_number_name(get) {
            return User.data.country.params.tax_number.name || i18n.gettext('Tax number');
        }
    }

});
