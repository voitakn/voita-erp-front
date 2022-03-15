Ext.define('Erp.view.banks.Banks', {
    extend: 'Erp.base.Module',
    xtype: 'banks',
    viewModel: {
        type: 'banks_vm'
    },
    controller: 'banks_ctrl',
    autoSize: true,
    session: true,
    scrollable: 'y',
    layout: 'fit',
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
            },
            items: [
                {
                    xtype: 'company_menu',
                },
                {
                    xtype: 'container',
                    scrollable: 'y',
                    flex: 1,
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'head1',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'title',
                                    html: i18n.gettext('Banks')
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 0 0 20',
                                    iconCls: 'x-fa fa-plus green-dark',
                                    text: i18n.gettext('Add bank'),
                                    handler: 'onAddNewBank',
                                    hidden: true,
                                    bind: {
                                        hidden: '{no_com_customer_save}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'banks_grid',
                            flex: 1,
                        },
                        {
                            xtype: 'new_bank'
                        },
                        {
                            xtype: 'edit_bank'
                        },
                        {
                            xtype: 'remove_bank_check'
                        },
                    ]
                },
            ]
        }
    ]
});