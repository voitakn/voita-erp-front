Ext.define('Erp.view.company_config.CompanyConfigCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.company_config_ctrl',
    bindings: {
        onConfigVmChange: {
            pos_mode: '{edit_configs.pos_mode}',
            tax_include: '{edit_configs.tax_include}',
        },
    },
    onViewShow() {
        const me = this;
        const vm = me.getViewModel();
        let customer = Ext.clone(User.data.customer);
        vm.set('edit_configs', {
            pos_mode: customer.configs.pos_mode || false,
            tax_include: customer.configs.tax_include || false,
        })
        me.setActiveMenu('company_config');
    },
    onConfigVmChange(configs) {
        const me = this;
        const vm = me.getViewModel();
        // console.log('User.data.customer', User.data.customer);
        let customer = Ext.clone(User.data.customer);
        // console.log('customer', customer);
        let pos_mode = customer.configs.pos_mode || false;
        let tax_include = customer.configs.tax_include || false;
        if (pos_mode !== configs.pos_mode || tax_include !== configs.tax_include) {
            customer.configs.pos_mode = configs.pos_mode;
            customer.configs.tax_include = configs.tax_include;
            Ext.Ajax.request({
                url: Api.com.customer_save,
                jsonData: customer,
                method: "POST",
                success: function (resp) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    User.updateUserSession(() => {
                        me.onViewShow()
                    });
                },
            });
        }
    },
});
