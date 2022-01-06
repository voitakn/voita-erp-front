Ext.define('Erp.view.retail.RetailCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.retail_ctrl',
    bindings: {
        onClickMenu: '{active_retail_menu}',
    },
    onViewShow() {
        this.redirectTo('sell_bills');
    },
});
