Ext.define('Erp.view.place.PlaceModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.places_vm',
	requires: [
		'Erp.store.Places',
		'Erp.model.IdName'
	],
	data: {
		newPlace: {
			params: {}
		},
		newCheckouts: {},
		edit_card: false,
	},
	stores: {
		places_store: {
			type: 'placesStore'
		},
		checkout_store: {
			extend: 'Erp.data.Store',
			autoSync: true,
			model: 'Erp.model.IdName',
			data: [],
			proxy: {
				type: 'memory',
			}
		}
	},
	formulas: {
		no_com_place_list_all(get) {
			return !User.checkAccess('com.place_list_all');
		},
		no_com_place_save(get) {
			return !User.checkAccess('com.place_save');
		},
		no_com_worker_list(get) {
			return !User.checkAccess('com.worker_list');
		},
		no_inv_sell_card_by_id(get) {
			return !User.checkAccess('inv.sell_card_by_id');
		},
		
	}
});
