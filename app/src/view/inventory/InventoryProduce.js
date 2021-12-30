Ext.define('Erp.view.catalog.InventoryGrid', {
	extend: 'Ext.grid.Grid',
	xtype: 'inventory_produce',
	scrollable: 'y',
	reserveScrollbar: true,
	autoSize: true,
	bind: {
		store: '{select_produce_store}'
	},
	plugins: {
		gridpagingtoolbar: true
	},
	items: [
		{
			xtype: 'head2',
			items: [
				{
					xtype: 'combobox',
					reference: 'inventory_place_combobox',
					autoSelect: true,
					forceSelection: true,
					required: true,
					editable: false,
					queryMode: 'local',
					width: 200,
					label: i18n.gettext('Point of sale'),
					valueField: 'id',
					displayField: 'title',
					store: {},
					bind: {
						value: '{filter_place_id}'
					}
				},
				{
					xtype: 'togglefield',
					margin: '0 0 0 15',
					width: 200,
					label: `<b>${i18n.gettext('Only not inventory')}</b>`,
					boxLabel: i18n.gettext('Switch on'),
					bind: {
						value: '{not_invent}'
					}
				},
				{
					xtype: 'searchfield',
					margin: '0 0 0 15',
					label: i18n.gettext('By name or barcode'),
					flex: 1,
					placeholder: i18n.gettext('By name and barcode (at least 3 characters)'),
					bind: {
						value: '{filter_search}'
					}
				}
			]
		}
	],
	columns: [
		{
			text: i18n.gettext('Product name'),
			flex: 1,
			tpl: `<a href="/#produce/{id}"><b>{title}</b></a><div>{barcode}</div>`,
			cell: {
				height:50,
				encodeHtml: false}
		},
		{
			text: i18n.gettext('Quantity'),
			minWidth: 90,
			cell: {
				tpl: '<b class="green-dark">{amount_last}</b>',
				align: 'center',
				encodeHtml: false,
			},
		},
		{
			text: i18n.gettext('Actions'),
			minWidth: 70,
			menu: false,
			hidden: true,
			bind: {
				hidden: '{no_invent_prod}'
			},
			cell: {
				tools: {
					plus: {
						margin: '10',
						//iconCls: 'x-fas fa-check green-dark',
						iconCls: 'erp-icon verified green-dark',
						tooltip: i18n.gettext('Confirm quantity'),
						handler: 'onCheckQuantity',
					},
					edit: {
						margin: '10',
						iconCls: 'erp-icon edit-note blue',
						tooltip: i18n.gettext('Correct quantity'),
						handler: 'onEditQuantity',
					}
				}
			}
		},
		{
			text: i18n.gettext('Previous quantity'),
			tpl: `<div><b class="blue">{amount_last:number("0.00")}</b> ${i18n.gettext('qty.')} | {past_invent.date_create:date('Y-m-d H:i')}</div>
                  {past_invent.comment}`,
			flex: 1,
			cell: {
				encodeHtml: false
			}
		},
		{
			text: i18n.gettext('Price'),
			minWidth: 70,
			tpl: `<b>{price.price_base:erpMoney}</b>`,
			cell: {
				align: 'right',
				encodeHtml: false
			}
		}
	]
});