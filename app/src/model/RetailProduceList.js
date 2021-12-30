Ext.define('Erp.model.RetailProduceList', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'barcode',  type: 'string'},
		{name: 'title',  type: 'string'},
		{name: 'price',  type: 'auto'},
		{name: 'params',  type: 'auto'},
		{name: 'tax_rate',  type: 'number'},
		{name: 'serv',  type: 'boolean'},
		{name: 'tax_value',  type: 'number',
			calculate(data){
				if(data.tax_rate > 1) {
					return Math.ceil((data.tax_rate - 1) * 100);
				}
				return 0.00;
			}
		},

	]
});
