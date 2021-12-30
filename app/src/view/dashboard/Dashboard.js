Ext.define('Erp.view.dashboard.Dashboard', {
    extend: 'Erp.base.Module',
    xtype: 'dashboard',
    controller: 'dashboard_ctrl',
    viewModel: {
        type: 'dashboard_vm'
    },
    autoSize: true,
    items: [
        {
            xtype: 'container',
            scrollable: 'y',
            items: [
                {
                    xtype: 'head1',
                    items: [{
                        xtype: 'label',
                        cls: 'title',
                        html: i18n.gettext('Dashboard')
                    }]
                },
                {
                    xtype: 'dashboard_statmain'
                },
                {
                    xtype: 'dashboard_statpos'
                }
            ]
        }
    ]
});
