Ext.define('Erp.view.sell.card.edit.ReturnSelling', {
    extend: 'Erp.base.ToolTip',
    xtype: 'sell_card_return_invoice',
    autoSize: true,
    session: true,
    align: 't50-b50',
    title: i18n.gettext('Do you want to return this selling?'),
    items: [
        {
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'textareafield',
                    required: true,
                    label: i18n.gettext('Enter the reason for returning'),
                    bind: {
                        value: '{bills_reason}'
                    },
                    validators: {
                        type: 'length',
                        min: 2
                    }
                },
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    xtype: 'button',
                    margin: '0 15 0 0',
                    cls: 'size-12 red',
                    iconCls: 'x-fa fa-times red',
                    text: i18n.gettext('No cancel'),
                    handler(btn){
                        const tt = btn.up('sell_card_return_invoice');
                        const form = tt.down('formpanel');
                        form.reset();
                        tt.hide();
                    }
                },
                {
                    xtype: 'button',
                    ui: 'alt confirm',
                    text: i18n.gettext('Start returning'),
                    handler: 'saveReturnSelling',
                }
            ]
        }
    ]
});
