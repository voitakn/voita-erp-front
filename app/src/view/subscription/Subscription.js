Ext.define('Erp.view.subscription.Subscription', {
    extend: 'Erp.base.Module',
    xtype: 'subscription',
    reference: 'subscription',
    scrollable: 'y',
    viewModel: {
        type: 'subscription_vm'
    },
    requires: [
        'Erp.view.common.MenuCompany',
    ],
    controller: 'subscription_ctrl',
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
            },
            items: [
                {
                    xtype: 'company_menu',
                },{
                    xtype: 'container',
                    flex: 1,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'head1',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'title',
                                    html: i18n.gettext('Manage Subscription')
                                }
                            ]
                        },{
                            xtype: 'subscription_processing',
                            hidden: true,
                            reference: 'pos_payment_process',
                            bind: {
                                hidden: '{pos_payment_process_hide}'
                            }
                        },{
                            xtype: 'subscription_success',
                            hidden: true,
                            reference: 'pos_payment_success',
                            bind: {
                                hidden: '{pos_payment_success_hide}'
                            }
                        },{
                            xtype: 'container',
                            hidden: true,
                            bind: {
                                hidden: '{subscription_form0_hide}'
                            },
                            items: [
                                {
                                    xtype: 'subscription_form0',
                                    reference: 'subscription_form0',
                                }
                            ]
                        },{
                            xtype: 'container',
                            hidden: true,
                            layout: 'fit',
                            bind: {
                                hidden: '{pos_payment_subsdata_hide}'
                            },
                            items: [
                                {
                                    xtype: 'subscription_subsdata',
                                    reference: 'subscription_subsdata',
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
