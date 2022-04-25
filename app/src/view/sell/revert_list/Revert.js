Ext.define('Erp.view.sell.revert_list.Revert', {
    extend: 'Erp.base.Module',
    xtype: 'revert_list',
    requires: [
        'Erp.common.MenuRetail'
    ],
    controller: 'revert_list_ctrl',
    viewModel: {
        type: 'revert_list_vm'
    },
    autoSize: true,
    layout: 'vbox',
    items: [
        {
            xtype: 'retail_menu',
        },
        {
            xtype: 'revert_grid',
            flex: 1
        }, {
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
