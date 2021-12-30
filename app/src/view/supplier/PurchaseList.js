Ext.define('Erp.view.supplier.PurchaseList', {
	extend: 'Ext.grid.Grid',
	xtype: 'supplier_purchase_list',
	bind: {
		store: '{buy_list_supplier_store}',
	},
	listeners: {
		storechange: 'onStoreChange'
	},
	scrollable: 'y',
	columns: [
		{
			text: i18n.gettext('Number / Date'),
			flex: 1,
			tpl: `<div class="blue bolder">${i18n.gettext('Document')}: <a href="/#purchase_card/{id}"><b>{doc_number}</b></a></div>
				  <div>${i18n.gettext('Date')}: {doc_date}</div>`,
			cell: {
				encodeHtml: false,
			}
		},{
			text: i18n.gettext('Amount'),
			width: 180,
			align: 'right',
			tpl: `<div class="red bolder">{[i18n.gettext('Tax')]}: {tax_total:erpMoney}</div>
                  <div class="green-dark bolder">{[i18n.gettext('Sum')]}: {price_total:erpMoney}</div>`,
			cell: {
				align: 'right',
				encodeHtml: false,
			}
		},
	],
});