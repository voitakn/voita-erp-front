Ext.define('Erp.view.expense.edit.NewExpense', {
    extend: 'Erp.base.ToolTip',
    xtype: 'expense_new',
    reference: 'expense_new',
    align: 't50-b50',
    title: i18n.gettext('New expense'),
    items: [
        {
            xtype: 'formpanel',
            width: 300,
            items: [
                {
                    xtype: 'placebox',
                    reference: 'expenses_new_place_combobox',
                    viewModel: {
                        data: {
                            parent_field: 'newExpense.place_id',
                            forceSelection: true,
                            clearable: true,
                        },
                        links: {
                            place_id: '{newExpense.place_id}'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    required: true,
                    label: i18n.gettext('Document'),
                    bind: {
                        value: '{newExpense.doc_number}',
                    },
                },
                {
                    xtype: 'datefield',
                    width: 150,
                    margin: '0 10 0 0',
                    label: i18n.gettext('Date'),
                    dateFormat: 'Y-m-d',
                    maxDate: new Date(),
                    required: true,
                    editable: false,
                    clearable: true,
                    bind: {
                        value: '{newExpense.doc_date}',
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
                                value: '{newExpense.price_total}',
                            },
                        },
                        {
                            xtype: 'numberfield',
                            width: 140,
                            label: i18n.gettext('Tax total'),
                            bind: {
                                value: '{newExpense.tax_total}',
                            },
                        },
                    ]
                },
                {
                    xtype: 'textfield',
                    label: i18n.gettext('Comment'),
                    bind: {
                        value: '{newExpense.comment}',
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
                        value: '{newExpense.tax_refund}'
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
                        value: '{newExpense.paid}'
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
            handler: 'onCancelNew'
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Save'),
            bind: {
                hidden: '{no_inv_expense_edit}'
            },
            handler: 'onSaveNew'
        }
    ]
});
