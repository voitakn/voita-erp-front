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
    requires: [
        'Erp.view.common.MenuCompany',
    ],
    controller: 'expense_ctrl',
    listeners: {
        resize: 'viewMicro'
    },
    items: [
            {
            xtype: 'navigationview',
            reference: 'expense_card',
            navigationBar: false,
            bind: {
                hidden: '{!micro}'
            },
            items: [
                {
                    xtype: 'expense_right_cnt',
                },{
                    xtype: 'expense_left_cnt',
                    reference: 'expense_card_grid'
                }
            ]
        },{
            xtype: 'container',
            reference: 'expense_hbox',
            layout: {
                type: 'hbox'
            },
            bind: {
                hidden: '{micro}'
            },
            items: [
                {
                    xtype: 'company_menu',
                },
                {
                    xtype: 'expense_left_cnt',
                    reference: 'expense_hbox_grid',
                    width: 600,
                    margin: '0 20 0 0'
                },
                {
                    xtype: 'expense_right_cnt',
                    flex: 1
                }
            ]
        },{
            xtype: 'expense_new',
        }
    ]
});
