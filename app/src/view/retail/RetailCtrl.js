Ext.define('Erp.view.retail.RetailCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.retail_ctrl',
    bindings: {
        onClickMenu: '{active_retail_menu}',
    },
    onViewShow() {
        // console.log('onViewShow');
        const me = this;
        const vm = me.getViewModel();
        vm.set('active_retail_menu', 'sell_bills');
    },
    onViewRender() {
        // console.log('onViewRender');
        const me = this;
        const vm = me.getViewModel();
        vm.set('active_retail_menu', 'sell_bills');
    },
    onClickMenu(menu) {
        // console.log('onClickMenu');
        const me = this;
        const retail_menu_card = me.lookup('retail_menu_card');
        if (menu === 'pos_sell' && User.checkPosMode()) {
            menu = 'sell_pos'
        }
        retail_menu_card.setActiveItem(menu);
    }
});
