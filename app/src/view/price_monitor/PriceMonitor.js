Ext.define('Erp.view.price_monitor.PriceMonitor', {
    extend: 'Erp.base.Module',
    xtype: 'price_monitor',
    controller: 'price_monitor_ctrl',
    viewModel: {
        type: 'price_monitor_vm'
    },
    autoSize: true,
    items: [
        {
            xtype: 'price_monitor_grid',
        }
    ]
});
