Ext.define('Erp.view.admin.groles.Groups', {
    extend: 'Erp.base.ToolTip',
    xtype: 'admin_groles_groups',
    hidden: true,
    layout: 'fit',
    width: 250,
    maxHeight: 300,
    title: i18n.gettext('Assigned in groups'),
    items: [
        {
            xtype: 'list',
            itemTpl: '{title}',
            bind: {
                store: '{groups_store}'
            },
            grouped: false
        }
    ]
});
