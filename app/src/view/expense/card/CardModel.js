Ext.define('Erp.view.expense.card.CardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.expense_card_vm',
    data: {
        show_expense: {},
    },
    formulas: {
        expense_paid: {
            bind: {
                bindTo: '{show_expense}',
                // deep: true
            },
            get(expense) {
                if (expense && expense.paid) {
                    return i18n.gettext('Paid');
                }
                return i18n.gettext('Unpaid');

            }
        },
        expense_tax: {
            bind: {
                bindTo: '{show_expense}',
                // deep: true
            },
            get(expense) {
                if (expense && expense.tax_refund) {
                    return i18n.gettext('Yes');
                }
                return i18n.gettext('No');

            }
        },
    }
});