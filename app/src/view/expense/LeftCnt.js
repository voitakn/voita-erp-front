Ext.define('Erp.view.expense.LeftCnt', {
    extend: 'Ext.grid.Grid',
    xtype: 'expense_left_cnt',
    autoSize: true,
    scrollable: 'y',
    plugins: {
        gridpagingtoolbar: true
    },
    selectable: {
        columns: false,
        rows: true,
        cells: false,
        checkbox: false,
        headerCheckbox: false,
        extensible: true,
        mode: 'single',
    },
    items: [
        {
            xtype: 'head1',
            items: [{
                xtype: 'label',
                cls: 'title',
                html: i18n.gettext('Expenses')
            },{
                xtype: 'button',
                margin: '0 0 0 20',
                iconCls: 'x-fa fa-plus green-dark',
                text: i18n.gettext('Add new'),
                hidden: true,
                bind: {
                    hidden: '{!micro}'
                },
    
                handler: 'addNewExpense'
            }]
        }
    ],
    bind: {
        store: '{expense_store}',
        selection: '{theCard}',
        //selectable: '{expense_sels}',
    },
    columns: [
        {
            text: i18n.gettext('Title'),
            flex: 1,
            tpl: `<a href="/#expense/{id}"><b>{title}</b></a>`,
            cell: {encodeHtml: false}
        },{
            text: i18n.gettext('Created'),
            flex: 1,
            tpl: `{date_create}`,
            cell: {encodeHtml: false}
        },{
            text: i18n.gettext('Amount'),
            align: 'right',
            dataIndex: 'amount',
            cell: {
                align: 'right',
                encodeHtml: false
            }
        }
    ]

});
