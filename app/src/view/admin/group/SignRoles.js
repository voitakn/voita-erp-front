Ext.define('Erp.view.admin.group.SignRoles', {
    extend: 'Ext.grid.Grid',
    xtype: 'group_sign_roles',
    reference: 'group_roles_grid',
    bind: {
        store: '{group_roles_store}',
        selection: '{selectedRoles}'
    },
    scrollable: 'y',
    reserveScrollbar: true,
    selectable: {
        columns: false,
        cells: false,
        checkbox: true,
        row: true,
        headerCheckbox: false,
        extensible: true,
        mode: 'multi',
    },
    plugins: {
        gridpagingtoolbar: true
    },
    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            defaults: {
                margin: '0 10 0 0'
            },
            items: [
                {
                    xtype: 'container',
                    html: Ext.String.format('<b>{0}</b>', i18n.gettext('Roles assigned to the group'))
                },{
                    xtype: 'button',
                    text: i18n.gettext('Add role'),
                    cls: 'green-dark',
                    iconCls: 'x-fa fa-plus',
                    handler: 'addRolesToGroup',
                    disabled: true,
                    hidden: true,
                    bind: {
                        disabled: '{!select_id}',
                        hidden: '{no_adm_group_roles_save}'
                    }
                },{
                    xtype: 'button',
                    text: i18n.gettext('Delete selected'),
                    cls: 'red',
                    iconCls: 'x-fa fa-trash red',
                    handler: 'deleteRoles',
                    disabled: true,
                    hidden: true,
                    bind: {
                        disabled: '{!select_id || !selectedRoles || selectedRoles.length == 0}',
                        hidden: '{no_adm_group_roles_save}'
                    }
                }
            ]
        }
    ],
    columns: [
        {
            text: i18n.gettext('Roles name'),
            dataIndex: 'urole',
            flex: 1,
            minWidth: 200
        },{
            text: i18n.gettext('Level'),
            align: 'center',
            dataIndex: 'level'
        },{
            text: i18n.gettext('Description'),
            dataIndex: 'title',
            flex: 2
        },{
            text: i18n.gettext('Request'),
            dataIndex: 'can_use',
            align: 'center',
            tpl: `{can_use:checkIcon}`,
            cell: {
                encodeHtml: false
            },
        },{
            text: i18n.gettext('Active'),
            dataIndex: 'active',
            align: 'center',
            tpl: `{active:checkIcon}`,
            cell: {
                encodeHtml: false
            },
        }
    ]
});
