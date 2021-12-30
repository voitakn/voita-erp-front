Ext.define('Erp.model.RetailByPlaces', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'place_id',  type: 'string'},
		{name: 'cols_id',  type: 'string'},
		{name: 'produce_id',  type: 'string'},
		{name: 'customer_id',  type: 'string'},
		{name: 'price',  type: 'number'},
		{name: 'price_base',  type: 'number'},
		{name: 'sale',  type: 'number'},
		{name: 'sale_percent',  type: 'number'},
		{name: 'active',  type: 'boolean', default: false},
		{
			name: 'place_data',
			calculate(data){
				return User.placesObj[data.place_id] || {params: {}};
			}
		}
	],
	proxy: {
		type: 'erp_api',
		api: {
			update: Api.price.retail_save
		}
	}
});