Ext.define('Erp.view.admin.customer.cmp.Tabs', {
    extend: 'Erp.base.tab.Panel',
    xtype: 'admin_customer_tabs',
    defaultType: 'panel',
    autoSize: true,
    items: [
        {
            title: i18n.gettext('Organization'),
            xtype: 'admin_customer_taborg',
        },{
            title: i18n.gettext('Users'),
            xtype: 'admin_customer_tabusers',
        },{
            title: i18n.gettext('Places of business'),
            xtype: 'admin_customer_tabplaces',
        },
    ],
});
