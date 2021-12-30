Ext.define('Erp.model.InvoiceItemBuy', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'period',  type: 'string'},
		{name: 'amount',  type: 'number'},
		{name: 'price',  type: 'number'},
		{name: 'price_total',  type: 'number'},
		{name: 'produce_id',  type: 'string'},
		{name: 'invoice_id',  type: 'string'},
		{name: 'item_params',  type: 'auto'},
		{name: 'last',  type: 'bool'},
		{name: 'tax_value',  type: 'number',
			calculate(data){
				if(data.item_params && data.item_params.tax_rate && data.item_params.tax_rate > 0) {
					return Math.ceil((data.item_params.tax_rate - 1) * 100);
				}
				return 0.00;
			}
		},
	]
});