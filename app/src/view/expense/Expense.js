Ext.define('Erp.view.expense.Expenses', {
    extend: 'Erp.base.Module',
    xtype: 'expenses',
    reference: 'expenses',
    autoSize: true,
    session: true,
    scrollable: 'y',
    viewModel: {
        type: 'expenses_vm'
    },
    controller: 'expenses_ctrl',
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
