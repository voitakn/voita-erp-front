Ext.define('Erp.view.banks.BanksCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.banks_ctrl',
    onViewShow() {
        const me = this;
        const vm = me.getViewModel();
        const banks_store = vm.getStore('banks_store');
        let banks = User.data.customer.configs.banks || [];
        console.log('banks', banks);
        banks_store.loadData(banks);
        me.setActiveMenu('banks');
    },
    toBack() {
        Ext.util.History.back();
    },
    onAddNewBank(btn) {
        const me = this;
        const vm = me.getViewModel();
        const new_bank = me.lookup('new_bank');
        vm.set('newBank', {});
        new_bank.setTarget(btn);
        new_bank.show();
    },
    onCancelNewBank() {
        const me = this;
        me.lookup('new_bank').hide();
    },
    onSaveNewBank() {
        const me = this;
        const vm = me.getViewModel();
        const newBank = vm.get('newBank');
        const new_bank = me.lookup('new_bank');
        const form = me.lookup('new_bank_form');
        const new_bank_name = me.lookup('new_bank_name');
        const banks = User.data.customer.configs.banks || [];
        const checkBank = me.checkNameBank(newBank.name);
        if (form.validate()) {
            if (!checkBank) {
                if (newBank.default) {
                    banks.map(bank => {
                        bank.default = false
                    })
                }
                let nb = {
                    default: newBank.default || false,
                    iban: newBank.iban,
                    // id: String(banks.length + 1),
                    id: newBank.name,
                    name: newBank.name,
                    swift: newBank.swift,
                };
                banks.push(nb);
                let data = User.data.customer;
                data.configs.banks = banks;
                Ext.Ajax.request({
                    url: Api.com.customer_save,
                    jsonData: data,
                    method: "POST",
                    success: function (resp) {
                        let result = Ext.JSON.decode(resp.responseText);
                        Notice.showToast(result);
                        User.updateUserSession(() => {
                            me.onViewShow();
                        });
                        new_bank.hide();
                    },
                });
            } else {
                new_bank_name.setErrorMessage('Enter valid name');
            }
        }


    },
    onEditBank(grid, row) {
        const me = this;
        const vm = me.getViewModel();
        const edit_bank = me.lookup('edit_bank');
        const record = row.record;
        edit_bank.setTarget(row.event.target);
        record.beginEdit();
        vm.set('editBank', record);
        edit_bank.show();
    },
    onSaveEditBank() {
        const me = this;
        const vm = me.getViewModel();
        const edit_bank = me.lookup('edit_bank');
        const form = me.lookup('edit_bank_form');
        const editBank = vm.get('editBank');
        const banks_store = vm.getStore('banks_store');
        const banksSave = [];
        let banks = banks_store.getRange();
        banks.map(bank => {
            let sb = {
                id: bank.data.id,
                name: bank.data.name,
                swift: bank.data.swift,
                iban: bank.data.iban,
                default: false,
            };
            if (sb.id === editBank.data.id) {
                if (editBank.data.default) {
                    sb.default = true;
                }
                sb.name = editBank.data.name;
                sb.swift = editBank.data.swift;
                sb.iban = editBank.data.iban;
            }
            banksSave.push(sb);
        })
        if (form.validate()) {
            let data = User.data.customer;
            data.configs.banks = banksSave;
            Ext.Ajax.request({
                url: Api.com.customer_save,
                jsonData: data,
                method: "POST",
                success: function (resp) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    User.updateUserSession(() => {
                        me.onViewShow()
                    });
                    edit_bank.hide();
                },
            });
        }
    },
    onCancelEditBank() {
        const me = this;
        const vm = me.getViewModel();
        const editBank = vm.get('editBank');
        editBank.cancelEdit();
        vm.set('editBank', {});
        me.lookup('edit_bank').hide();
    },
    checkNameBank(name) {
        const me = this;
        const vm = me.getViewModel();
        const banks = User.data.customer.configs.banks || [];
        return banks.filter(bank => bank.name === name).length;
    },
    onRemoveBank(grid, row) {
        const me = this;
        const vm = me.getViewModel();
        const remove_bank_check = me.lookup('remove_bank_check');
        const record = row.record;
        remove_bank_check.setTarget(row.event.target);
        vm.set('removeBank', record);
        remove_bank_check.show();

    },
    removeBank() {
        const me = this;
        const vm = me.getViewModel();
        const remove_bank_check = me.lookup('remove_bank_check');
        const removeBank = vm.get('removeBank');
        const banks_store = vm.getStore('banks_store');
        const banksSave = [];
        let data = User.data.customer;
        let banks = banks_store.getRange();
        banks.map(bank => {
            let sb = {
                id: bank.data.id,
                name: bank.data.name,
                swift: bank.data.swift,
                iban: bank.data.iban,
                default: bank.data.default,
            };
            if (sb.id !== removeBank.data.id) {
                banksSave.push(sb);
            }
        })
        data.configs.banks = banksSave;
        Ext.Ajax.request({
            url: Api.com.customer_save,
            jsonData: data,
            method: "POST",
            success: function (resp) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                User.updateUserSession(() => {
                    me.onViewShow()
                });
                remove_bank_check.hide();
            },
        });
    }
});
