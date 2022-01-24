Ext.define('Erp.view.expense.Expense', {
    extend: 'Erp.base.Module',
    xtype: 'expense',
    reference: 'expense',
    autoSize: true,
    session: true,
    scrollable: 'y',
    viewModel: {
        type: 'expense_vm'
    },
    controller: 'expense_ctrl',
    items: [
        {
            xtype: 'expenses_grid',
            minWidth: 800,
            flex: 1
        },
        {
            xtype: 'expense_new',
        },
        {
            xtype: 'expense_edit',
        }
    ]

});
