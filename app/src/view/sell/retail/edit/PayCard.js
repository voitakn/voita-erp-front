Ext.define('Erp.view.sell.retail.edit.PayCard', {
    extend: 'Erp.base.ToolTip',
    xtype: 'sell_retail_paycard',
    reference: 'sell_retail_paycard',
    align: 't50-b50',
    title: i18n.gettext('Payment by credit card'),
    items: [
        {
            xtype: 'formpanel',
            width: 500,
            items: [
                {
                    xtype: 'container',
                    margin: '10 0',
                    cls: 'text-center size-18 green-dark bolder',
                    html: i18n.gettext('Total price')
                },{
                    xtype: 'container',
                    margin: '10 0',
                    cls: 'text-center size-20 green-dark bolder',
                    bind: {
                        html: '{pay_price_total}'
                    }
                },{
                    xtype: 'container',
                    margin: '10 0',
                    cls: 'text-center red size-18 bolder',
                    html: Ext.String.format('<b>{0}</b>', i18n.gettext('Attention!'))
                },{
                    xtype: 'container',
                    margin: '10 0',
                    cls: 'text-center red size-16 bolder',
                    html: i18n.gettext('First complete the payment process in the terminal!')
                },{
                    xtype: 'segmentedbutton',
                    margin: '10 0',
                    reference: 'choose_card_type',
                    bind: {
                        value: '{pay_card.pay_type}'
                    },
                    defaults: {
                        iconAlign: 'bottom',
                        margin: '10 5',
                        ui: 'raised',
                        border: 1
                    },
                    items: [
                        {text: 'VISA', value: 'card_visa', iconCls: 'x-fab fa-cc-visa'},
                        {text: 'MASTERCARD', value: 'card_master', iconCls: 'x-fab fa-cc-mastercard'},
                        {text: i18n.gettext('Other'), value: 'card_other', iconCls: 'x-fa fa-credit-card'},
                    ]
                },{
                    xtype: 'container',
                    layout: 'center',
                    margin: '10 0',
                    cls: 'text-center size-16 bolder red',
                    html: i18n.gettext('Does the payment by terminal successful?'),
                    items: [
                        {
                            xtype: 'togglefield',
                            reference: 'card_pay_success_btn',
                            boxLabel: i18n.gettext('Yes!'),
                            disabled: true,
                            bind: {
                                value: '{pay_card.pay_success}',
                                disabled: '{!pay_card.pay_type}'
                            }
                        }
                    ]
                },{
                    xtype: 'container',
                    hidden: true,
                    items: [
                        {
                            xtype: 'hiddenfield',
                            required: true,
                            bind: {
                                value: '{pay_card.pay_type}'
                            }
                        },{
                            xtype: 'numberfield',
                            required: true,
                            minValue: 1,
                            bind: {
                                value: '{pay_card.pay_success ? 1 : 0}'
                            }
                        },
                    ]
                },{
                    xtype: 'container',
                    cls: 'text-center size-16 bolder red',
                    margin: '10 0',
                    html: i18n.gettext('Please,write the check number from the payment terminal'),
                    items: [
                        {
                            xtype: 'container',
                            layout: 'center',
                            margin: '10 0',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    required: true,
                                    minValue: 1,
                                    placeholder: 'XXXXXX',
                                    disabled: true,
                                    bind: {
                                        value: '{pay_card.pay_number}',
                                        disabled: '{!pay_card.pay_success}'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    buttonAlign: 'center',
    buttons: [
    {
        xtype: 'button',
        margin: '0 15 0 0',
        iconCls: 'x-fa fa-times red',
        text: i18n.gettext('Cancel'),
        handler: function(btn){
            btn.up('sell_retail_paycard').hide();
        }
    }, {
        xtype: 'button',
        iconCls: 'x-fa fa-print green-dark',
        text: i18n.gettext('Save and print'),
        handler: 'savePayCard'
    },
]
});
