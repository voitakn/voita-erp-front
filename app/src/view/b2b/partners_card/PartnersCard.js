Ext.define('Erp.view.partners_card.PartnersCard', {
    extend: 'Erp.base.Module',
    xtype: 'partners_card',
    controller: 'partners_card_ctrl',
    viewModel: {
        type: 'partners_card_vm'
    },
    layout: 'fit',
    padding: '0 0 0 20',
    items: [
        {
            xtype: 'card_cnt'
        }
    ]
});