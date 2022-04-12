Ext.define('Erp.view.expense.ExpensesCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.expenses_ctrl',
    bindings: {
        onPlaceChange: '{filter.place_id}',
        reloadGrid: {
            month: '{filter.month}',
            year: '{filter.year}',
        },
        onShowExpense: '{theExpenseRow}'

    },
    is_rendered: false,
    afterViewShow() {
        const me = this;
        me.setActiveMenu('expenses');
    },
    onViewRender() {
        const me = this;
        const vm = me.getViewModel();
        // const placeField = this.lookup('expenses_place_combobox');
        // if (placeField) {
        //     placeField.setStore(User.placesStore);
        // }
    },
    onViewShow() {
        const me = this;
        const vm = me.getViewModel();
        if (!this.is_rendered) {
            this.is_rendered = true;
        } else {
            this.reloadGrid();
        }

    },
    onPlaceChange() {
        this.reloadGrid();
    },
    reloadGrid() {
        const me = this;
        const vm = this.getViewModel();
        const period = vm.get('filter.year') + '-' + vm.get('filter.month');
        vm.set('filter.period', period);
        const store = vm.getStore('expense_list_store');
        if (store) {
            store.load();
        }
    },
    addNewExpense(btn) {
        const me = this;
        const vm = me.getViewModel();
        const tooltip = me.lookup('expense_new');
        const field = tooltip.down('textfield');
        const form = tooltip.down('formpanel');
        // const placeField = tooltip.down('combobox');
        // if (placeField) {
        //     placeField.setStore(User.placesStore);
        // }
        tooltip.setTarget(btn);
        tooltip.show();
        if (field) {
            field.focus();
        }
        form.validate();
    },
    onCancelNew(btn) {
        const me = this;
        const vm = this.getViewModel();
        vm.set('newExpense', {invite: true});
        btn.up('tooltip').hide();
    },

    onSaveNew(btn) {
        const me = this;
        const vm = this.getViewModel();
        const newExpense = vm.get('newExpense');
        const expenseNewTooltip = me.lookup('expense_new');
        const form = expenseNewTooltip.down('formpanel');
        const formattedDate = form.down('datefield').getFormattedValue('Y-m-d');
        const store = vm.getStore('expense_list_store');
        const newExpenseSave = Ext.create('Erp.model.Expenses', newExpense);
        if (form.validate() && newExpenseSave.isValid()) {
            newExpenseSave.set('doc_date', formattedDate);
            newExpenseSave.save({
                callback(record, operation, success) {
                    if (success) {
                        expenseNewTooltip.hide();
                        store.load();
                    }
                }
            });
        }

    },
    onEditExpensePen(grid, row) {
        const me = this;
        const vm = me.getViewModel();
        const editExpense = me.lookup('expense_edit');
        const record = row.record;
        editExpense.setTarget(row.event.target);
        // const placeField = editExpense.down('combobox');
        // if (placeField) {
        //     placeField.setStore(User.placesStore);
        //     vm.set('theCardEdit.place_id', record.data.place_id);
        // }

        editExpense.show();
        vm.set('theCardEdit', record);
        record.beginEdit();
    },
    onCancelEdit(btn) {
        const me = this;
        const vm = this.getViewModel();
        const theCardEdit = vm.get('theCardEdit');
        theCardEdit.cancelEdit();
        vm.set('theCardEdit', {});

    },
    onCancel(btn) {
        const me = this;
        const vm = this.getViewModel();
        const expenseEdit = me.lookup('expense_edit');
        expenseEdit.hide();
    },
    onSaveEdit(btn) {
        const me = this;
        const vm = me.getViewModel();
        const expenseEdit = me.lookup('expense_edit');
        const form = expenseEdit.down('formpanel');
        const theCardEdit = vm.get('theCardEdit');
        if (theCardEdit.modified) {
            if (form.isValid()) {
                theCardEdit.save({
                    callback(record, operation, success) {
                        if (success) {
                            expenseEdit.hide();
                        }
                    }
                });
            }
        }
    },
    onShowExpense(row) {
        console.log('onShowExpense', row);
        const me = this;
        const vm = me.getViewModel();
        const expense_view = me.getView().lookup('expense_view');
        vm.set('theCardView', row.data);

        expense_view.show();
    },
    onShowExpense1() {
        console.log('onShowExpense1', arguments);
    },
    onCancelView(btn) {
        btn.up('dialog').hide();
    }
});
