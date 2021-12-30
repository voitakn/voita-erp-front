Ext.define('Erp.view.sell.pos_list.PosList', {
    extend: 'Erp.base.Module',
    xtype: 'pos_list',
    controller: 'pos_list_ctrl',
    viewModel: {
        type: 'pos_list_vm'
    },
    autoSize: true,
    layout: 'vbox',
    scrollable: 'x',
    items: [
        {
            xtype: 'pos_grid',
            flex: 1,
            minWidth: 800,
        },
        {
            xtype: 'base_dialog',
            reference: 'pos_list_dialog_finish',
            width: 500,
            title: i18n.gettext('Check the amount of cash'),
            bind: {
                html: `<div class="size-16 text-center">${i18n.gettext('Do you confirm the availability of the amount?')}</div> <br/>
                        <div class="size-24 text-center bolder">{checkout_amount_end:erpMoney}</div>`
            },
            listeners: {
                onSave: 'sendFinishRequest'
            }
        }
    ]
});
