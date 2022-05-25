Ext.define('Erp.model.RetailSell', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'barcode',  type: 'string'},
		{name: 'title',  type: 'string'},
		{name: 'price',  type: 'auto'},
		{name: 'params',  type: 'auto'},
		{name: 'amount',  type: 'number'},
		{name: 'tax_rate',  type: 'number'},
		{name: 'serv',  type: 'boolean'},
		{name: 'item_price',  type: 'number',
			calculate(data){
				return data.price ? data.price.price : 0.00;
			}
		},
		{name: 'tax_value',  type: 'number',
			calculate(data){
				if(data.tax_rate > 1) {
					return Math.ceil((data.tax_rate - 1) * 100);
				}
				return 0.00;
			}
		},
		{name: 'price_total', type: 'number',
			calculate(data){
				return data.price ? Ext.Number.roundToPrecision((data.price.price * data.amount), 2) : 0.00;
			}
		},
		{name: 'tax_price', type: 'number',
			calculate(data){
				if(data.price && data.price.price > 0 && data.tax_rate > 0) {
					return data.price.price - (data.price.price / data.tax_rate);
				}
				return 0.00;
			}
		},
		{name: 'tax_total', type: 'number',
			calculate(data){
				let tax_pr = 0.00;
				if(data.price && data.price.price > 0 && data.tax_rate > 0) {
					tax_pr = data.price.price - (data.price.price / data.tax_rate);
				}
				return tax_pr * data.amount;
			}
		},
		{name: 'sale_total', type: 'number',
			calculate(data){
				return data.price ? data.price.sale * data.amount : 0.00;
			}
		}

	]
});