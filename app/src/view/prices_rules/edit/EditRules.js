Ext.define('Erp.view.prices_rules.edit.EditRules', {
    extend: 'Erp.base.ToolTip',
    xtype: 'price_rules_edit',
    reference: 'price_rules_edit',
    align: 't50-b50',
    width: 400,
    title: i18n.gettext('Edit prices_rules'),
    listeners: {
        onCancel: 'onCancelEdit'
    },
    items: [
        {
            xtype: 'formpanel',
            reference: 'edit_form',
            defaults: {
                xtype: 'textfield',
            },
            items: [
                {
                    xtype: 'textfield',
                    label: i18n.gettext('Price name'),
                    required: true,
                    bind: {
                        value: '{editRules.title}'
                    },
                },
                {
                    xtype: 'numberfield',
                    label: i18n.gettext('Changes %'),
                    width: 180,
                    required: true,
                    hidden: true,
                    bind: {
                        value: '{editRules.percent}',
                        hidden: '{editRules.purchase}'
                    },
                },
                {
                    xtype: 'selectfield',
                    clearable: false,
                    required: true,
                    width: 180,
                    label: i18n.gettext('Type change'),
                    value: 1,
                    valueField: 'value',
                    displayField: 'name',
                    hidden: true,
                    bind: {
                        value: '{editRules.type_change}',
                        store: '{type_change}',
                        hidden: '{editRules.purchase}'
                    }
                },
                {
                    xtype: 'selectfield',
                    reference: 'affected',
                    clearable: false,
                    width: 180,
                    label: i18n.gettext('Affected price'),
                    displayField: 'title',
                    valueField: 'id',
                    hidden: true,
                    bind: {
                        value: '{editRules.parent_id}',
                        store: '{prices_defs_rules_store}',
                        hidden: '{editRules.purchase}'
                    }
                },
                {
                    xtype: 'togglefield',
                    labelAlign: 'right',
                    width: 200,
                    labelWidth: 150,
                    hidden: true,
                    label: i18n.gettext('Enable to active'),
                    bind: {
                        value: '{editRules.active}',
                        hidden: '{editRules.purchase}'
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
            handler: 'onCancelEditRules'
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Save'),
            bind: {
                hidden: '{no_inv_prices_rules_edit}'
            },
            handler: 'onSaveEdit'
        }
    ]
});
