Ext.define('Erp.view.movement.card.Card', {
    extend: 'Erp.base.Module',
    xtype: 'movement_card',
    reference: 'movement_card',
    controller: 'movement_card_ctrl',
    viewModel: {
        type: 'movement_card_vm'
    },
    autoSize: true,
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
            },
            items: [
                {
                    xtype: 'movement_card_invoice',
                    minWidth: 800,
                },
                {
                    xtype: 'movement_card_grid',
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
        },
    ],
});
