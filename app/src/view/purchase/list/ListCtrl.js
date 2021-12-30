Ext.define('Erp.view.purchase.list.ListCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.purchase_list_ctrl',
    bindings: {
        loadInvoices: {
            year: '{filter_year}',
            month: '{filter_month}'
        },
        changedPlace: '{filter_place_id}',
        changedSupplier: '{filter_supplier_id}'
    },
    is_rendered: false,
    onViewRender() {
        const vm = this.getViewModel();
        const placeField = this.lookup('purchase_place_combobox');
        if(placeField) {
            placeField.setStore(User.placesStore);
            vm.set('filter_place_id', User.defStoreId);
        }
    },
    onViewShow() {
        if(!this.is_rendered) {
            this.is_rendered = true;
        } else {
            this.loadInvoices();
        }
    },
    onViewHide() {
        const me = this;
        const invoiceGrid = me.lookup('purchase_grid');
        invoiceGrid.getSelectable().deselectAll();
    },
    changeFilterPlace(field) {
        const me = this;
        const vm = me.getViewModel();
        vm.set('filter_place_id', field.getValue());
    },
    loadInvoices(period) {
        const me = this;
        const vm = me.getViewModel();
        const store = vm.getStore('buy_invoices');
        if(store) {
            store.load();
        }
    },
    changedPlace(place_id) {
        this.loadInvoices({});
    },
    changedSupplier(supplier_id) {
        this.loadInvoices({});
    },
    onCloseInvoice(btn) {
        const me = this;
        const invoiceGrid = me.lookup('purchase_grid');
        invoiceGrid.getSelectable().deselectAll();
    },
    onNewPurchase(btn) {
        this.redirectTo('purchase_buy');
    }
});