Ext.define('Erp.view.sell.pos_sell.edit.TrashConfirm', {
    extend: 'Erp.base.Dialog',
    xtype: 'pos_sell_trash',
    width: 400,
    title: i18n.gettext('Delete receipt'),
    html: i18n.gettext('Do you want to clear all positions and delete this receipt?'),
    buttonAlign: 'center',
    buttons: [
        {
            xtype: 'button',
            ui: 'alt decline',
            text: i18n.gettext('No'),
            handler(btn) {
                btn.up('dialog').hide();
            }
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            ui: 'alt confirm',
            text: i18n.gettext('Yes!'),
            handler: 'onTrashReceipt'
        }
    ]
});
