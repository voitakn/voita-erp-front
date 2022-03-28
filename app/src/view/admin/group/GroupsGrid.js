Ext.define('Erp.view.admin.group.GroupsGrid', {
    extend: 'Erp.base.GridRowedit',
    xtype: 'admin_groups_grid',
    reference: 'groups_grid',
    bind: {
        store: '{groups_store}',
        selection: '{groups_selection}'
    },
    selectable: {
        columns: false,
        cells: false,
        checkbox: true,
        row: true,
        headerCheckbox: false,
        extensible: true,
        mode: 'single',
    },
    columns: [
        {
            text: i18n.gettext('Name of group'),
            dataIndex: 'title',
            flex: 1,
            editor: {
                required: true,
            }
        },{
            text: i18n.gettext('Request'),
            dataIndex: 'can_use',
            tpl: `{can_use:checkIcon}`,
            cell: {
                encodeHtml: false,
                align: 'center',
            },
            editor: {
                xtype: 'checkbox',
                bodyAlign: 'center'
            }
        },{
            text: i18n.gettext('Active'),
            dataIndex: 'active',
            tpl: `{active:checkIcon}`,
            cell: {
                encodeHtml: false,
                align: 'center',
            },
            editor: {
                xtype: 'checkbox',
                bodyAlign: 'center'
            }
        },{
            width: 70,
            hideable: false,
            menu: false,
            cell: {
                tools: {
                    edit: {
                        cls: 'blue',
                        hidden: true,
                        handler: 'editItem',
                        bind: {
                            hidden: '{no_adm_group_save}'
                        }
                    },
                    /*trash: {
                        cls: 'red',
                        handler: 'deleteItem',
                        weight: 1,
                        hidden: true,
                        bind: {
                            hidden: '{no_adm_group_delete}'
                        }
                    }*/
                }
            }
        }
    ]
});
