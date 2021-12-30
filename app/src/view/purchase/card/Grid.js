Ext.define('Erp.view.purchase.list.Invoice', {
	extend: 'Ext.grid.Grid',
	xtype: 'purchase_card_grid',
	reference: 'purchase_card_grid',
	autoSize: true,
	bind: {
		store: '{invoice_items_store}'
	},
	columns: [
		{
			text: i18n.gettext('Title'),
			flex: 1,
			menu: false,
			minWidth: 200,
			tpl: `<a href="/#produce/{produce_id}"><b data-qtip="${i18n.gettext('Go to the product card')}">{item_params.title}</b></a> <i>{item_params.barcode}</i>
                    <div>${i18n.gettext('Tax rate')}: {tax_value}%</div>`,
			cell: {
				encodeHtml: false,
			}
		}, {
			text: i18n.gettext('Per item'),
			width: 160,
			align: 'right',
			cell: {
				align: 'right',
				encodeHtml: false,
			},
			tpl: `<div>{[i18n.gettext('Qty')]}: {amount:number("0.00")}</div>
                  <div class="blue bolder">{[i18n.gettext('Price')]}: {price:erpMoney}</div>`
		}, {
			text: i18n.gettext('Amount'),
			width: 180,
			align: 'right',
			tpl: `<div class="red">{[i18n.gettext('Tax')]}: {item_params.tax_total:erpMoney}</div>
                  <div class="blue bolder">{[i18n.gettext('Total')]}: {price_total:erpMoney}</div>`,
			cell: {
				align: 'right',
				encodeHtml: false,
			}
		}
	]
});