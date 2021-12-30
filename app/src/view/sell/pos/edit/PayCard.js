Ext.define('Erp.view.sell.pos.edit.PayCard', {
    extend: 'Erp.base.Dialog',
    xtype: 'sell_pos_paycard',
    reference: 'sell_pos_paycard',
    listeners: {
        show: 'onPayCardShow'
    },
    width: 400,
    title: i18n.gettext('Payment by bank card'),
    items: [
        {
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'container',
                    cls: 'red-dark-bg white',
                    margin: '0 0 10 0',
                    items: [
                        {
                            xtype: 'container',
                            margin: '20',
                            layout: {
                                type: 'hbox',
                                pack: 'start',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'size-16 bolder',
                                    html: `${i18n.gettext('Need to pay')}:`
                                },
                                {
                                    xtype: 'label',
                                    width: 100,
                                    cls: 'size-26 bolder text-right',
                                    bind: {
                                        html: '{bill_price_total:erpMoney}'
                                    }
                                }
                            ]

                        },
                    ]
                },
                {
                    xtype: 'label',
                    flex: 1,
                    margin: '0 10 0 10',
                    cls: 'size-14 bolder text-center red',
                    html: `${i18n.gettext('First complete the payment process in the bank terminal!')}`
                },
                {
                    xtype: 'container',
                    margin: '10 0',
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'label',
                            flex: 1,
                            cls: 'size-14 bolder text-left',
                            html: `${i18n.gettext('Bank payment number')}`
                        },
                        {
                            xtype: 'textfield',
                            reference: 'number_field',
                            cls: 'bolder text-right',
                            width: 150,
                            clearable: true,
                            ui: 'payment',
                            bind: {
                                value: '{pay_card.pay_number}',
                            }
                        }
                    ]
                },
            ]
        }
    ],
    buttonAlign: 'left',
    buttons: [
        {
            xtype: 'button',
            margin: '0 0 10 0',
            cls: 'size-12 bg-danger white',
            iconCls: 'x-fa fa-times white size-24',
            iconAlign: 'bottom',
            text: i18n.gettext('Cancel'),
            handler: function (btn) {
                btn.up('sell_pos_paycard').hide();
            }
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'button',
            margin: '0 0 10 0',
            cls: 'size-12 green-dark-bg white',
            iconCls: 'x-fa fa-print white size-24',
            text: i18n.gettext('Save & Print'),
            iconAlign: 'bottom',
            handler: 'savePayCard',
        },
    ],
    controller: {
        onPayCardShow(cmp) {
            const number_field = cmp.lookup('number_field');
            number_field.focus();
        },
        savePayCard(btn) {
            const view = this.getView();
            view.fireEvent('onSavePayCard', view);
        }
    }
});
