Ext.define('Erp.view.banks.edit.RemoveBank', {
    extend: 'Erp.base.ToolTip',
    xtype: 'remove_bank_check',
    reference: 'remove_bank_check',
    autoSize: true,
    session: true,
    title: i18n.gettext('You want really remove the bank?'),
    width: 400,
    align: 'l50-r100',
    items: [
        {
            xtype: 'displayfield',
            label: i18n.gettext('Name of bank'),
            bind: {
                value: '{removeBank.name}'
            },
        },
    ],
    buttonAlign: 'center',
    buttons: [
        {
            xtype: 'button',
            text: i18n.gettext('No'),
            iconCls: 'x-fa fa-times red',
            handler: function (btn) {
                btn.up('remove_bank_check').hide();
            }
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Yes'),
            handler: 'removeBank'
        }
    ]
});
