Ext.define('Erp.view.sell.pos_sell.edit.PayCash', {
    extend: 'Erp.base.Dialog',
    xtype: 'pos_sell_paycash',
    reference: 'pos_sell_paycash',
    requires: [
        'Erp.util.Nominal'
    ],
    listeners: {
        show: 'onPayCashShow'
    },
    bodyPadding: '0 20 0 20',
    width: 700,
    title: i18n.gettext('Cash payment'),
    scrollable: true,
    items: [
        {
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'label',
                    flex: 1,
                    margin: '0 10 0 10',
                    cls: 'size-14 bolder text-center',
                    html: `${i18n.gettext('To add payment select banknotes and coins or enter field Received amount!')}`
                },
                {
                    xtype: 'container',
                    reference: 'paycash_nominal',
                    cls: 'text-center',
                    flex: 1,
                    items: [
                        {
                            xtype: 'container',
                            margin: '10 0 0 0',
                            cls: 'text-center size-16 bolder',
                            html: i18n.gettext('Coins'),
                        },
                        {
                            xtype: 'fieldset',
                            cls: 'button-group',
                            margin: '0 60 0 60',
                            reference: 'paycash_coins',
                            layout: {
                                type: 'hbox',
                                pack: 'center',
                                wrap: true
                            },
                            defaults: {
                                xtype: 'button',
                                width: 120,
                                ui: 'alt action',
                                margin: '1',
                                handler: 'clickNominal',
                            },
                            items: []
                        },
                        {
                            xtype: 'container',
                            margin: '10 0 0 0',
                            cls: 'text-center size-16 bolder',
                            html: i18n.gettext('Banknotes'),
                        },
                        {
                            xtype: 'fieldset',
                            cls: 'button-group',
                            margin: '0 60 0 60',
                            reference: 'paycash_papers',
                            layout: {
                                type: 'hbox',
                                pack: 'center',
                                wrap: true
                            },
                            defaults: {
                                xtype: 'button',
                                ui: 'alt action',
                                margin: '1',
                                width: 120,
                                handler: 'clickNominal',
                            },
                            items: []
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '10 0',
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'center'
                    },
                    height: 100,
                    items: [
                        {
                            xtype: 'container',
                            cls: 'size-16 bolder text-center',
                            html: `${i18n.gettext('Received amount')}`
                        },
                        {
                            xtype: 'numberfield',
                            reference: 'received_nominal',
                            ui: 'payment',
                            shadow: true,
                            textAlign: 'center',
                            width: 150,
                            clearable: true,
                            bind: {
                                value: '{pay_cash.nominal}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'container',
                            cls: 'red-dark-bg white',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '15 0 0 0',
                                    cls: 'size-18 bolder',
                                    html: `${i18n.gettext('Need to pay')}:`
                                },
                                {
                                    xtype: 'container',
                                    margin: '15 0 15 0',
                                    cls: 'size-26 bolder',
                                    bind: {
                                        html: '{bill_price_total:erpMoney}'
                                    }
                                }
                            ]
                        }, {
                            xtype: 'container',
                            cls: 'green-dark-bg white',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '15 0 0 0',
                                    cls: 'size-18 bolder',
                                    html: `${i18n.gettext('Paid')}:`
                                },
                                {
                                    xtype: 'container',
                                    cls: 'size-26 bolder',
                                    margin: '15 0 15 0',
                                    bind: {
                                        html: '{pay_cash.nominal:erpMoney}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'gray-bg white',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '15 0 0 0',
                                    cls: 'size-18 bolder',
                                    html: `${i18n.gettext('Delivery')}:`
                                },
                                {
                                    xtype: 'container',
                                    cls: 'size-26 bolder',
                                    margin: '15 0 15 0',
                                    bind: {
                                        html: '{((pay_cash.nominal - pay_cash.price_total) > 0 ? pay_cash.nominal - pay_cash.price_total : 0.00 ):erpMoney}'
                                    }
                                }
                            ]
                        },

                    ]
                }
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
                btn.up('pos_sell_paycash').hide();
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
            handler: 'savePayCash',
            disabled: true,
            bind: {
                disabled: '{pay_cash.nominal < pay_cash.price_total}'
            }
        },
    ],
    controller: {
        onPayCashShow(cmp) {
            const vm = this.getViewModel();
            const fsPapers = cmp.lookup('paycash_papers');
            const fsCoins = cmp.lookup('paycash_coins');
            const currs = User.currency();
            const nominal = Nominal[currs];
            const received_nominal = cmp.lookup('received_nominal');
            //console.log('onPayCashShow', cmp, nominal);
            fsPapers.removeAll();
            fsCoins.removeAll();
            Ext.Array.each(nominal.papers, (value) => {
                fsPapers.add({
                    nominal: value,
                    text: Ext.String.format('{0} {1}', value, nominal.paper)
                });
            });
            Ext.Array.each(nominal.coins, (value) => {
                let text_val = value * 100;
                let text_coin = nominal.coin;
                if (value > 0.99) {
                    text_val = value;
                    text_coin = nominal.paper;
                }
                fsCoins.add({
                    nominal: value,
                    text: Ext.String.format('{0} {1}', text_val, text_coin)
                });
            });
            vm.set('pay_cash.price_total', vm.get('bill_price_total'));
            received_nominal.focus();
        },
        clickNominal(btn) {
            const vm = this.getViewModel();
            vm.set('pay_cash.nominal', vm.get('pay_cash.nominal') + btn.nominal);
           //console.('clickNominal pay_cash.nominal', vm.get('pay_cash.nominal'));
        },
        savePayCash(btn) {
            const view = this.getView();
            view.fireEvent('onSavePayCash', view);
        }
    }
});
