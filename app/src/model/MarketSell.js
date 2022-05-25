Ext.define('Erp.model.MarketSell', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'barcode',  type: 'string'},
		{name: 'title',  type: 'string'},
		{name: 'prices',  type: 'auto'},
		{name: 'amount',  type: 'number'},
		{name: 'tax_rate',  type: 'number'},
		{name: 'serv',  type: 'boolean'},
		{name: 'price_total', type: 'number',
			calculate(data){
				return data.prices.price ? Ext.Number.roundToPrecision((data.prices.price * data.amount), 2) : 0.00;
			}
		},

	]
});