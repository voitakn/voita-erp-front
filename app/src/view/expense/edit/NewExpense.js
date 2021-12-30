Ext.define('Erp.view.expense.edit.NewExpense', {
    extend: 'Erp.base.ToolTip',
    xtype: 'expense_new',
    reference: 'expense_new',
    align: 't50-b50',
    title: i18n.gettext('New expense'),
    items: [
        {
            xtype: 'formpanel',
            width: 250,
            items: [
                {
                    xtype: 'textfield',
                    required: true,
                    label: i18n.gettext('Expense name'),
                    bind: {
                        value: '{newExpense.title}',
                    },
                },{
                    xtype: 'datefield',
                    label: i18n.gettext('Date'),
                    dateFormat: 'Y-m-d',
                    maxDate: new Date(),
                    required: true,
                    editable: false,
                    clearable: true,
                    bind: {
                        value: '{newExpense.date_create}',
                    }
                },{
                    xtype: 'numberfield',
                    label: i18n.gettext('Amount'),
                    required: true,
                    minValue: 0.01,
                    bind: {
                        value: '{newExpense.amount}',
                    },
                }
            ]
        }
    ],
    buttonAlign: 'center',
    buttons: {
        cancel: {
            margin: '0 15 0 0',
            iconCls: 'x-fa fa-times red',
            text: i18n.gettext('Cancel'),
            handler: function(btn){
                btn.up('expense_new').hide();
            }
        },
        ok: {
            iconCls: 'fi-save green-dark',
            text: i18n.gettext('Add'),
            hidden: true,
            bind: {
                hidden: '{no_inv_buy_create}'
            },
            handler: 'saveNew'
        }
    },
});
