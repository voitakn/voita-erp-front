Ext.define('Erp.view.prices_rules.PricesRulesModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.pricesrules_vm',
	requires: [
		'Erp.store.PricesRules'
	],
	data: {
		editCard: false,
		clickEdit: false,
		fullCard: {},
		rulesObj: {}
	},
	stores: {
		prices_rules_store: {
			extend: 'Erp.data.Store',
			model: 'Erp.model.PricesRules',
			autoLoad: true,
			// autoSync: true,
			pageSize: 25,
			proxy: {
				type: 'erp_api',
				api: {
					read: Api.price.cols_list
				},
			},
		},
		prices_defs_rules_store: {
			extend: 'Erp.data.Store',
			model: 'Erp.model.PricesRules',
			autoLoad: false,
			// autoSync: true,
			pageSize: 25,
			proxy: {
				type: 'erp_api',
				api: {
					read: Api.price.cols_defs
				},
			},

		},
	},
	formulas: {
		no_price_cols_list(get) {
			return !User.checkAccess('price.cols_list');
		},
		no_price_cols_save(get) {
			return !User.checkAccess('price.cols_save');
		},
		type_change(get) {
			let type = [
				{
					name: 'markup',
					value: 1
				},
				{
					name: 'markdown',
					value: -1
				},
			]
			return type;
		},
	}
});
