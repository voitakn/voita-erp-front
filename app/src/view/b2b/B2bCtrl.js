Ext.define('Erp.view.b2b.B2bCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.b2b_ctrl',
    onViewShow() {
        this.redirectTo('partners');
    },
});
