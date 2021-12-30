Ext.define('Erp.view.myprofile.MyprofileCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.myprofile_ctrl',
    onViewShow() {
        const me = this;
        const vm = me.getViewModel();
        const UserData = User.data;
        vm.set('theCard.login',UserData.login);
        vm.set('theCard.name',UserData.params.name);
        vm.set('theCard.surname',UserData.params.surname);
        vm.set('theCard.phone',UserData.params.phone);
        let groups = UserData.groups;
        let groups_title = '';
        let sep = '';
        for (let i in groups) {
            groups_title = groups_title + sep + groups[i].title;
            sep = ', ';
        }
        vm.set('theCard.title', groups_title);
    },
    onChangePassword(btn) {
        const me = this;
        const changePassword = me.lookup('myprofile_change_password');
        changePassword.setTarget(btn);
        changePassword.show();
    },
    changePassword(btn) {
       //console.('changePassword');
        const me = this;
        const vm = me.getViewModel();
        const changePassword = me.lookup('myprofile_change_password');
        const form = changePassword.down('formpanel');
        const new_pass = vm.get('pass.new_pass');
        const pass_verify = vm.get('pass.pass_verify');
        if (form.validate() && (new_pass === pass_verify)) {
            Ext.Ajax.request({
                url: Api.com.login_change_passwd,
                jsonData: {
                    old_passwd: vm.get('pass.old_pass'),
                    new_passwd: new_pass
                },
                method: "POST",
                success: function(resp) {
                    let result = Ext.JSON.decode(resp.responseText);
                   //console.('change_passwd', result);
                    Notice.showToast(result);
                    if(result.success){
                        changePassword.hide();
                    }
                },
                failure: function (resp) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                }
            });
        } else {
            let result = {success: false, code_msg: "com.login_change_passwd.error_2"};
            Notice.showToast(result);
        }
    },
    cancelPassword(btn) {
        const me = this;
        const vm = me.getViewModel();
        const changePassword = me.lookup('myprofile_change_password');
        vm.set('pass', {});
        changePassword.hide();
    },
    changeUserData(btn) {
        const me = this;
        const tooltip = me.lookup('myprofile_edit_user');
        tooltip.setTarget(btn);
        tooltip.show();
    },
    cancelEditUser(btn) {
        const me = this;
        const tooltip = me.lookup('myprofile_edit_user');
        tooltip.hide();
    },
    saveUserData(btn) {
        const me = this;
        const vm = me.getViewModel();
        const user = vm.get('theCard');
        const tooltip = me.lookup('myprofile_edit_user');
        const form = tooltip.down('formpanel');

        if (form.validate()) {
            Ext.Ajax.request({
                url: Api.com.login_params_save,
                jsonData: {
                    params: {
                        name: user.name,
                        surname: user.surname,
                        phone: user.phone,
                    }
                },
                method: "POST",
                success: function(resp) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    if(result.success){
                        tooltip.hide();
                        User.updateUserSession();
                        //User.data.params = userSave.params;
                    }
                },
                failure: function (resp) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                }
            });
        } else {
            let result = {success: false, msg: i18n.gettext('Please fill in all required fields')};
            Notice.showToast(result);
        }
    }
});
