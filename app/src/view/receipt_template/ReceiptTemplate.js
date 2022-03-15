Ext.define('Erp.view.receipt_template.ReceiptTemplate', {
    extend: 'Erp.base.Module',
    xtype: 'receipt_template',
    reference: 'receipt_template',
    autoSize: true,
    session: true,
    scrollable: 'y',
    viewModel: {
        type: 'receipt_template_vm'
    },
    controller: 'receipt_template_ctrl',
    layout: 'hbox',
    items: [
        {
            xtype: 'company_menu',
        },
        {
            xtype: 'container',
            scrollable: 'y',

            flex: 1,
            items: [
                {
                    xtype: 'head1',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'title',
                            html: i18n.gettext('Receipt template')
                        },
                        {
                            xtype: 'button',
                            margin: '0 0 0 50',
                            iconCls: 'fi-pencil blue',
                            text: i18n.gettext('Edit'),
                            handler: 'onEditTemplate',
                            hidden: true,
                            bind: {
                                hidden: '{no_com_customer_save}'
                            }
                        },
                    ]
                },
                {
                    xtype: 'container',
                    margin: '0 20 0 0',
                    bind: {
                        width: '{widthCnt * 4}'
                    },
                    layout: {
                        type: 'vbox',
                    },
                    items: [
                        {
                            xtype: 'container',
                            margin: '0 0 5 0',
                            cls: 'bolder',
                            layout: {
                                type: 'hbox',
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '0 20 0 0',
                                    html: `${i18n.gettext('Series')}:`
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 0',
                                    bind: {
                                        html: '{series_template}'
                                    }

                                }

                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 10 0',
                            cls: 'bolder',
                            bind: {
                                width: '{widthCnt * 3.75}'
                            },
                            layout: {
                                type: 'hbox',
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '0 5 0 0',

                                    html: '<--------'
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 0',
                                    cls: 'text-center',
                                    flex: 1,
                                    bind: {
                                        html: '{widthCnt}' + 'mm'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 5',
                                    html: '-------->'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            reference: 'print_content',
                        }
                    ]
                },
                {
                    xtype: 'template_settings_edit',
                }
            ]
        },

    ]
})