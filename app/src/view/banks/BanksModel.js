Ext.define('Erp.view.banks.BanksModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.banks_vm',
    data: {
        edit_configs: {},
        edit_config: true,
    },
    requires: [
        'Erp.store.Banks',
    ],
    stores: {
        banks_store: {
            type: 'banksStore',
        }
    },
    formulas: {
        no_com_customer_save(get) {
            return !User.checkAccess('com.customer_save');
        },
    }
});
