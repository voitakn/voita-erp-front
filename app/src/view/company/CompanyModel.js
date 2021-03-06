Ext.define('Erp.view.company.CompanyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.company_vm',
    data: {
        edit_configs: {},
        edit_config: true,
    },
    formulas: {
        no_com_customer_save(get) {
            return !User.checkAccess('com.customer_save');
        },
        tax_number_name(get) {
            return User.data.country.params.tax_number.name || i18n.gettext('Tax number');
        }
    }
});
