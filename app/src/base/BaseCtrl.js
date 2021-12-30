Ext.define('Erp.view.base.BaseCtrl', {
    extend: 'Ext.app.ViewController',
    onCompanyMenuClick(btn, event){
        this.redirectTo(btn.getValue());
    },
    setActiveMenu(item){
        const menu = this.getView().down('company_menu');
        if(menu) {
            menu.setActiveMenu(item);
        }
    }
});