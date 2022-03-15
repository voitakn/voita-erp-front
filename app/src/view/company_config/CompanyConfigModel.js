Ext.define('Erp.view.company_config.CompanyConfigModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.company_config_vm',
    formulas: {
        no_com_customer_save(get) {
            return !User.checkAccess('com.customer_save');
        },
    }
});
