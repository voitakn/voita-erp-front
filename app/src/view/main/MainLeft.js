Ext.define('Erp.view.main.MainLeft', {
    extend: 'Ext.Panel',
    xtype: 'main_left',
    layout: 'fit',
    requires: [
        'Ext.list.Tree'
    ],
    items: [
        {
            xtype: 'container',
            docked: 'top',
            items: [
                {
                    xtype: 'image',
                    margin: '10',
                    height: 40,
                    bind: {
                        width: '{on_micro_menu}',
                        src: '{logo_src}'
                    }

                }
            ]
        },{
            xtype: 'container',
            docked: 'bottom',
            cls: 'blue-bg',
            height: 80,
            items: [{
                xtype: 'container',
                margin: '0 0 20 0',
                layout: {
                    type: 'vbox',
                    pack: 'end',
                },
                items: [
                    {
                        xtype: 'button',
                        cls: 'white',
                        maxWidth: 200,
                        iconCls: 'x-fa fa-user-circle white',
                        iconAlign: 'right',
                        tooltip: i18n.gettext('Go to the profile'),
                        handler: 'openMyProfile',
                        bind: {
                            text: '{user_btn_name}',
                            iconCls: '{user_btn_icon}'
                        }
                    },
                    {
                        xtype: 'button',
                        reference: 'exit_btn',
                        maxWidth: 200,
                        cls: 'white',
                        handler: 'onClickExit',
                        tooltip: i18n.gettext('Log out'),
                        iconCls: 'x-fa fa-sign-out-alt white',
                        iconAlign: 'right',
                        bind: {
                            text: '{logout_btn_text}'
                        }
                    }
                ]
            }]
        },{
            xtype: 'treelist',
            ui: 'nav',
            reference: 'main_menu',
            scrollable: true,
            cls: 'main-menu',
            bind: {
                store: '{desktop_menu}',
                selection: '{menuSelected}',
                micro: '{navCollapsed}'
            },
            expanderFirst: false,
            expanderOnly: false,
            listeners: {
                itemclick: 'onMenuItemClick',
            }
        }
    ],
});
