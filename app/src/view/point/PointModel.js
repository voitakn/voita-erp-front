Ext.define('Erp.view.point.PointModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.point_vm',
	requires: [
		'Erp.store.Places',
		'Erp.model.IdName'
	],
	data: {
		newPlace: {
			params: {}
		},
		edit_card: false
	},
	stores: {
		checkout_store: {
			extend: 'Erp.data.Store',
			model: 'Erp.model.IdName',
			data: [],
			proxy: {
				type: 'memory',
			}
		}
	},
	formulas: {
		no_com_place_save(get) {
			return !User.checkAccess('com.place_save');
		},
		
	}
});
