Ext.define('Erp.view.expense.RightCnt', {
    extend: 'Ext.Container',
    xtype: 'expense_right_cnt',
    autoSize: true,
    scrollable: 'y',
    items: [
        {
            xtype: 'head1',
            items: [{
                xtype: 'label',
                cls: 'title',
                html: i18n.gettext('Expense card')
            },{
                text: i18n.gettext('Back'),
                iconCls: 'x-fa fa-arrow-left',
                handler: 'toList',
                margin: '0 0 0 20',
            }]
        },{
            xtype: 'container',
            defaults: {
                xtype: 'container',
                margin: '3 0',
                layout: {
                    type: 'hbox'
                },
                flex: 1,
            },
            items: [
                {
                    items: [
                        {
                            xtype: 'label',
                            width: 130,
                            html: `${i18n.gettext('Title')}:`,
                        },{
                            xtype: 'label',
                            flex: 1,
                            cls: 'bolder',
                            bind: {
                                html: `{theCard.title}`,
                            }
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            width: 130,
                            html: `${i18n.gettext('Created')}:`,
                        },{
                            xtype: 'label',
                            flex: 1,
                            cls: 'bolder',
                            bind: {
                                html: `{theCard.date_create}`,
                            }
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            width: 130,
                            html: `${i18n.gettext('Amount')}:`,
                        },{
                            xtype: 'label',
                            flex: 1,
                            cls: 'bolder',
                            bind: {
                                html: `{theCard.amount}`,
                            }
                        }
                    ]
                }
            ]
        }
    ],
});
