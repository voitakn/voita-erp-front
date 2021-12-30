Ext.define('Erp.view.sell.revert_list.Revert', {
    extend: 'Erp.base.Module',
    xtype: 'revert_list',
    controller: 'revert_list_ctrl',
    viewModel: {
        type: 'revert_list_vm'
    },
    autoSize: true,
    items: [
        {
            xtype: 'revert_grid',
        },{
            xtype: 'base_dialog',
            reference: 'revert_list_dialog_confirm',
            width: 500,
            title: i18n.gettext('Approving'),
            html: `<div class="size-16 text-center">${i18n.gettext('Do you want to approve this request of refund selling?')}</div>`,
            listeners: {
                onSave: 'confirmRequest'
            }
        },{
            xtype: 'base_dialog',
            reference: 'revert_list_dialog_cancel',
            width: 500,
            title: i18n.gettext('Reverting'),
            html: `<div class="size-16 text-center">${i18n.gettext('Do you want to revert this request of refund selling?')}</div>`,
            listeners: {
                onSave: 'cancelRequest'
            }
        },
    ]
});
