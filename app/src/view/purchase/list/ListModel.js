Ext.define('Erp.view.purchase.list.ListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.purchase_list_vm',
    data: {
        filter_year: Ext.Date.format(new Date(), 'Y'),
        filter_month: Ext.Date.format(new Date(), 'm'),
        filter_place_id: null,
        filter_supplier_id: null,
        paid_params: {
            paid: true
        }
    },
    stores: {
        buy_invoices: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.Invoice',
            autoLoad: false,
            autoSync: false,
            pageSize: 50,
            proxy: {
                type: 'erp_api',
                url: Api.inv.buy_list_month,
                extraParams: {
                    y_m: '{filter_year}-{filter_month}',
                    place_id: '{filter_place_id}',
                    supplier_id: '{filter_supplier_id}'
                }
            }
        },
        suppliers_store: {
            type: 'suppliersStore',
        }
    },
    formulas: {
        place_data(get) {
            return User.places();
        },
        years_data(get) {
            const startY = 2021;
            const lastY = Number(Ext.Date.format(new Date(), 'Y'));
            const years = [];
            if (lastY > startY) {
                for (let i=startY;i<=lastY;i++){
                    years.push({id: i});
                }
            } else {
                years.push({id: startY});
            }
            return years;
        },
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
        no_inv_buy_create(get) {
            return !User.checkAccess('inv.buy_create');
        },
        no_inv_buy_paid_save(get) {
            return !User.checkAccess('inv.buy_paid_save');
        },
    
    }
});