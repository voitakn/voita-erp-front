Ext.define('Erp.view.sell.retail.RetailModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.sellretail',
	requires: [
		'Erp.model.ItemSell',
		'Erp.model.RetailProduceList'
	],
	data: {
		amount_data: null,
		price_data: null,
		prod_data: null,
		sell_data: {},
		pay_card: {
			pay_success: false
		},
		pay_cash: {
			price_total: 0.00,
			nominal: 0.00
		},
		hide_one_place: false,
		bill_tax_total: 0.00,
		bill_amount_total: 0.00,
		bill_price_total: 0.00,
		bill_sale_total: 0.00,
		filter: {
			catalog_id: null,
			search: null,
			search_barcode: null,
			place_id: null,
			only_amount: false
		},
		retail_type: true,
		quantity: 1.00,
		new_quantity: '',
		flow_digits: false,
		digits: 0
	},
	stores: {
		sell_items_store: {
			model: 'Erp.model.RetailSell',
			autoSync: true,
			proxy: {
				type: 'memory'
			},
			listeners: {
				datachanged: 'sellItemsChanged'
			}
		},
		select_produce_store: {
			extend: 'Erp.data.Store',
			model: 'Erp.model.RetailProduceList',
			autoLoad: false,
			autoSync: false,
			pageSize: 50,
			proxy: {
				type: 'erp_api',
				api: {
					read: Api.com.retail_produce_list
				},
				extraParams: {
					catalog_id: '{filter.catalog_id}',
					place_id: '{filter.place_id}',
					search: '{filter.search}',
					only_amount: '{filter.only_amount}',
				}
			}
		},
		select_by_barcode_produce_store: {
			extend: 'Erp.data.Store',
			model: 'Erp.model.RetailProduceList',
			autoLoad: false,
			autoSync: true,
			pageSize: 50,
			proxy: {
				type: 'erp_api',
				api: {
					read: Api.com.retail_produce_barcode
				},
				extraParams: {
					place_id: '{filter.place_id}',
					barcode: '{filter.barcode}',
				}
			},
			listeners: {
				datachanged: 'onChangeByBarcode'
			}

		},
	},
	formulas: {
		place_data(get) {
			return User.places();
		},
		price_currency: function(get){
			return Ext.String.format('{0}: <b>{1}</b> {2}',
				i18n.gettext('Price'),
				Ext.util.Format.number(get('price_data.price'), '0.000,00/i'),
				User.symbol()
			);
		},
		price_total: function(get){

			return Ext.String.format('<b>{0}</b>{1}',
				Ext.util.Format.number(get('price_data.price') * get('price_data.amount'), '0.000,00/i'),
				User.symbol()
			);
		},
		pay_price_total: function(get){
			return Ext.String.format('<b>{0}</b> {1}',
				Ext.util.Format.number(get('bill_price_total'), '0.000,00/i'),
				User.symbol()
			);
		},
		sell_market_place: function(get){
			const place_id = get('filter.place_id');
			const record = User.placesStore.getById(place_id);
			return record.get('title');
		},
		seller_full_name: function(get){
			return User.fullName();
			/*return Ext.String.format('{0}: <b>{1}</b>',
				i18n.gettext('Seller'),
				User.fullName()
			)*/
		}
	}
});
