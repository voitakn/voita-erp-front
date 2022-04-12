Ext.define('Erp.view.purchase.card.CardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.purchase_card_vm',
    data: {
        show_invoice: {},
        paid_params: {
            paid: true
        },
        supplier: {}
    },
    stores: {
        invoice_items_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.InvoiceItemBuy',
            autoLoad: false,
            autoSync: false,
            proxy: {
                type: 'erp_api',
                url: Api.inv.buy_invoice_items,
                extraParams: {
                    invoice_id: '{show_invoice.id}',
                    period: '{show_invoice.period}'
                }
            },
        },
        workers_store: {
            type: 'workersStore',
        },
        places_store: {
            type: 'placesStore',
        }

    },
    formulas: {
        invoice_pay: {
            bind: {
                bindTo: '{show_invoice}',
                deep: true
            },
            get(invoice){
                if(invoice && invoice.paid) {
                    if(invoice.paid_params.type === 'cash') {
                        return i18n.gettext('Cash');
                    }
                    return i18n.gettext('Bank');
                }
                return i18n.gettext('Unpaid');
            }
        },
        no_inv_buy_paid_save(get) {
            return !User.checkAccess('inv.buy_paid_save');
        },
    }
});