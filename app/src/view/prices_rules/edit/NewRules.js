Ext.define('Erp.view.price_rules.edit.NewRules', {
    extend: 'Erp.base.ToolTip',
    xtype: 'prices_rules_new',
    reference: 'prices_rules_new',
    session: true,
    scrollable: 'y',
    width: 400,
    align: 'l-r',
    defaults: {
        scrollable: true,
    },
    title: i18n.gettext('New rules'),
    items: [
        {
            xtype: 'formpanel',
            reference: 'price_rules_new_form',
            defaults: {
                xtype: 'textfield',
            },
            items: [
                {
                    xtype: 'textfield',
                    label: i18n.gettext('Price name'),
                    required: true,
                    bind: {
                        value: '{newRules.title}'
                    },
                },
                {
                    xtype: 'numberfield',
                    label: i18n.gettext('Changes %'),
                    width: 180,
                    required: true,
                    bind: {
                        value: '{newRules.percent}'
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
                    bind: {
                        value: '{newRules.type_change}',
                        store: '{type_change}'
                    }
                },
                {
                    xtype: 'selectfield',
                    clearable: false,
                    width: 180,
                    label: i18n.gettext('Affected price'),
                    valueField: 'id',
                    displayField: 'title',
                    bind: {
                        value: '{newRules.parent_id}',
                        store: '{prices_defs_rules_store}'
                    }
                },
                {
                    xtype: 'togglefield',
                    labelAlign: 'right',
                    width: 200,
                    labelWidth: 150,
                    label: i18n.gettext('Enable to active'),
                    bind: {
                        value: '{newRules.active}'
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
            handler: 'onCancelNew'
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Save'),
            bind: {
                hidden: '{no_inv_prices_rules_edit}'
            },
            handler: 'onSaveNew'
        }
    ]
});
