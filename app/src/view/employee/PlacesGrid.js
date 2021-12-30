Ext.define('Erp.view.employee.PlacesGrid', {
	extend: 'Ext.grid.Grid',
	xtype: 'employee_places_grid',
	reference: 'employee_places_grid',
	requires: [
		'Erp.common.PlaceField'
	],
	emptyText: i18n.gettext('User is not assigned to the places of business!'),
	bind: {
		store: '{places_store}'
	},
	items: [
		{
			xtype: 'container',
			docked: 'top',
			layout: {
				type: 'hbox',
				pack: 'start',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'placefield',
					hidden: true,
					bind: {
						hidden: '{no_com_worker_place_save}',
						selectPlaces: '{fullCard.places}'
					},
					viewModel: {
						data: {
							btnText: i18n.gettext('Edit user points'),
						}
					},
					listeners: {
						onSave: 'onSelectPlaces'
					}
				}
			]
		}
	],
	columns: [
		{
			text: i18n.gettext('Points of sale'),
			minWidth: 150,
			flex: 1,
			dataIndex: 'title'
		},{
			text: i18n.gettext('Changed'),
			width: 120,
			tpl: `{date_create:date("Y-m-d H:i")}`,
		}
	],
});
