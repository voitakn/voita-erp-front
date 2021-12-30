Ext.define('Erp.view.purchase.card.edit.PaidForm', {
    extend: 'Erp.base.ToolTip',
    xtype: 'buy_edit_paid',
    reference: 'buy_edit_paid',
    align: 't50-b50',
    title: i18n.gettext('Payment Information'),
    items: [
        {
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'selectfield',
                    editable: false,
                    label: i18n.gettext('Payment type'),
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'text',
                    forceSelection: true,
                    required: true,
                    store: {
                        data: [
                            {id: 'cash', text: i18n.gettext('Cash')},
                            {id: 'bank', text: i18n.gettext('Bank')}
                        ]
                    },
                    bind: {
                        value: '{paid_params.paid_type}'
                    }
                },{
                    xtype: 'textfield',
                    label: i18n.gettext('Payment number'),
                    required: true,
                    clearable: true,
                    bind: {
                        value: '{paid_params.paid_doc}',
                    },
                },{
                    xtype: 'datefield',
                    label: i18n.gettext('Date of payment'),
                    dateFormat: 'Y-m-d',
                    maxDate: new Date(),
                    required: true,
                    clearable: true,
                }
            ]
        }
    ],
    buttonAlign: 'center',
    buttons: [{
        xtype: 'button',
        iconCls: 'x-fa fa-times red',
        text: i18n.gettext('Cancel'),
        handler: function(btn){
            btn.up('buy_edit_paid').hide();
        }
    }, {
        xtype: 'button',
        margin: '0 0 0 15',
        iconCls: 'fi-save green-dark',
        text: i18n.gettext('Save'),
        handler: 'savePaidParams'
    }]
});
