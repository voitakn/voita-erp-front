Ext.define('Erp.view.supplier.SupplierModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.supplier_vm',
	data: {
		newSupplier: {
			invite: true,
		},
		cardId: null,
		editCard: false,
		filter_search: ''
	},
	stores: {
		suppliers_store: {
			type: 'suppliersStore',
			proxy: {
				type: 'erp_api',
				api: {
					read: Api.com.supplier_list
				},
				extraParams: {
					search: '{filter_search}'
				}
			},
			listeners: {
				load: 'onLoadFirst'
			}
		},
		buy_list_supplier_store: {
			extend: 'Erp.data.Store',
			model: 'Erp.model.Invoice',
			autoLoad: false,
			proxy: {
				type: 'erp_api',
				url: Api.inv.buy_list_supplier,
				extraParams: {
					supplier_id: '{theCardView.id}'
				}
			},
		}
	},
	formulas: {
		no_com_supplier_save(get) {
			return !User.checkAccess('com.supplier_save');
		},
		no_com_supplier_list(get) {
			return !User.checkAccess('com.supplier_list');
		},
		no_items_purchase_produce_list(get) {
			return !User.checkAccess('items.purchase_produce_list');
		},
	}
});
