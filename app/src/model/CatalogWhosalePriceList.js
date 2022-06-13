Ext.define('Erp.model.CatalogWhosalePriceList', {
	extend: 'Erp.model.Base',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'markup', type: 'number'},
		{name: 'parent_id',  type: 'string'},
		{name: 'title',  type: 'string'},
		{name: 'price',  type: 'number'},
		{name: 'percent',  type: 'number'},
		{name: 'type_change',  type: 'number'},
		{name: 'cols_active',  type: 'boolean'},
		{name: 'fmt_price',  type: 'string',
			calculate(data){
				return Ext.util.Format.erpMoney(data.price || 0.00);
			}
		},
		{name: 'fmt_percent',  type: 'string',
			calculate(data){
				return data.percent + '%' || '';
			}
		},
	]
});
