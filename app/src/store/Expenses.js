Ext.define('Erp.store.Expenses', {
	extend: 'Erp.data.Store',
	alias: 'store.expenses_chart',
	storeId: 'expenses_chart',
	autoLoad: false,
	fields: [
		{name: 'date_c',
			calculate: function(data) {
				let txt = '';
				txt = new Date(data.date_create);
				return txt;
			}
		},
		'date_create',
		'place_1',
		'place_2',
		'place_3'
	],
	constructor: function(config) {
		config = config || {};
		config.data = [
			{ date_create: '2021-03-01', place_1: 1, place_2: 10, place_3: 10},
			{ date_create: '2021-03-02', place_1: 2, place_2: 9, place_3: 1},
			{ date_create: '2021-03-03', place_1: 3, place_2: 8, place_3: 3},
			{ date_create: '2021-03-04', place_1: 4, place_2: 7, place_3: 5},
			{ date_create: '2021-03-05', place_1: 5, place_2: 6, place_3: 8},
			{ date_create: '2021-03-06', place_1: 6, place_2: 5, place_3: 1},
			{ date_create: '2021-03-07', place_1: 7, place_2: 5, place_3: 7},
			{ date_create: '2021-03-08', place_1: 8, place_2: 4, place_3: 7},
			{ date_create: '2021-03-09', place_1: 9, place_2: 7, place_3: 6},
			{ date_create: '2021-03-11', place_1: 10, place_2: 10, place_3: 9},
			{ date_create: '2021-03-12', place_1: 9, place_2: 7, place_3: 5},
			{ date_create: '2021-03-13', place_1: 8, place_2: 4, place_3: 2},
			{ date_create: '2021-03-14', place_1: 7, place_2: 5, place_3: 7},
			{ date_create: '2021-03-15', place_1: 6, place_2: 6, place_3: 1},
			{ date_create: '2021-03-16', place_1: 5, place_2: 7, place_3: 8},
			{ date_create: '2021-03-17', place_1: 4, place_2: 8, place_3: 5},
			{ date_create: '2021-03-18', place_1: 3, place_2: 9, place_3: 3},
			{ date_create: '2021-03-19', place_1: 2, place_2: 9, place_3: 1},
			{ date_create: '2021-03-20', place_1: 1, place_2: 2, place_3: 2},
			{ date_create: '2021-03-21', place_1: 1, place_2: 9, place_3: 1},
			{ date_create: '2021-03-22', place_1: 2, place_2: 9, place_3: 3},
			{ date_create: '2021-03-23', place_1: 3, place_2: 8, place_3: 5},
			{ date_create: '2021-03-24', place_1: 4, place_2: 7, place_3: 8},
			{ date_create: '2021-03-25', place_1: 5, place_2: 6, place_3: 1},
			{ date_create: '2021-03-26', place_1: 6, place_2: 5, place_3: 7},
			{ date_create: '2021-03-27', place_1: 7, place_2: 3, place_3: 2},
			{ date_create: '2021-03-28', place_1: 8, place_2: 1, place_3: 5},
			{ date_create: '2021-03-29', place_1: 9, place_2: 1, place_3: 5},
			{ date_create: '2021-03-30', place_1: 9, place_2: 1, place_3: 6},
			{ date_create: '2021-03-31', place_1: 8, place_2: 3, place_3: 7},
			{ date_create: '2021-04-01', place_1: 7, place_2: 1, place_3: 1},
			{ date_create: '2021-04-02', place_1: 6, place_2: 9, place_3: 1},
			{ date_create: '2021-04-03', place_1: 5, place_2: 9, place_3: 3},
			{ date_create: '2021-04-04', place_1: 4, place_2: 8, place_3: 5},
			{ date_create: '2021-04-05', place_1: 3, place_2: 7, place_3: 8},
			{ date_create: '2021-04-06', place_1: 2, place_2: 6, place_3: 1},
			{ date_create: '2021-04-07', place_1: 1, place_2: 5, place_3: 7},
			{ date_create: '2021-04-08', place_1: 1, place_2: 3, place_3: 7},
			{ date_create: '2021-04-09', place_1: 2, place_2: 1, place_3: 6},
			{ date_create: '2021-04-11', place_1: 3, place_2: 1, place_3: 5},
			{ date_create: '2021-04-12', place_1: 4, place_2: 1, place_3: 5},
			{ date_create: '2021-04-13', place_1: 5, place_2: 3, place_3: 2},
			{ date_create: '2021-04-14', place_1: 6, place_2: 5, place_3: 7},
			{ date_create: '2021-04-15', place_1: 7, place_2: 6, place_3: 1},
			{ date_create: '2021-04-16', place_1: 8, place_2: 7, place_3: 8},
			{ date_create: '2021-04-17', place_1: 9, place_2: 8, place_3: 5},
			{ date_create: '2021-04-18', place_1: 10, place_2: 9, place_3: 3},
			{ date_create: '2021-04-19', place_1: 11, place_2: 9, place_3: 1},
			{ date_create: '2021-04-20', place_1: 11, place_2: 2, place_3: 2},
			{ date_create: '2021-04-21', place_1: 10, place_2: 9, place_3: 1},
			{ date_create: '2021-04-22', place_1: 9, place_2: 9, place_3: 3},
			{ date_create: '2021-04-23', place_1: 8, place_2: 8, place_3: 5},
			{ date_create: '2021-04-24', place_1: 7, place_2: 7, place_3: 8},
			{ date_create: '2021-04-25', place_1: 6, place_2: 6, place_3: 1},
			{ date_create: '2021-04-26', place_1: 5, place_2: 5, place_3: 7},
			{ date_create: '2021-04-27', place_1: 4, place_2: 3, place_3: 2},
			{ date_create: '2021-04-28', place_1: 3, place_2: 1, place_3: 5},
			{ date_create: '2021-04-29', place_1: 2, place_2: 1, place_3: 5},
			{ date_create: '2021-04-30', place_1: 1, place_2: 1, place_3: 6},
		];
		this.callParent([config]);
	},
	proxy: {
		type: 'memory'
	}
	
	
	
	
	
	// fields: [
	// 	{name: 'date_create', type: 'date'},
	// 	{name: 'place-1', type: 'number'},
	// 	{name: 'place-2', type: 'number'},
	// 	{name: 'place-3', type: 'number'},
	// ],
	// proxy: {
	// 	type: 'erp_api',
	// 	url: Api.inv.buy_list_month,
	// 	extraParams: {
	// 		y_m: '2021-03',
	// 		place_id: '2a3b0415-f2eb-40ed-a50f-34de72611d7b',
	// 		supplier_id: null
	// 	}
	// }
});
