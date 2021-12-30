Ext.define('Erp.view.worker.Worker', {
    extend: 'Erp.base.Module',
    xtype: 'workers',
    reference: 'workers',
    autoSize: true,
    session: true,
    controller: 'workers_ctrl',
    viewModel: {
        type: 'workers_vm'
    },
    requires: [
        'Erp.view.common.MenuCompany',
    ],
    scrollable: 'y',
    listeners: {
        activate: 'afterViewShow'
    },
    items: [
         {
            xtype: 'container',
            layout: {
                type: 'hbox',
            },
            items: [
                {
                    xtype: 'company_menu',
                },
                {
                    xtype: 'worker_grid',
                    margin: '0 20 0 0',
                    flex: 1,
                }
            ]
        }
    ]
});
