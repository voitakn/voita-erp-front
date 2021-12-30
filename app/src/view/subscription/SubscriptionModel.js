Ext.define('Erp.view.subscription.SubscriptionModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.subscription_vm',
    data: {
        subscription_form0_hide: false,
        pos_payment_method_hide: true,
        pos_payment_start_hide: false,
        pos_payment_card_hide: true,
        pos_payment_sepa_hide: true,
        pos_payment_process_hide: true,
        pos_payment_success_hide: true,
        pos_payment_subsdata_hide: true,
        subsData_pos_methods_hide: true,
        subsData_card_hide: true
    },
    stores: {
        invoice_list_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.SubsInvoice',
            autoLoad: false,
            autoSync: false,
            pageSize: 24,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.billing.subs_invoices,
                },
                extraParams: {
                    subscription_id: '{subsData.id}',
                }
            }
        }
    },
    formulas: {
        tariff_count_pos(get) {
            return User.data.place_ids.length || 1;
        },
        tariff_total_price: {
            bind: {
                bindTo: '{tariff_pos.price}',
                deep: true
            },
            get(val) {
                let countPl = User.data.place_ids.length || 1;
                if(val) {
                    return countPl * Number(val);
                }
                return 0.00;
            }
        }
    }
});
