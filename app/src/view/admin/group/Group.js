Ext.define('Erp.view.admin.group.Group', {
    extend: 'Erp.base.Module',
    xtype: 'admin_group',
    controller: 'admin_group_ctrl',
    viewModel: {
        type: 'admin_group_vm'
    },
    layout: 'fit',
    platformConfig: {
        desktop: {},
        tablet: {},
        phone: {}
    },
    items: [
        {
            xtype: 'head1',
            items: [{
                xtype: 'label',
                html: Ext.String.format('<b>{0}</b>', i18n.gettext('Groups management'))
            }]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
            },
            items: [
                {
                    xtype: 'panel',
                    autoSize: true,
                    layout: 'fit',
                    margin: '0 20 0 0',
                    width: 600,
                    tbar: [
                        {
                            xtype: 'container',
                            html: Ext.String.format('<b>{0}</b>', i18n.gettext('Groups management'))
                        },{
                            xtype: 'spacer'
                        },{
                            xtype: 'button',
                            text: i18n.gettext('Add group'),
                            cls: 'green-dark',
                            iconCls: 'x-fa fa-plus',
                            handler: 'addNewItem',
                            hidden: true,
                            bind: {
                                hidden: '{no_adm_group_save}'
                            }
                        }
                    ],
                    items: [
                        {
                            xtype: 'admin_groups_grid',
                        }
                    ]
                },{
                    xtype: 'panel',
                    autoSize: true,
                    layout: 'fit',
                    flex: 1,
                    items: [
                        {
                            xtype: 'group_sign_roles',
                            hidden: true,
                            bind: {
                                hidden: '{!group_sel_id}'
                            }
                        },{
                            xtype: 'panel',
                            bind: {
                                hidden: '{group_sel_id}'
                            },
                            tbar: [
                                {
                                    xtype: 'container',
                                    html: Ext.String.format('<b>{0}</b>', i18n.gettext('To see the functions list select the group'))
                                }
                            ]
                        }
                    ]
                },
            ]
        },

    ]
});
