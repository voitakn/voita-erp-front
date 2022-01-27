Ext.define('Erp.view.expense.edit.ViewExpense', {
    extend: 'Erp.base.Dialog',
    xtype: 'expense_view',
    reference: 'expense_view',
    align: 't50-b50',
    title: i18n.gettext('View expense'),
    listeners: {
        onCancel: 'onCancelView'
    },
    closable: true,
    width: 400,
    items: [
        {
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'displayfield',
                    label: i18n.gettext('Point of sale'),
                    bind: {
                        value: '{theCardView.place_id}'
                    },
                },
                {
                    xtype: 'displayfield',
                    required: true,
                    label: i18n.gettext('Document'),
                    bind: {
                        value: '{theCardView.doc_number}',
                    },
                },
                {
                    xtype: 'displayfield',
                    width: 150,
                    label: i18n.gettext('Date'),
                    bind: {
                        value: '{theCardView.doc_date}',
                    }
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'displayfield',
                            margin: '0 20 0 0',
                            width: 140,
                            label: i18n.gettext('Amount'),
                            required: true,
                            minValue: 0.01,
                            bind: {
                                value: '{theCardView.price_total}',
                            },
                        },
                        {
                            xtype: 'displayfield',
                            width: 140,
                            label: i18n.gettext('Tax total'),
                            bind: {
                                value: '{theCardView.tax_total}',
                            },
                        },
                    ]
                },
                {
                    xtype: 'displayfield',
                    label: i18n.gettext('Comment'),
                    bind: {
                        value: '{theCardView.comment}',
                    },
                },
                {
                    xtype: 'togglefield',
                    labelAlign: 'right',
                    width: 200,
                    readOnly: true,
                    labelWidth: 150,
                    label: i18n.gettext('Enable VAT taxes'),
                    bind: {
                        value: '{theCardView.tax_refund}'
                    }
                },
                {
                    xtype: 'togglefield',
                    labelAlign: 'right',
                    width: 200,
                    readOnly: true,
                    labelWidth: 150,
                    label: i18n.gettext('Enable Paid'),
                    bind: {
                        value: '{theCardView.paid}'
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
            handler: 'onCancelView'
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Save'),
            bind: {
                hidden: '{no_inv_expense_edit}'
            },
            handler: 'onSaveView'
        }
    ]
});
