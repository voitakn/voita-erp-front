Ext.define('Erp.view.partners_catalog.PartnersCatalogCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.partners_catalog_ctrl',
    bindings: {
        onClickMenu: '{active_partners_menu}',
    },
    onViewShow() {
        const me = this;

        me.setActiveB2bMenu('partners_catalog');

    },
});
