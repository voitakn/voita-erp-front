Ext.define('Erp.view.employee.GroupsGrid', {
	extend: 'Ext.grid.Grid',
	xtype: 'employee_groups_grid',
	reference: 'employee_groups_grid',
	requires: [
		'Erp.common.WgroupField'
	],
	emptyText: i18n.gettext('No user group assigned!'),
	bind: {
		store: '{worker_groups_store}'
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
					xtype: 'wgroupfield',
					hidden: true,
					bind: {
						hidden: '{no_com_worker_group_save}',
						selectPlaces: '{fullCard.groups}'
					},
					viewModel: {
						data: {
							btnText: i18n.gettext('Edit user groups'),
						}
					},
					listeners: {
						onSave: 'onSelectGroups'
					}
				}
			]
		}
	],
	columns: [
		{
			text: i18n.gettext('Groups'),
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
