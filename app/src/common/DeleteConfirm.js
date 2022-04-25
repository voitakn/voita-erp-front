Ext.define('Erp.common.DeleteConfirm', {
    extend: 'Erp.base.ToolTip',
    xtype: 'delete_confirm',
    viewModel: {
        data: {
            title: i18n.gettext('Attention'),
            message: i18n.gettext('Do you want to delete this position from the list?')
        }
    },
    bind: {
        title: '{title}',
        html: '{message}'
    },
    cls: 'size-14',
    align: 't50-b50',
    buttonAlign: 'center',
    buttons: {
        cancel: {
            margin: '0 5 0 5',
            iconCls: 'x-fa fa-times red',
            text: i18n.gettext('Cancel'),
            handler: (btn) => btn.up('delete_confirm').destroy()
        },
        ok: {
            margin: '0 5 0 5',
            iconCls: 'x-fa fa-check green-dark',
            text: i18n.gettext('Yes!'),
            handler: 'clickOk'
        }
    },
    controller: {
        alias: 'controller.delete_confirm_ctrl',
        clickOk(btn) {
            const tooltip = btn.up('delete_confirm');
            tooltip.fireEvent('onConfirm', tooltip);
        }
    }
});