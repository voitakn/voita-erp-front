Ext.define('Erp.view.b2b.B2bCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.b2b_ctrl',
    // bindings: {
    //     onClickMenu: '{active_b2b_menu}',
    // },
    onViewShow() {
        this.redirectTo('partners');
    },
});
