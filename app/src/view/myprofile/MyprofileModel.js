Ext.define('Erp.view.myprofile.MyprofileModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.myprofile_vm',
    data: {},
    formulas: {
        phone_input_mask() {
            return User.data.country.params.phone_mask;
        },
        no_com_login_change_passwd(get) {
            return !User.checkAccess('com.login_change_passwd');
        },
        no_com_login_params_save(get) {
            return !User.checkAccess('com.login_params_save');
        },

    }
});
