Ext.define('Erp.view.produce.Produce', {
    extend: 'Erp.base.Module',
    xtype: 'produce',
    viewModel: {
        type: 'produce_vm'
    },
    controller: 'produce_ctrl',
    // autoSize: true,
    // scrollable: 'y',
    items: [
        {
            xtype: 'produce_card',
        },

    ]
});