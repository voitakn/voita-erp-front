Ext.define('Erp.view.price_monitor.PriceMonitorCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.price_monitor_ctrl',
    requires: [
        'Erp.util.receipt.PrintStickers'
    ],
    bindings: {
        onPlaceChange: '{filter.place_id}',
        reloadGrid: '{filter.by_date}',
    },
    onViewRender() {
        const vm = this.getViewModel();
        const placeField = this.lookup('place_combobox');
        const field = this.lookup('filter_by_date');
        if (placeField) {
            placeField.setStore(User.placesStore);
        }
        vm.set('filter.by_date', field.getFormattedValue());
        vm.set('filter.place_id', User.defStoreId);
    },
    onViewShow() {
        this.reloadGrid();
    },
    onPlaceChange() {
        this.reloadGrid();
    },
    reloadGrid() {
        const me = this;
        const vm = this.getViewModel();
        const store = vm.getStore('last_prices_store');
        if (store) {
            store.currentPage = 1;
            store.load((records, operation, success) => {
                vm.set('countPrices', records.length);
            });
        }
    },
    changeFilterDate(field) {
        const me = this;
        const vm = me.getViewModel();
        vm.set('filter.by_date', field.getFormattedValue());
    },
    printStickers() {
        const vm = this.getViewModel();
        const data = vm.getStore('last_prices_store').getData();
        ReceiptPrintStickers.htmlRender(data);
    }
});

