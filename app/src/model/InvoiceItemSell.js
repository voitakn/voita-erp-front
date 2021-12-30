Ext.define('Erp.model.InvoiceItemSell', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'period',  type: 'string'},
		{name: 'tax_rate',  type: 'number'},
		{name: 'tax_total',  type: 'number'},
		{name: 'amount',  type: 'number'},
		{name: 'price',  type: 'number'},
		{name: 'price_total',  type: 'number'},
		{name: 'produce_id',  type: 'string'},
		{name: 'price_id',  type: 'string'},
		{name: 'invoice_id',  type: 'string'},
		{name: 'item_params',  type: 'auto'},
		{name: 'tax_value',  type: 'number',
			calculate(data){
				if(data.tax_rate > 0) {
					return Math.ceil((data.tax_rate - 1) * 100);
				}
				return 0.00;
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
		{name: 'price_no_tax',  type: 'number',
			calculate(data){
				if(data.tax_rate > 0) {
					return data.price / data.tax_rate;
				}
				return data.price;
			}
		},
		{name: 'total_no_tax',  type: 'number',
			calculate(data){
				if(data.tax_rate > 0) {
					return data.price_total / data.tax_rate;
				}
				return data.price_total;
			}
		}
	]
});