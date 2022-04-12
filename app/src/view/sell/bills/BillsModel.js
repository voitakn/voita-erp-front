Ext.define('Erp.view.sell.bills.BillsModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.sell_bills_vm',
	data: {
		show_invoice: {},
		date_today: new Date(),
		filter_sell_date: null,
		filter_place_id: null
	},
	stores: {
		sell_invoices: {
			extend: 'Erp.data.Store',
			model: 'Erp.model.Invoice',
			autoLoad: false,
			autoSync: false,
			proxy: {
				type: 'erp_api',
				url: Api.inv.sell_list_date_user,
				extraParams: {
					sell_date: '{filter_sell_date}',
					place_id: '{filter_place_id}'
				}
			}
		},
		invoice_items_store: {
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
		}

	},
	formulas: {
        extra_sell_date(get) {
           //console.('extra_sell_date', get('filter_sell_date'));
            return get('filter_sell_date');
        },
        place_data(get) {
            return User.places();
        },
        no_inv_sell_retail_create(get) {
            return !User.checkAccess('inv.sell_retail_create');
        },
        no_inv_create_pos_sell(get) {
            return !User.checkAccess('inv.create-pos-sell');
        },

    }
});
