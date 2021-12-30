Ext.define('Erp.view.supplier.SupplierLeft', {
	extend: 'Ext.grid.Grid',
	xtype: 'supplier_left',
	reference: 'supplier_left',
	emptyText: i18n.gettext('Data is not found!'),
	bind: {
		store: '{suppliers_store}',
		selection: '{theCardView}'
	},
	reserveScrollbar: true,
	autoSize: true,
	scrollable: 'y',
	plugins: {
		gridpagingtoolbar: true
	},
	selectable: {
		columns: false,
		rows: true,
		cells: false,
		checkbox: false,
		headerCheckbox: false,
		extensible: true,
		mode: 'single',
	},
	items: [
		{
			xtype: 'head1',
			items: [{
				xtype: 'label',
				cls: 'title',
				margin: '0 0 0 10',
				html: i18n.gettext('Suppliers')
			}, {
				xtype: 'button',
				margin: '0 10 0 10',
				iconCls: 'x-fa fa-plus green-dark',
				text: i18n.gettext('New Supplier'),
				hidden: true,
				bind: {
					hidden: '{no_com_supplier_save}'
				},
				handler: 'addNewSupplier',
			},
				{
					xtype: 'searchfield',
					flex: 1,
					margin: '0 0 0 20',
					placeholder: i18n.gettext('Search by name(at least 3 characters)'),
					bind: {
						value: '{filter_search}'
					}
				}
			]
		},
	],
	columns: [
		{
			text: i18n.gettext('Name'),
			flex: 1,
			dataIndex: 'title',
			tpl: `<div><a href="/#supplier/{id}"><b>{title}</b></a></div><div>{name} {surname}</div>`,
			cell: {encodeHtml: false, height: 48}
		}, {
			text: i18n.gettext('Address'),
			flex: 1,
			tpl: `<div>{country_row}</div><div>{address_row_grid}</div>`,
			cell: {encodeHtml: false, height: 48},
		}, {
			text: i18n.gettext('Contacts'),
			width: 160,
			tpl: `<div>{phone}</div><div>{email}</div>`,
			cell: {encodeHtml: false, height: 48},
		}, {
			width: 35,
			hidden: true,
			bind: {
				hidden: '{no_com_supplier_save}'
			},
			menu: false,
			cell: {
				align: 'center',
				tools: {
					edit: {
						cls: 'blue',
						handler: 'onEditSupplierPen'
					}
				}
			}
		},
	],
})