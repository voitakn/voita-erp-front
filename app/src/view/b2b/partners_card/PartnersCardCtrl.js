Ext.define('Erp.view.partners_card.PartnersCardCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.partners_card_ctrl',
    bindings: {
        onCardId: '{cardId}',
    },
    onViewShow() {
    },
    onCardId(onCardId) {
        console.log('onCardId', onCardId);
        const vm = this.getViewModel();
        if (onCardId.length < 36) {
            Ext.util.History.back();
            //console.log('load history');
        }
        if (onCardId && onCardId.length === 36) {
            // this.loadInvoice(onCardId);
            console.log('load expense', onCardId);
        }
    },
    toBack(btn) {
        Ext.util.History.back();
    },

});
