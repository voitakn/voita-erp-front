Ext.define('Erp.view.expense.edit.EditExpense', {
    extend: 'Erp.base.ToolTip',
    xtype: 'expense_edit',
    reference: 'expense_edit',
    align: 'l50-b50',
    title: i18n.gettext('Edit expense'),
    listeners: {
        onCancel: 'onCancelEdit'
    },
    items: [
        {
            xtype: 'formpanel',
            width: 300,
            items: [
                {
                    xtype: 'combobox',
                    reference: 'place_combobox',
                    clearable: true,
                    label: i18n.gettext('Point of sale'),
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'title',
                    store: {},
                    bind: {
                        value: '{theCardEdit.place_id}'
                    },
                },
                {
                    xtype: 'displayfield',
                    required: true,
                    label: i18n.gettext('Document'),
                    bind: {
                        value: '{theCardEdit.doc_number}',
                    },
                },
                {
                    xtype: 'displayfield',
                    width: 150,
                    label: i18n.gettext('Date'),
                    bind: {
                        value: '{theCardEdit.doc_date}',
                    }
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'numberfield',
                            margin: '0 20 0 0',
                            width: 140,
                            label: i18n.gettext('Amount'),
                            required: true,
                            minValue: 0.01,
                            bind: {
                                value: '{theCardEdit.price_total}',
                            },
                        },
                        {
                            xtype: 'numberfield',
                            width: 140,
                            label: i18n.gettext('Tax total'),
                            bind: {
                                value: '{theCardEdit.tax_total}',
                            },
                        },
                    ]
                },
                {
                    xtype: 'textfield',
                    label: i18n.gettext('Comment'),
                    bind: {
                        value: '{theCardEdit.comment}',
                    },
                },
                {
                    xtype: 'togglefield',
                    labelAlign: 'right',
                    width: 200,
                    labelWidth: 150,
                    label: i18n.gettext('Enable VAT taxes'),
                    // boxLabel: i18n.gettext('Used when printing invoices and calculate taxes'),
                    bind: {
                        value: '{theCardEdit.tax_refund}'
                    }
                },
                {
                    xtype: 'togglefield',
                    labelAlign: 'right',
                    width: 200,
                    labelWidth: 150,
                    label: i18n.gettext('Enable Paid'),
                    // boxLabel: i18n.gettext('Used when printing invoices and calculate taxes'),
                    bind: {
                        value: '{theCardEdit.paid}'
                    }
                },

            ]
        }
    ],
    buttonAlign: 'center',
    buttons: [
        {
            xtype: 'button',
            text: i18n.gettext('Cancel'),
            iconCls: 'x-fa fa-times red',
            handler: 'onCancel'
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Save'),
            bind: {
                hidden: '{no_inv_expense_edit}'
            },
            handler: 'onSaveEdit'
        }
    ]
});
