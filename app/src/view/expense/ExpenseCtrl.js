Ext.define('Erp.view.expense.ExpenseCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.expense_ctrl',
    routes: {
        'expense': { action: 'onCardId' },
    },
    bindings: {
        onCardId: '{cardId}',
        onTheCard: '{theCard}'
    },
    afterViewShow() {
        const me = this;
        me.setActiveMenu('expense');
    },
    onViewRender() {
        const me = this;
        const vm = me.getViewModel();
        this.viewMicro();
       //console.('onViewRender', vm.get('cardId'));
    },
    onViewShow() {
        this.viewMicro();
    },
    viewMicro() {
        const me = this;
        const vm = me.getViewModel();
        const winSize = Ext.Viewport.getSize();
        const cardId = vm.get('cardId');
        if(!winSize || winSize.width < 1300) {
            vm.set('micro', true);
            if(cardId && cardId.length > 0) {
                me.lookup('expense_card').setActiveItem(0);
            } else {
                me.lookup('expense_card').setActiveItem(1);
            }
        } else {
            vm.set('micro', false);
        }
    },
    onTheCard(theCard){
        if(theCard && theCard.isModel) {
            this.redirectTo('expense/'+theCard.get('id'));
        }
    },
    onCardId(cardId) {
       //console.('onCardId', cardId);
        const me = this;
        const vm = me.getViewModel();
        const micro = vm.get('micro');
        const expense_card = me.lookup('expense_card');
        if(cardId && cardId.length > 0) {
            const store = vm.getStore('expense_store');
            const record = store.getById(cardId);
            if(record) {
                if(micro === true) {
                    expense_card.setActiveItem(0);
                    let grid = me.lookup('expense_card_grid');
                    grid.getSelectable().select(record);
                } else {
                    let grid = me.lookup('expense_hbox_grid');
                    grid.getSelectable().select(record);
                }
            }
        } else {
            if(micro === true) {
                expense_card.setActiveItem(1);
                let grid = me.lookup('expense_card_grid');
                grid.getSelectable().deselectAll();
            } else {
                let grid = me.lookup('expense_hbox_grid');
                grid.getSelectable().deselectAll();
            }
        }
    },
    toList(btn) {
        const me = this;
        const vm = me.getViewModel();
        const cardId = vm.get('cardId');
        if(cardId && cardId.length > 0) {
            this.redirectTo('expense');
        } else {
            vm.set('cardId', null);
            let list = me.lookup('expense_card_grid');
            list.getSelectable().deselectAll();
        }
    },
    addNewExpense(btn) {
        const me = this;
        const tooltip = me.lookup('expense_new');
        const field = tooltip.down('textfield');
        const form = tooltip.down('formpanel');
        tooltip.setTarget(btn);
        tooltip.show();
        if (field) {
            field.focus();
        }
        form.validate();
    }
});
