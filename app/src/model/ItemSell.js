Ext.define('Erp.model.ItemSell', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'price_id',  type: 'string'},
		{name: 'amount',  type: 'number'},
		{name: 'price',  type: 'number'},
		{name: 'title',  type: 'string'},
		{name: 'barcode',  type: 'string'},
		{name: 'tax_rate',  type: 'number'},
		{name: 'tax_value',  type: 'number',
			calculate(data){
				if(data.tax_rate > 0) {
					return Math.ceil((data.tax_rate - 1) * 100);
				}
				return 0.00;
			}
		},
		{name: 'price_total',  type: 'number',
			calculate(data){
				return data.price * data.amount;
			}
		},
		{name: 'tax_price',  type: 'number',
			calculate(data){
				if(data.price > 0 && data.tax_rate > 0) {
					return data.price - (data.price / data.tax_rate);
				}
				return 0.00;
			}
		},
		{name: 'tax_total',  type: 'number',
			calculate(data){
				let tax_pr = 0.00;
				if(data.price > 0 && data.tax_rate > 0) {
					tax_pr = data.price - (data.price / data.tax_rate);
				}
				return tax_pr * data.amount;
			}
		},
	]
});
