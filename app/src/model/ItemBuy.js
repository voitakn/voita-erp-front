Ext.define('Erp.model.ItemBuy', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'amount',  type: 'number'},
		{name: 'price',  type: 'number'},
		{name: 'title',  type: 'string'},
		{name: 'barcode',  type: 'string'},
		{name: 'vendor_code',  type: 'string'},
		{name: 'retail_id',  type: 'string'},
		{name: 'retail_price',  type: 'number'},
		{name: 'tax_rate',  type: 'number'},
		{name: 'price_total',  type: 'number',
			calculate(data){
				return data.price * data.amount;
			}
		}
	]
});
