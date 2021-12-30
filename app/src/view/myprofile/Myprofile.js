Ext.define('Erp.view.myprofile.Myprofile', {
    extend: 'Erp.base.Module',
    xtype: 'myprofile',
    autoSize: true,
    scrollable: 'y',
    viewModel: {
        type: 'myprofile_vm'
    },
    controller: 'myprofile_ctrl',
    layout: {
        type: 'vbox',
    },
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
            },
            items: {
                xtype: 'container',
                flex: 1,
                items: [
                    {
                        xtype: 'head1',
                        items: [{
                            xtype: 'label',
                            cls: 'title',
                            html: i18n.gettext('My profile')
                        },{
                            xtype: 'button',
                            text: i18n.gettext('Edit'),
                            iconCls: 'x-fa fa-user-edit blue',
                            handler: 'changeUserData',
                            margin: '0 0 0 20',
                            hidden: true,
                            bind: {
                                hidden: '{no_com_login_params_save}'
                            }
                        }, {
                            xtype: 'button',
                            text: i18n.gettext('Change Password'),
                            iconCls: 'x-fa fa-user-lock blue',
                            handler: 'onChangePassword',
                            margin: '0 0 0 10',
                            hidden: true,
                            bind: {
                                hidden: '{no_com_login_change_passwd}'
                            }
                        }]
                    }
                ]
            }
        },
        {
            xtype: 'container',
            margin: '20 0 0 0',
            defaults: {
                xtype: 'container',
                minWidth: 250,
                margin: '5 0',
                flex: 1,
                defaults: {
                    xtype: 'container',
                    margin: '10 0',
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
                                    cls: 'bolder',
                                    html: `${i18n.gettext('Login')}:`,
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    bind: {
                                        html: '{theCard.login}',
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    cls: 'bolder',
                                    html: `${i18n.gettext('Name')}:`,
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    bind: {
                                        html: `{theCard.name}`,
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    cls: 'bolder',
                                    html: `${i18n.gettext('Surname')}:`,
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    bind: {
                                        html: `{theCard.surname}`,
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    cls: 'bolder',
                                    html: `${i18n.gettext('Phone')}:`,
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    bind: {
                                        html: `{theCard.phone}`,
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    cls: 'bolder',
                                    html: `${i18n.gettext('Role')}:`,
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    bind: {
                                        html: `{theCard.title}`,
                                    }
                                }
                            ]
                        },
    
                    ]
                }
            ],
        },{
            xtype: 'myprofile_change_password'
        },{
            xtype: 'myprofile_edit_user'
        }
    ]
});
