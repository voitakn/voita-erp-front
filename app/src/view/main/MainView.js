Ext.define('Erp.view.main.MainView', {
    extend: 'Ext.Panel',
    xtype: 'mainview',
    bodyCls: 'center-div',
    layout: 'fit',
    items: [
        {
            xtype: 'main_left',
            reference: 'main_left',
            docked: 'left',
        },
        {
            xtype: 'container',
            margin: '10 10 10 10',
            layout: 'fit',
            items: [
                {
                    xtype: 'navigationview',
                    reference: 'content_view',
                    navigationBar: false
                }
            ]
        },{
            xtype: 'button',
            docked: 'top',
            handler: 'collapseMenu',
            bind: {
                cls: '{main_btn_cls}',
                iconCls: '{main_btn_icon}',
                hidden: '{main_btn_hide}'
            }
        },{
            xtype: 'container',
            docked: 'bottom',
            hidden: true,
            cls: 'status-failed',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'middle'
            },
            bind: {
                hidden: '{hide_subscription_update}'
            },
            items: [
                {
                    xtype: 'label',
                    margin: '0 0 0 20',
                    cls: 'size-14 bolder',
                    html: i18n.gettext('Sorry, some of the functions are not available. You need to pay your subscription.')
                },{
                    xtype: 'button',
                    ui: 'alt confirm',
                    margin: '2 2 2 20',
                    text: i18n.gettext('Update subscription'),
                    handler: 'goToSubscription'
                }
            ]
        },{
            xtype: 'container',
            docked: 'bottom',
            hidden: true,
            cls: 'status-failed',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'middle'
            },
            bind: {
                hidden: '{!subscription_need_renew}'
            },
            items: [
                {
                    xtype: 'label',
                    margin: '0 5 0 20',
                    cls: 'size-14 bolder',
                    html: i18n.gettext('Yor subscription will be cancelled:')
                },{
                    xtype: 'label',
                    cls: 'size-14 bolder',
                    bind: {
                        html: '{subscription_cancel_date}'
                    }
                },{
                    xtype: 'label',
                    margin: '0 5 0 0',
                    cls: 'size-14 bolder',
                    html: '.'
                },{
                    xtype: 'label',
                    cls: 'size-14 bolder',
                    html: i18n.gettext('You need to renew your subscription.')
                },{
                    xtype: 'button',
                    ui: 'alt confirm',
                    margin: '2 2 2 20',
                    text: i18n.gettext('Renew subscription'),
                    handler: 'goToSubscription'
                }
            ]
        },{
            xtype: 'container',
            docked: 'bottom',
            hidden: true,
            cls: 'status-progress',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'middle'
            },
            height: 35,
            bind: {
                hidden: '{!subscription_show_trial}'
            },
            items: [
                {
                    xtype: 'label',
                    margin: '0 5 0 20',
                    cls: 'size-14 bolder',
                    html: i18n.gettext('Your trial period will be finished on')
                },{
                    xtype: 'label',
                    cls: 'size-14 bolder',
                    bind: {
                        html: '{subscription_trial_date}'
                    }
                },{
                    xtype: 'label',
                    margin: '0 5 0 0',
                    cls: 'size-14 bolder',
                    html: '.'
                },{
                    xtype: 'label',
                    cls: 'size-14 bolder',
                    html: i18n.gettext('After that you need to start your subscription.')
                }
            ]
        }
    ]

});
