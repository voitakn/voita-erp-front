Ext.define('Erp.view.admin.customer.cmp.View', {
    extend: 'Ext.Panel',
    xtype: 'admin_customer_view',
    requires: [
        'Erp.view.admin.customer.cmp.List',
    ],
    autoSize: true,
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'admin_customer_list',
            reference: 'customer_list',
            width: 850,
            margin: '0 20 0 0'
        },{
            xtype: 'container',
            reference: 'admin_customer_right',
            autoSize: true,
            flex: 1,
            layout: 'card',
            items: [
                {
                    xtype: 'container',
                    autoSize: true,
                    layout: 'center',
                    items: [
                        {
                            xtype: 'label',
                            html: Ext.String.format('<h1>{0}</h1>', i18n.gettext('Select organization from the list or add new one.')),
                        }
                    ]
                },{
                    xtype: 'admin_customer_new',
                    reference: 'admin_customer_new',
                    autoSize: true,
                },{
                    xtype: 'admin_customer_tabs',
                    reference: 'admin_customer_tabs',
                    autoSize: true,
                }
            ]
        },
    ]
});
