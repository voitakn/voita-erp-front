Ext.define('Erp.view.movement.list.List', {
    extend: 'Erp.base.Module',
    xtype: 'movement_list',
    controller: 'movement_list_ctrl',
    viewModel: {
        type: 'movement_list_vm'
    },
    requires: [
        'Erp.view.movement.edit.SentConfirm',
        'Erp.view.movement.edit.ReceiveConfirm'
    ],
    autoSize: true,
    items: [
        {
            xtype: 'movement_list_grid',
            minWidth: 800,
            flex: 1
        },
        {
            xtype: 'movement_sent',
        },
        {
            xtype: 'movement_receive',
        }
    ]
});
