Ext.define('Erp.view.movement.edit.ReceiveConfirm', {
    extend: 'Erp.base.Dialog',
    xtype: 'movement_receive',
    width: 400,
    title: i18n.gettext('Receive invoice'),
    html: i18n.gettext('Attention, changing the status increases the number of balances of goods indicated in the invoice. Do you agree to change the status of the invoice?'),
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
            handler: 'changeStatusToReceive'
        }
    ]
});
