Ext.define('Erp.view.dashboard.StatPos', {
    extend: 'Ext.Container',
    xtype: 'dashboard_statpos',
    items: [
        {
            xtype: 'container',
            margin: '15 0 0 8',
            cls: 'size-16 bolder',
            html: i18n.gettext('POS statistics'),
        },
        {
            xtype: 'container',
            reference: 'dashboard_statpos_container',
            scrollable: 'x',
            defaults: {
                xtype: 'container',
                margin: '0 0 10 0',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                defaults: {
                    xtype: 'container',
                    bodyCls: 'shadow-sm bg-white border border-1 rounded margin-sh',
                    padding: '10 15',
                    flex: 1,
                    minWidth: 250,
                    defaults: {
                        xtype: 'container',
                        cls: 'size-14',
                        margin: '5 0',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            xtype: 'label',
                        }
                    }
                }
            },
            items: []
        }
    ]
});
