Ext.define('Erp.view.sell.revert_list.RevertCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.revert_list_ctrl',
    bindings: {
        onPlaceChange: '{filter.place_id}',
        onActiveChange: '{filter.is_active}',
        reloadGrid: {
            year: '{filter.year}',
            month: '{filter.month}'
        }
    },
    is_rendered: false,
    onViewRender() {
        const vm = this.getViewModel();
        const placeField = this.lookup('revert_place_combobox');
        if (placeField) {
            placeField.setStore(User.placesStore);
            vm.set('filter.place_id', User.defStoreId);
        }
    },
    onViewShow() {
        if(!this.is_rendered) {
            this.is_rendered = true;
        } else {
            this.reloadGrid();
        }
    },
    onPlaceChange() {
        this.reloadGrid();
    },
    onActiveChange() {
        this.reloadGrid();
    },
    reloadGrid() {
        const me = this;
        const vm = this.getViewModel();
        const period = vm.get('filter.year') + '-' + vm.get('filter.month');
        vm.set('filter.period', period);
        const store = vm.getStore('revert_list_store');
        if (store) {
            store.load();
        }
    },
    onConfirmRequest(grid, row) {
        const me = this;
        const vm = me.getViewModel();
        const dialog = me.lookup('revert_list_dialog_confirm');
        const record = row.record;
        vm.set('invoice_id_revert', record.data.id);
        vm.set('approved', true);
        dialog.show();
    },
    confirmRequest() {
        const me = this;
        const dialog = me.lookup('revert_list_dialog_confirm');
        me.sendRequest();
        dialog.hide();
    },
    onCancelRequest(grid, row) {
        const me = this;
        const vm = me.getViewModel();
        const dialog = me.lookup('revert_list_dialog_cancel');
        const record = row.record;
        vm.set('invoice_id_revert', record.data.id);
        dialog.show();
    },
    cancelRequest() {
        const me = this;
        const vm = me.getViewModel();
        const dialog = me.lookup('revert_list_dialog_cancel');
        vm.set('approved', false);
        me.sendRequest();
        dialog.hide();
    },
    sendRequest() {
        const me = this;
        const vm = me.getViewModel();
        Ext.Ajax.request({
            url: Api.inv.sell_revert_close,
            jsonData: {
                id: vm.get('invoice_id_revert'),
                approved: vm.get('approved')
            },
            method: "POST",
            success(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success) {
                    me.reloadGrid();
                }
            },
            failure(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });

    },
    goToSellList() {
        this.redirectTo('retail');
        const vm = this.getViewModel();
        vm.set('active_retail_menu', 'sell_bills');
    }
});

