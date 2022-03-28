Ext.define('Erp.view.admin.groles.GrolesGrid', {
    extend: 'Erp.base.GridRowedit',
    xtype: 'admin_groles_grid',
    reference: 'groles_grid',
    bind: {
        store: '{groles_store}'
    },
    items: [
        {
            xtype: 'head1',
            items: [{
                xtype: 'label',
                cls: 'title',
                html: Ext.String.format('<b>{0}</b>', i18n.gettext('Roles management'))
            },{
                xtype: 'combobox',
                reference: 'scheme_combobox',
                margin: '0 0 0 20',
                editable: false,
                clearable: true,
                queryMode: 'local',
                label: i18n.gettext('Scheme'),
                placeholder: i18n.gettext('Any scheme'),
                labelAlign: 'left',
                valueField: 'id',
                displayField: 'text',
                bind: {
                    value: '{filter_scheme}',
                    store: '{schemes_store}'
                }
            },{
                xtype: 'combobox',
                margin: '0 0 0 20',
                labelAlign: 'left',
                queryMode: 'local',
                editable: false,
                clearable: true,
                valueField: 'id',
                displayField: 'text',
                label: i18n.gettext('Is cluster'),
                placeholder: i18n.gettext('Any'),
                bind: {
                    value: '{filter_cluster}',
                },
                store: {
                    fields: ['text', 'id'],
                    data: [
                        {
                            text: i18n.gettext('Yes'),
                            id: 'true'
                        }, {
                            text: i18n.gettext('No'),
                            id: 'false'
                        }
                    ]
                }
            },{
                xtype: 'button',
                text: i18n.gettext('Add role'),
                margin: '0 0 0 15',
                cls: 'green-dark',
                iconCls: 'x-fa fa-plus',
                handler: 'addNewRole',
                hidden: true,
                bind: {
                    hidden: '{no_adm_groles_save}'
                }
            }]
        },
    ],
    columns: [
        {
            text: i18n.gettext('Scheme'),
            dataIndex: 'cmp',
            menu: false,
            width: 85,
            editor: {
                required: true,
            }
        },{
            text: i18n.gettext('Roles name'),
            dataIndex: 'proc',
            flex: 1,
            editor: {
                required: true,
            }
        },{
            text: i18n.gettext('Level'),
            dataIndex: 'level',
            align: 'center',
            width: 80,
            editor: {
                xtype: 'numberfield',
                required: true,
            }
        },{
            text: i18n.gettext('Allow'),
            dataIndex: 'can_use',
            tpl: `{can_use:checkIcon}`,
            width: 80,
            cell: {
                encodeHtml: false,
                align: 'center'
            },
            editor: {
                xtype: 'checkbox',
                bodyAlign: 'center'
            }
        },{
            text: i18n.gettext('Active'),
            dataIndex: 'active',
            tpl: `{active:checkIcon}`,
            width: 80,
            cell: {
                encodeHtml: false,
                align: 'center'
            },
            editor: {
                xtype: 'checkbox',
                bodyAlign: 'center'
            }
        },{
            text: i18n.gettext('Edit data'),
            dataIndex: 'edit_data',
            tpl:`{edit_data:checkIcon}`,
            width: 100,
            cell: {
                encodeHtml: false,
                align: 'center'
            },
            editor: {
                xtype: 'checkbox',
                bodyAlign: 'center'
            }
        },{
            text: i18n.gettext('Is Cluster'),
            dataIndex: 'cluster',
            tpl:`{cluster:checkIcon}`,
            width: 100,
            cell: {
                encodeHtml: false,
                align: 'center'
            },
            editor: {
                xtype: 'checkbox',
                bodyAlign: 'center'
            }
        },{
            width: 100,
            hideable: false,
            menu: false,
            cell: {
                align: 'right',
                tools: {
                    menu: {
                        cls: 'green-dark',
                        zone: 'start',
                        tooltip: i18n.gettext('Roles in groups'),
                        handler: 'onShowGroups',
                        hidden: true,
                        bind: {
                            hidden: '{no_adm_groles_groups}'
                        },
                    },
                    edit: {
                        cls: 'blue',
                        tooltip: i18n.gettext('Edit'),
                        handler: 'editItem',
                        hidden: true,
                        bind: {
                            hidden: '{no_adm_groles_save}'
                        }
                    },
                    trash: {
                        cls: 'red',
                        handler: 'deleteItem',
                        tooltip: i18n.gettext('Delete role'),
                        hidden: true,
                        bind: {
                            hidden: '{no_adm_groles_delete}'
                        }
                    }
                }
            }
        },{
            text: i18n.gettext('Description'),
            dataIndex: 'title',
            flex: 2,
            editor: {
                required: true,
            }
        }
    ]
});
