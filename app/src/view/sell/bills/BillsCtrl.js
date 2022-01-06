Ext.define('Erp.view.sell.bills.BillsCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.sell_bills_ctrl',
    bindings: {
        onFilterDate: '{filter_sell_date}',
        onFilterPlace: '{filter_place_id}'
    },
    is_rendered: false,
    onViewShow() {
        const me = this;
        const vm = me.getViewModel();
        if (!me.is_rendered) {
            me.is_rendered = true;
        } else {
            const store = vm.getStore('sell_invoices');
            if(store) {
                store.load();
            }
        }
        me.setActiveRetailMenu('sell_bills');
    },
    onViewRender() {
        const me = this;
        const vm = me.getViewModel();
        const placeField = this.lookup('bills_place_combobox');
        if(placeField) {
            placeField.setStore(User.placesStore);
            vm.set('filter_place_id', User.placesStore.getAt(0).getId());
        }
        me.onCloseBill();
    },
    loadIvoicesData() {
        const me = this;
        const vm = me.getViewModel();
        const store = vm.getStore('sell_invoices');
        if(store) {
            store.load();
        }
    },
    changeFilterDate(field) {
        const me = this;
        const vm = me.getViewModel();
        vm.set('filter_sell_date', field.getFormattedValue());
    },
    changeFilterPlace(field) {
        const me = this;
        const vm = me.getViewModel();
        vm.set('filter_place_id', field.getValue());
    },

    onFilterDate(filter) {
        const me = this;
        const vm = me.getViewModel();
        if(filter) {
            me.loadIvoicesData();
        }
    },
    onFilterPlace(filter) {
        const me = this;
        const vm = me.getViewModel();
        me.loadIvoicesData();
    },

    onCloseBill(btn) {
        const me = this;
        const billsGrid = me.lookup('bills_grid');
        billsGrid.getSelectable().deselectAll();
    },
    onCancelSale(btn, grid) {
        const me = this;
        const vm = me.getViewModel();
        const tooltip = me.lookup('bills_cancel_sale');
        const record = grid.record;
        vm.set('id_cancel_sale', record.id);
        tooltip.setTarget(grid.event.target);
        tooltip.show();
    },
    cancelRevert() {
        const me = this;
        const vm = me.getViewModel();
        const tooltip = me.lookup('bills_cancel_sale');
        tooltip.hide();
        vm.set('bills_reason', '');
    },
    saveCancelSale() {
        const me = this;
        const vm = me.getViewModel();
        const form = me.lookup('bills_cancel_sale_form');
        const store = vm.getStore('sell_invoices');

        if (form.validate()) {
            Ext.Ajax.request({
                url: Api.inv.sell_revert,
                jsonData: {
                    invoice_id: vm.get('id_cancel_sale'),
                    comment: vm.get('bills_reason')
                },
                method: "POST",
                success(resp, opt) {
                    const result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    if (result.success) {
                        me.cancelRevert();
                        store.load();
                    }
                },
                failure(resp, opt) {
                    const result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                },
            });
        }
    },
});
