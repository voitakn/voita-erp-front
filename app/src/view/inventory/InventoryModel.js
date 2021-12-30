Ext.define('Erp.view.inventory.InventoryModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.inventory_vm',
		data: {
		filter_search: '',
		filter_catalog_id: null,
		filter_place_id: null,
		not_invent: false,
	},
	stores: {
		select_produce_store: {
			extend: 'Erp.data.Store',
			//extend: 'Ext.virtual.Store',
			model: 'Erp.model.Inventory',
			autoLoad: false,
			autoSync: false,
			pageSize: 25,
			proxy: {
				type: 'erp_api',
				api: {
					read: Api.inv.invent_by_place,
				},
				extraParams: {
					catalog_id: '{filter_catalog_id}',
					place_id: '{filter_place_id}',
					search: '{filter_search}',
					not_invent: '{not_invent}'
				}
			}
		}
	},
	formulas: {
		no_invent_prod(get){
			return !User.checkAccess('inv.invent_prod');
		},
	},
});
