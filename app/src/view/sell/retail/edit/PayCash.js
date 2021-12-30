Ext.define('Erp.view.sell.retail.edit.PayCash', {
    extend: 'Erp.base.ToolTip',
    xtype: 'sell_retail_paycash',
    reference: 'sell_retail_paycash',
    align: 't50-b50',
    requires: [
        'Erp.util.Nominal'
    ],
    listeners: {
        show: 'onPayCashShow'
    },
    width: 650,
    title: i18n.gettext('Select the bills or specify the amount'),
    items: [
        {
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '10 0',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            width: 200,
                                            label: `<b>${i18n.gettext('Amount received')}</b>`,
                                            required: true,
                                            bind: {
                                                value: '{pay_cash.nominal}',
                                                minValue: '{pay_cash.price_total}'
                                            },
                                        }
                                    ]
                                },{
                                    xtype: 'container',
                                    docked: 'bottom',
                                    margin: '0 0 10 0',
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '10 0',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    cls: 'size-16 bolder blue',
                                                    html: `${i18n.gettext('Total price')}:`
                                                }, {
                                                    xtype: 'label',
                                                    width: 100,
                                                    cls: 'size-18 bolder text-right blue',
                                                    bind: {
                                                        html: '{bill_price_total:erpMoney}'
                                                    }
                                                }
                                            ]
                                        }, {
                                            xtype: 'container',
                                            margin: '10 0',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    cls: 'size-16 bolder green-dark',
                                                    html: `${i18n.gettext('Received')}:`
                                                }, {
                                                    xtype: 'label',
                                                    width: 100,
                                                    cls: 'size-18 bolder text-right green-dark',
                                                    bind: {
                                                        html: '{pay_cash.nominal:number("0.00")}'
                                                    }
                                                }
                                            ]
                                        },{
                                            xtype: 'container',
                                            margin: '10 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    cls: 'size-16 bolder red',
                                                    html:`${i18n.gettext('Give change')}:`
                                                },{
                                                    xtype: 'label',
                                                    width: 100,
                                                    cls: 'size-18 bolder text-right red',
                                                    bind: {
                                                        html: '{((pay_cash.nominal - pay_cash.price_total) > 0 ? pay_cash.nominal - pay_cash.price_total : 0.00 ):number("0.00")}'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }, {
                            xtype: 'container',
                            reference: 'paycash_nominal',
                            cls: 'text-center',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '10 0 0 0',
                                    cls: 'text-center size-15 bolder',
                                    html: i18n.gettext('Coin'),
                                }, {
                                    xtype: 'fieldset',
                                    cls: 'button-group',
                                    reference: 'paycash_coins',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center',
                                        wrap: true
                                    },
                                    defaults: {
                                        xtype: 'button',
                                        width: 100,
                                        margin: '1',
                                        handler: 'clickNominal',
                                    },
                                    items: []
                                }, {
                                    xtype: 'container',
                                    margin: '10 0 0 0',
                                    cls: 'text-center size-15 bolder',
                                    html: i18n.gettext('Bill'),
                                }, {
                                    xtype: 'fieldset',
                                    cls: 'button-group',
                                    reference: 'paycash_papers',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center',
                                        wrap: true
                                    },
                                    defaults: {
                                        xtype: 'button',
                                        margin: '1',
                                        width: 100,
                                        handler: 'clickNominal',
                                    },
                                    items: []
                                }
                            ]
                        },
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
                btn.up('sell_retail_paycash').hide();
            }
        },
        {
            xtype: 'button',
            iconCls: 'x-fa fa-print green-dark',
            text: i18n.gettext('Save and print'),
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
           //console.('onPayCashShow', cmp, nominal);
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
                if(value > 0.99) {
                    text_val = value;
                    text_coin = nominal.paper;
                }
                fsCoins.add({
                    nominal: value,
                    text: Ext.String.format('{0} {1}', text_val, text_coin)
                });
            });
            vm.set('pay_cash.price_total', vm.get('bill_price_total'));

        },
        clickNominal(btn) {
            const vm = this.getViewModel();
            vm.set('pay_cash.nominal', vm.get('pay_cash.nominal') + btn.nominal);
        },
        savePayCash(btn) {
            const view = this.getView();
            view.fireEvent('onSavePay', view);
        }
    }
});
