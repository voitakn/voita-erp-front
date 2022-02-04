Ext.define('Erp.view.produce.edit.EditRules', {
    extend: 'Erp.base.ToolTip',
    xtype: 'rules_edit',
    reference: 'rules_edit',
    align: 'l60-r100',
    width: 400,
    title: i18n.gettext('Edit wholesale price'),
    listeners: {
        onCancel: 'onCancelEditRules'
    },
    items: [
        {
            xtype: 'formpanel',
            reference: 'rules_form',
            defaults: {
                xtype: 'textfield',
            },
            items: [
                {
                    xtype: 'togglefield',
                    labelAlign: 'right',
                    width: 200,
                    labelWidth: 150,
                    label: i18n.gettext('Disable calculation'),
                    bind: {
                        value: '{editRules.active}',
                    }
                },
                {
                    xtype: 'numberfield',
                    label: i18n.gettext('Price'),
                    width: 180,
                    required: true,
                    disabled: true,
                    bind: {
                        value: '{editRules.price_base}',
                        disabled: '{!editRules.active}'
                    },
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
            handler: 'onCancelEditRules'
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Save'),
            handler: 'onSaveEdit'
        }
    ]
});
