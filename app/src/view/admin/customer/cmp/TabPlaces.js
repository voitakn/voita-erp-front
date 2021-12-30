Ext.define('Erp.view.admin.customer.cmp.TabPlaces', {
    extend: 'Erp.view.admin.customer.cmp.TabOrg',
    xtype: 'admin_customer_tabplaces',
    bodyPadding: 0,
    layout: 'fit',
    items: [
        {
            xtype: 'grid',
            bind: {
                store: '{card_places_list}',
            },
            columns: [
                {
                    text: i18n.gettext('Title'),
                    dataIndex: 'title',
                    flex: 1,
                }
            ]
        }
    ]
});
