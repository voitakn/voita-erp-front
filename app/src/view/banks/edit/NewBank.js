Ext.define('Erp.view.banks.edit.NewBank', {
    extend: 'Erp.base.ToolTip',
    xtype: 'new_bank',
    reference: 'new_bank',
    session: true,
    scrollable: 'y',
    width: 400,
    align: 'l-r',
    title: i18n.gettext('New Bank'),
    items: [
        {
            xtype: 'formpanel',
            reference: 'new_bank_form',
            defaults: {
                xtype: 'textfield',
            },
            items: [
                {
                    xtype: 'textfield',
                    reference: 'new_bank_name',
                    label: i18n.gettext('Name'),
                    required: true,
                    bind: {
                        value: '{newBank.name}'
                    },
                },
                {
                    xtype: 'textfield',
                    label: i18n.gettext('SWIFT'),
                    required: true,
                    bind: {
                        value: '{newBank.swift}'
                    },
                },
                {
                    xtype: 'textfield',
                    label: i18n.gettext('IBAN'),
                    required: true,
                    bind: {
                        value: '{newBank.iban}'
                    },
                },
                {
                    xtype: 'togglefield',
                    labelAlign: 'right',
                    width: 200,
                    labelWidth: 150,
                    label: i18n.gettext('Enable to default'),
                    value: false,
                    bind: {
                        value: '{newBank.default}'
                    }
                },
            ],
        }
    ],
    buttonAlign: 'center',
    buttons: [
        {
            xtype: 'button',
            text: i18n.gettext('Cancel'),
            iconCls: 'x-fa fa-times red',
            handler: 'onCancelNewBank'
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Save'),
            handler: 'onSaveNewBank'
        }
    ]
});
