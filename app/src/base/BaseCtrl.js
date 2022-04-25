Ext.define('Erp.view.base.BaseCtrl', {
    extend: 'Ext.app.ViewController',
    onCompanyMenuClick(btn, event) {
        this.redirectTo(btn.getValue());
    },
    setActiveMenu(item) {
        const menu = this.getView().down('company_menu');
        if (menu) {
            menu.setActiveMenu(item);
        }
    },
    onRetailMenuClick(btn, event) {
        const me = this;
        let menu = btn.getValue();
        if (menu === 'pos' && User.checkPosMode()) {
            menu = 'sell_pos'
        }
        if (menu === 'pos' && !User.checkPosMode()) {
            menu = 'pos_sell'
        }
        this.redirectTo(menu);
    },
    setActiveRetailMenu(item) {
        const me = this;
        const vm = me.getViewModel();
        vm.set('active_retail_menu', item);
    },
    onB2bMenuClick(btn) {
        const me = this;
        let menu = btn.getValue();
        this.redirectTo(menu);
    },
    setActiveB2bMenu(item) {
        const me = this;
        const vm = me.getViewModel();
        console.log('setActiveB2bMenu', vm);
        if(vm) {
            vm.set('active_b2b_menu', item);
        }
    },
});
