Ext.define('Erp.model.MarketProduceList', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'amount', type: 'number'},
		{name: 'barcode',  type: 'string'},
		{name: 'title',  type: 'string'},
		{name: 'prices',  type: 'auto'},
		{name: 'params',  type: 'auto'},
		{name: 'tax_rate',  type: 'number'},
		{name: 'serv',  type: 'boolean'},
		{name: 'fmt_price',  type: 'string',
			calculate(data){
				return Ext.util.Format.erpMoney(data.prices.price || 0.00);
			}
		},
		{name: 'fmt_retail',  type: 'string',
			calculate(data){
				return Ext.util.Format.erpMoney(data.prices.retail || 0.00);
			}
		},
	]
});
