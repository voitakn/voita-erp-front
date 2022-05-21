Ext.define('Erp.view.prices_rules.RulesCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.pricesrules_ctrl',
    afterViewShow() {
        const me = this;
        const vm = me.getViewModel();
        me.onCloseCard();
        const prices_defs_rules_store = vm.getStore('prices_defs_rules_store');
        prices_defs_rules_store.load();
        me.setActiveMenu('prices_rules');
    },
    onCloseCard() {
        const grid = this.lookup('prices_rules_grid');
        grid.deselectAll();
    },
    addNewRules(btn) {
        const me = this;
        const vm = this.getViewModel();
        const form = me.lookup('price_rules_new_form');
        const tooltip = me.lookup('prices_rules_new');
        const field = tooltip.down('textfield');
        const prices_defs_rules_store = vm.getStore('prices_defs_rules_store');
        const grid = me.lookup('prices_rules_grid');
        vm.set('newRules', {
            title: '',
            type_change: 1,
            percent: null,
            active: true
        });
        grid.deselectAll();
        prices_defs_rules_store.each((record) => {
            if (record.data.purchase) {
                vm.set('newRules.parent_id', record.data.id);
            }
        })
        tooltip.setTarget(btn);
        tooltip.show();
        if (field) {
            field.focus();
        }
        form.validate();
    },
    onSaveNew(btn) {
        const me = this;
        const vm = this.getViewModel();
        const newRules = vm.get('newRules');
        const form = me.lookup('price_rules_new_form');
        const prices_rules_store = vm.getStore('prices_rules_store');
        const prices_rulesNewTooltip = me.lookup('prices_rules_new');
        if (form.validate()) {
            Ext.Ajax.request({
                url: Api.price.cols_save,
                jsonData: {
                    title: newRules.title,
                    percent: newRules.percent,
                    type_change: newRules.type_change,
                    parent_id: newRules.parent_id,
                    active: newRules.active,
                },
                method: "POST",
                success: function (resp) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    prices_rules_store.load();
                    prices_rulesNewTooltip.hide();
                    me.onCancelNew();
                },
            });
        }
    },
    onCancelNew(btn) {
        const me = this;
        const tooltip = me.lookup('prices_rules_new');
        tooltip.hide();
    },
    onEdit(grid, row) {
        const me = this;
        const vm = me.getViewModel();
        const price_rules_edit = me.lookup('price_rules_edit');
        const affected = me.lookup('affected');
        const record = row.record;
        price_rules_edit.setTarget(row.event.target);
        price_rules_edit.show();
        if (record.data.parent_id === null || record.data.parent_id === '') {
            vm.set('editRules.parent_id', 'Not');
            affected.setInputValue('Not');
        }
        vm.set('editRules', record);
        record.beginEdit();
    },
    onCancelEdit(btn) {
        const me = this;
        const vm = this.getViewModel();
        const editRules = vm.get('editRules');
        editRules.cancelEdit();
        vm.set('editRules', {});

    },
    onCancelEditRules(btn) {
        const me = this;
        const vm = this.getViewModel();
        const price_rules_edit = me.lookup('price_rules_edit');
        price_rules_edit.hide();
    },
    onSaveEdit(btn) {
        const me = this;
        const vm = me.getViewModel();
        const price_rules_edit = me.lookup('price_rules_edit');
        const form = me.lookup('edit_form');
        const editRules = vm.get('editRules');
        if (editRules.modified) {
            if (form.validate()) {
                editRules.save({
                    callback(record, operation, success) {
                        if (success) {
                            price_rules_edit.hide();
                        }
                    }
                });
            }
        }
    },
});
