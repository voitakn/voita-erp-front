Ext.define('Erp.view.movement.list.ListCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.movement_list_ctrl',
    bindings: {
        onPlaceChange: '{filter.place_id}',
        reloadGrid: {
            month: '{filter.month}',
            year: '{filter.year}',
        }
    },
    is_rendered: false,
    onViewRender() {
        const vm = this.getViewModel();
        const placeField = this.lookup('move_place_combobox');
        if (placeField) {
            placeField.setStore(User.placesStore);
            vm.set('filter.place_id', User.defStoreId);
        }
    },
    onViewShow() {
        if (!this.is_rendered) {
            this.is_rendered = true;
        } else {
            this.reloadGrid();
        }
    },
    onPlaceChange() {
        this.reloadGrid();
    },
    reloadGrid() {
        const me = this;
        const vm = this.getViewModel();
        const period = vm.get('filter.year') + '-' + vm.get('filter.month');
        vm.set('filter.period', period);
        const store = vm.getStore('movement_list_store');
        if (store) {
            store.load();
        }
    },
    confirmStatusToSent(grid, row) {
        const vm = this.getViewModel();
        vm.set('invoice_id', row.record.data.id);
        this.getView().down('movement_sent').show();
    },
    confirmStatusToReceive(grid, row) {
        const vm = this.getViewModel();
        vm.set('invoice_id', row.record.data.id);
        this.getView().down('movement_receive').show();
    },
    changeStatusToSent() {
        const me = this;
        const vm = this.getViewModel();
        Ext.Ajax.request({
            url: Api.inv.move_dispatched,
            jsonData: {
                id: vm.get('invoice_id'),
                period_year: vm.get('filter.year')
            },
            method: "POST",
            success: function (resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success) {
                    if (result.data) {
                        me.reloadGrid();
                    }
                }
            },
            failure: function (resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            }
        });
        this.getView().down('movement_sent').hide();
    },
    changeStatusToReceive() {
        const me = this;
        const vm = this.getViewModel();
        Ext.Ajax.request({
            url: Api.inv.move_accepted,
            jsonData: {
                id: vm.get('invoice_id'),
                period_year: vm.get('filter.year')
            },
            method: "POST",
            success: function (resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success) {
                    if (result.data) {
                        me.reloadGrid();
                    }
                }
            },
            failure: function (resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            }
        });
        this.getView().down('movement_receive').hide();
    },
});

