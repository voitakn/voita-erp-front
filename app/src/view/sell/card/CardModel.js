Ext.define('Erp.view.sell.card.CardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sell_card_vm',
    data: {
        show_invoice: {},
        paid_params: {
            paid: true
        },
        paid_status_cls: 'status-paid'
    },
    stores: {
        sell_items_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.InvoiceItemSell',
            autoLoad: false,
            autoSync: false,
            proxy: {
                type: 'erp_api',
                url: Api.inv.sell_invoice_items,
                extraParams: {
                    invoice_id: '{show_invoice.id}',
                    period: '{show_invoice.period}'
                }
            }
        },
        workers_store: {
            type: 'workersStore',
        },
        places_store: {
            type: 'placesStore',
        },
    },
    formulas: {
        paid_status: {
            bind: {
                bindTo: '{show_invoice}',
                deep: true
            },
            get(invoice){
                if(invoice) {
                    if(!invoice.paid) {
                        if(invoice.revert) {
                            this.set('paid_status_cls', 'status-failed');
                            return `${i18n.gettext('Status')}: ${i18n.gettext('Returned')}`;
                        } else {
                            this.set('paid_status_cls', 'status-progress');
                            return `${i18n.gettext('Status')}: ${i18n.gettext('On returning')}`;
                        }
                    }
                    this.set('paid_status_cls', 'status-confirm');
                    return `${i18n.gettext('Status')}: ${i18n.gettext('Paid')}`;
                }
                this.set('paid_status_cls', 'status-returned');
                return `${i18n.gettext('Status')}: ${i18n.gettext('Returned')}`;
            }
        }
    }
});