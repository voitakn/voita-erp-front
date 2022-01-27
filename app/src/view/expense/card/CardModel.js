Ext.define('Erp.view.expense.card.CardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.expense_card_vm',
    data: {
        show_expense: {},
        // paid_params: {
        //     paid: true
        // },
        // supplier: {}
    },
    // stores: {
    //     invoice_items_store: {
    //         extend: 'Erp.data.Store',
    //         model: 'Erp.model.InvoiceItemBuy',
    //         autoLoad: false,
    //         autoSync: false,
    //         proxy: {
    //             type: 'erp_api',
    //             url: Api.inv.buy_invoice_items,
    //             extraParams: {
    //                 invoice_id: '{show_expense.id}',
    //                 period: '{show_expense.period}'
    //             }
    //         }
    //     }
    // },
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
        // no_inv_buy_paid_save(get) {
        //     return !User.checkAccess('inv.buy_paid_save');
        // },
    }
});