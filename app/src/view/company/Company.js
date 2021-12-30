Ext.define('Erp.view.company.Company', {
    extend: 'Erp.base.Module',
    xtype: 'company',
    autoSize: true,
    session: true,
    scrollable: 'y',
    viewModel: {
        type: 'company_vm'
    },
    controller: 'company_ctrl',
    layout: 'hbox',
    items: [
        {
            xtype: 'company_menu',
        },{
            xtype: 'container',
            flex: 1,
            items: [
                {
                    xtype: 'head1',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'title',
                            html: i18n.gettext('Company information')
                        },{
                            text: i18n.gettext('Edit'),
                            iconCls: 'fi-pencil blue',
                            handler: 'onEditCard',
                            margin: '0 0 0 50',
                            hidden: true,
                            bind: {
                                hidden: '{no_com_customer_save}'
                            }
                        }
                    ]
                },{
                    xtype: 'container',
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'container',
                            width: 200,
                            items: [
                                {
                                    xtype: 'company_logo',
                                }
                            ]
                        },{
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 20',
                            items: [
                                {
                                    xtype: 'company_info',
                                }
                            ]
                        }
                    ]
                },{
                    xtype: 'company_config'
                }
            ]
        },{
            xtype: 'company_edit',
        }
    ]
});
