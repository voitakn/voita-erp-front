Ext.define('Erp.view.report.period.Period', {
    extend: 'Erp.base.Module',
    xtype: 'report_period',
    autoSize: true,
    session: true,
    viewModel: {
        type: 'report_period_vm'
    },
    controller: 'report_period_ctrl',
    items: [
        {
            xtype: 'container',
            layout: 'fit',
            items: [
                {
                    xtype: 'report_head',
                    docked:'top'
                },{
                    xtype: 'report_stat',
                    docked: 'top'
                },{
                    //xtype: 'container',
                    xtype: 'report_charts',
                    //html: 'report_charts'
                }
            ]
        }
    ]
});
