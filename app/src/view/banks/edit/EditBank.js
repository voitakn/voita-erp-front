Ext.define('Erp.view.banks.edit.EditBank', {
    extend: 'Erp.base.ToolTip',
    xtype: 'edit_bank',
    reference: 'edit_bank',
    session: true,
    scrollable: 'y',
    width: 400,
    align: 'l-r',
    title: i18n.gettext('Edit Bank'),
    items: [
        {
            xtype: 'formpanel',
            reference: 'edit_bank_form',
            defaults: {
                xtype: 'textfield',
            },
            items: [
                {
                    xtype: 'displayfield',
                    label: i18n.gettext('Name'),
                    bind: {
                        value: '{editBank.name}'
                    },
                },
                {
                    xtype: 'textfield',
                    label: i18n.gettext('SWIFT'),
                    required: true,
                    bind: {
                        value: '{editBank.swift}'
                    },
                },
                {
                    xtype: 'textfield',
                    label: i18n.gettext('IBAN'),
                    required: true,
                    bind: {
                        value: '{editBank.iban}'
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
                        value: '{editBank.default}'
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
            handler: 'onCancelEditBank'
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Save'),
            // bind: {
            //     hidden: '{no_inv_prices_rules_edit}'
            // },
            handler: 'onSaveEditBank'
        }
    ]
});
