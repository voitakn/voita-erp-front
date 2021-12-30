Ext.define('Erp.view.admin.customer.cmp.TabUsers', {
    extend: 'Erp.view.admin.customer.cmp.TabOrg',
    xtype: 'admin_customer_tabusers',
    bodyPadding: 0,
    layout: 'fit',
    items: [
        {
            xtype: 'grid',
            bind: {
                store: '{card_users_list}',
            },
            columns: [
                {
                    text: i18n.gettext('E-mail'),
                    dataIndex: 'login',
                    flex: 1,
                },{
                    text: i18n.gettext('Name'),
                    flex: 1,
                    tpl: '{params.name} {params.surname}',
                },{
                    text: i18n.gettext('Phone'),
                    flex: 1,
                    tpl: '{params.phone}'
                },{
                    text: i18n.gettext('Enable'),
                    tpl: `{active:checkIcon}`,
                    cell: {
                        encodeHtml: false,
                        align: 'center',
                    }
                }
            ]
        }
    ]
});
