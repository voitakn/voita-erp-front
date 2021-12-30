Ext.define('Erp.view.sell.card.Invoice', {
	extend: 'Ext.grid.Grid',
	xtype: 'sell_card_invoice',
	reference: 'sell_card_invoice',
	autoSize: true,
	items: [
		{
			xtype: 'head1',
			items: [
				{
					xtype: 'label',
					cls: 'title',
					html: i18n.gettext('Sell card')
				},
				{
					xtype: 'button',
					margin: '0 15 0 20',
					text: i18n.gettext('Back'),
					iconCls: 'x-fa fa-arrow-left',
					handler: 'toBack',
				},{
					xtype: 'button',
					margin: '0 15 0 0',
					text: i18n.gettext('Return selling'),
					iconCls: 'x-fas fa-undo red',
					handler: 'onReturnInvoice',
					hidden: true,
					bind: {
						hidden: '{show_invoice.revert}'
					}
				},{
					xtype: 'label',
					padding: '0 15',
					bind: {
						html: '{paid_status}',
						cls: '{paid_status_cls}'
					}

				},{
					xtype: 'container',
					flex: 1
				}
			]
		},
		{
			xtype: 'container',
			docked: 'top',
			cls: 'border-bottom',
			layout: {
				type: 'hbox',
			},
			defaults: {
				xtype: 'container',
				minWidth: 250,
				margin: '5 0',
				flex: 1,
				layout: {
					type: 'vbox',
					pack: 'start'
				},
				defaults: {
					xtype: 'container',
					margin: '3 0',
					layout: {
						type: 'hbox'
					},
					flex: 1,
				}
			},
			items: [
				{
					items: [
						{
							items: [
								{
									xtype: 'label',
									width: 130,
									html: `${i18n.gettext('Document')}:`,
								},{
									xtype: 'label',
									flex: 1,
									cls: 'bolder',
									bind: {
										html: `FR{show_invoice.doc_number}`,
									}
								}
							]
						},{
							items: [
								{
									xtype: 'label',
									width: 130,
									html: `${i18n.gettext('Date')}:`,
								},{
									xtype: 'label',
									flex: 1,
									cls: 'bolder',
									bind: {
										html: `{show_invoice.date_create:date("Y-m-d H:i:s")}`,
									}
								}
							]
						},{
							items: [
								{
									xtype: 'label',
									width: 130,
									html: `${i18n.gettext('Seller')}:`,
								},{
									xtype: 'label',
									flex: 1,
									cls: 'bolder',
									bind: {
										html: '{show_invoice.user_login}',
									}
								}
							]
						},{
							items: [
								{
									xtype: 'label',
									width: 130,
									html: `${i18n.gettext('Point of sale')}:`,
								},{
									xtype: 'label',
									flex: 1,
									cls: 'bolder',
									bind: {
										html: `{show_invoice.place_title}`,
									}
								}
							]
						},{
							items: [
								{
									xtype: 'label',
									width: 130,
									html: `${i18n.gettext('Payment method')}:`,
								},{
									xtype: 'label',
									flex: 1,
									cls: 'bolder',
									bind: {
										html: `{show_invoice.pay_type:payType}`,
									}
								}
							]
						},
						{
							items: [
								{
									xtype: 'label',
									width: 130,
									html: `${i18n.gettext('Payment number')}:`,
								},{
									xtype: 'label',
									flex: 1,
									cls: 'bolder',
									bind: {
										html: `{show_invoice.pay_params.pay_number}`,
									}
								}
							]
						}
					]
				},
				{
					items: [
						{
							items: [
								{
									xtype: 'label',
									cls: 'text-right bolder',
									flex: 1,
									html: `${i18n.gettext('Quantity')}:`,
								},{
									xtype: 'label',
									width: 120,
									cls: 'size-16 bolder text-right',
									bind: {
										html: `{show_invoice.amount_total}`,
									}
								}
							]
						},{
							items: [
								{
									xtype: 'label',
									cls: 'text-right bolder red',
									flex: 1,
									html: `${i18n.gettext('Tax amount')}:`,
								},{
									xtype: 'label',
									width: 120,
									cls: 'size-16 bolder text-right red',
									bind: {
										html: `{show_invoice.tax_total:erpMoney}`,
									}
								}
							]
						},{
							items: [
								{
									xtype: 'label',
									cls: 'text-right bolder green-dark',
									flex: 1,
									html: `${i18n.gettext('Discount')}:`,
								},{
									xtype: 'label',
									width: 120,
									cls: 'size-16 bolder text-right green-dark',
									bind: {
										html: `{show_invoice.sale_total:erpMoney}`,
									}
								}
							]
						},{
							items: [
								{
									xtype: 'label',
									cls: 'text-right bolder',
									flex: 1,
									html: `${i18n.gettext('Total without tax')}:`,
								},{
									xtype: 'label',
									width: 120,
									cls: 'size-16 bolder text-right',
									bind: {
										html: `{(show_invoice.price_total - show_invoice.tax_total):erpMoney}`,
									}
								}
							]
						},{
							items: [
								{
									xtype: 'label',
									cls: 'size-16 text-right bolder blue',
									flex: 1,
									html: `${i18n.gettext('Total amount')}:`,
								},{
									xtype: 'label',
									width: 120,
									cls: 'size-18 bolder text-right blue',
									bind: {
										html: `{show_invoice.price_total:erpMoney}`,
									}
								}
							]
						}
					]
				}
			]
		}
	]
});