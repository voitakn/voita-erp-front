Ext.define('Erp.view.sell.pos_list.PosListCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.pos_list_ctrl',
    bindings: {
        reloadGrid: {
            by_date: '{filter.by_date}',
            is_active: '{filter.is_active}',
            place_id: '{filter.place_id}',
        }
    },
    onViewRender() {
        const vm = this.getViewModel();
        const placeField = this.lookup('pos_place_combobox');
        const field = this.lookup('filter_by_date');
        if (placeField) {
            placeField.setStore(User.placesStore);
        }
        vm.set('filter.by_date', field.getFormattedValue());
    },
    onViewShow() {
        const me = this;
        const vm = this.getViewModel();
        me.setActiveRetailMenu('pos_list');
        this.reloadGrid();
    },
    reloadGrid(data) {
        const me = this;
        const vm = this.getViewModel();
        const store = vm.getStore('cashopen_list_store');
        if (store) {
            store.load();
        }
    },
    changeFilterDate(field) {
        const me = this;
        const vm = me.getViewModel();
        vm.set('filter.by_date', field.getFormattedValue());
    },
    openFinishDialog(grid, row) {
        const me = this;
        const vm = me.getViewModel();
        const dialog = me.lookup('pos_list_dialog_finish');
        const record = row.record;
        vm.set('id_checkout_close', record.id);
        vm.set('period_checkout_close', record.data.period);
        dialog.show();
    },
    sendFinishRequest(btn) {
        const me = this;
        const vm = me.getViewModel();
        const dialog = me.lookup('pos_list_dialog_finish');
        Ext.Ajax.request({
            url: Api.inv.cashopen_list_stop,
            jsonData: {
                id: vm.get('id_checkout_close'),
                period: vm.get('period_checkout_close')
            },
            method: "POST",
            success(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success) {
                    dialog.hide();
                    me.reloadGrid();
                }
            },
            failure(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });
    }
});

