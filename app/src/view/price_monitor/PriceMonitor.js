Ext.define('Erp.view.price_monitor.PriceMonitor', {
    extend: 'Erp.base.Module',
    xtype: 'price_monitor',
    requires: [
        'Erp.view.common.MenuRetail'
    ],
    controller: 'price_monitor_ctrl',
    viewModel: {
        type: 'price_monitor_vm'
    },
    autoSize: true,
    layout: 'vbox',
    scrollable: 'x',
    items: [
        {
            xtype: 'retail_menu',
        },
        {
            xtype: 'price_monitor_grid',
            flex: 1,
        }
    ]
});
