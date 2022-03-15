Ext.define('Erp.view.b2b.catalog.CatalogCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.b2b_catalog_ctrl',
    onViewShow() {
        const me = this;
        // me.setActiveMenu('b2b_catalog');
        const vm = this.getViewModel();
        const store = vm.getStore('select_produce_store');
        if (store) {
            vm.getStore('select_produce_store').loadPage(1);
        }
    },
    toBack(btn) {
        Ext.util.History.back();
    },

});
