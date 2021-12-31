Ext.define('Erp.view.report.period.Period', {
    extend: 'Erp.base.Module',
    xtype: 'report_period',
    viewModel: {
        type: 'report_period_vm'
    },
    controller: 'report_period_ctrl',
    items: [
        {
            xtype: 'container',
            scrollable: 'y',
            layout: 'auto',
            items: [
                {
                    xtype: 'report_head',
                    docked: 'top'
                },{
                    xtype: 'report_stat',
                    margin: '0 0 10 0',
                },{
                    xtype: 'report_charts',
                }
            ]
        }
    ]
});
