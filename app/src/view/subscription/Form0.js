Ext.define('Erp.view.subscription.Form0', {
    extend: 'Ext.Container',
    xtype: 'subscription_form0',
    items: [
        {
            xtype: 'container',
            //width: 800,
            reference: 'tariff_pos',
            items: [
                {
                    xtype: 'head2',
                    items: [
                        {
                            xtype: 'label',
                            flex: 1,
                            cls: 'title',
                            html: i18n.gettext('Subscription payment'),
                        }
                    ]
                },{
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'container',
                            width: 500,
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            cls: 'bolder',
                                            bind: {
                                                html: '{tariff_pos.prod_name}'
                                            }
                                        },{
                                            xtype: 'label',
                                            width: 100,
                                            cls: 'text-right bolder',
                                            html: i18n.gettext('Price')
                                        }
                                    ]
                                },{
                                    xtype: 'container',
                                    margin: '5 0',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            cls: 'size-14',
                                            bind: {
                                                html: '{tariff_pos.price_name}'
                                            }
                                        },{
                                            xtype: 'label',
                                            width: 100,
                                            cls: 'text-right size-14',
                                            bind: {
                                                html: `{tariff_pos.price:eurMoney}`,
                                            }
                                        }
                                    ]
                                },{
                                    xtype: 'container',
                                    margin: '10 0',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            html: i18n.gettext('Quantity of POS'),
                                        },{
                                            xtype: 'label',
                                            width: 100,
                                            cls: 'text-right',
                                            bind: {
                                                html: `{tariff_count_pos}`,
                                            }
                                        }
                                    ]
                                },{
                                    xtype: 'container',
                                    margin: '10 0',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            cls: 'text-right size-15 bolder',
                                            html: `${i18n.gettext('Total price')}:`,
                                        },{
                                            xtype: 'label',
                                            width: 100,
                                            cls: 'text-right size-15 bolder',
                                            bind: {
                                                html: `{tariff_total_price:eurMoney}`,
                                            }
                                        }
                                    ]
                                },{
                                    xtype: 'container',
                                    reference: 'pos_payment_start_btn',
                                    bind: {
                                        hidden: '{pos_payment_start_hide}',
                                    },
                                    margin: '10 0',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            ui: 'alt confirm',
                                            text: i18n.gettext('Start subscription'),
                                            handler: 'startPayment'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 0 20',
                            cls: 'size-15 justify',
                            width: 300,
                            html: i18n.gettext('The subscription will be paid every month until you stop it. When you change the number of POS, the subscription price also changes.')
                        }
                    ]
                },{
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'formpanel',
                            hidden: true,
                            width: 500,
                            reference: 'pos_payment_method',
                            bind: {
                                hidden: '{pos_payment_method_hide}',
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'bolder size-14',
                                            html: i18n.gettext('Customer information')
                                        },{
                                            xtype: 'textfield',
                                            required: true,
                                            label: i18n.gettext('Full name'),
                                            bind: {
                                                value: '{pos_payment_data.customer_name}'
                                            }
                                        },{
                                            xtype: 'emailfield',
                                            required: true,
                                            validators: 'email',
                                            label: i18n.gettext('Email'),
                                            bind: {
                                                value: '{pos_payment_data.customer_email}'
                                            }
                                        }
                                    ]
                                },{
                                    xtype: 'container',
                                    margin: '10 0 0 0',
                                    cls: 'bolder size-14',
                                    html: i18n.gettext('Select a Payment Method')
                                },{
                                    xtype: 'container',
                                    reference: 'pos_payment_method_btn',
                                    margin: '15 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [

                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            width: 500,
                            reference: 'subscription_container_card',
                            bind: {
                                hidden: '{pos_payment_card_hide}',
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    cls: 'bolder size-15',
                                    margin: '10 0',
                                    html: i18n.gettext('Enter your card details')
                                },{
                                    xtype: 'formpanel',
                                    reference: 'pos_subscription_form_card',
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '10 0',
                                            cls: 'bolder size-14',
                                            html: i18n.gettext('FULL NAME *'),
                                        },{
                                            xtype: 'textfield',
                                            required: true,
                                            bind: {
                                                value: '{pos_payment_data.customer_name}'
                                            }
                                        },{
                                            xtype: 'container',
                                            margin: '10 0',
                                            cls: 'bolder size-14',
                                            html: i18n.gettext('CARD *'),
                                        },{
                                            xtype: 'container',
                                            padding: '8 12',
                                            style: {
                                                border: '1px #3392CA solid',
                                                borderRadius: '5px',
                                            },
                                            html: '<div id="subscription-element-card"></div>'
                                        },{
                                            xtype: 'container',
                                            height: 26,
                                            cls: 'red',
                                            bind: {
                                                html: '{element_card_error}'
                                            }
                                        },{
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    ui: 'action',
                                                    text: i18n.gettext('Pay subscription'),
                                                    handler: 'startSubscribeCard'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            reference: 'subscription_container_sepa',
                            bind: {
                                hidden: '{pos_payment_sepa_hide}',
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    cls: 'bolder size-15',
                                    margin: '10 0',
                                    html: i18n.gettext('Enter your bank account details')
                                },{
                                    xtype: 'formpanel',
                                    reference: 'pos_subscription_form_sepa',
                                    items: [
                                        {
                                            xtype: 'container',
                                            width: 800,
                                            margin: '10 0',
                                            cls: 'justify',
                                            html: '<span id="mandate-acceptance">'+
                                                i18n.gettext(`By providing your payment information and confirming this payment, you authorise (A) Voita ERP and Stripe, our payment service provider and/or PPRO, its local service provider, to send instructions to your bank to debit your account and (B) your bank to debit your account in accordance with those instructions.`)+
                                                ' ' +
                                                i18n.gettext(`As part of your rights, you are entitled to a refund from your bank under the terms and conditions of your agreement with your bank. A refund must be claimed within 8 weeks starting from the date on which your account was debited.`) +
                                                ' ' +
                                                i18n.gettext(`Your rights are explained in a statement that you can obtain from your bank.`) + ' ' +
                                                i18n.gettext(`You agree to receive notifications for future debits up to 2 days before they occur.`) +
                                                '</span>'
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '10 0',
                                            cls: 'bolder size-14',
                                            html: i18n.gettext('IBAN *'),
                                        },{
                                            xtype: 'container',
                                            width: 500,
                                            padding: '8 12',
                                            style: {
                                                border: '1px #3392CA solid',
                                                borderRadius: '5px',
                                            },
                                            html: '<div id="subscription-element-sepa"></div>'
                                        },{
                                            xtype: 'container',
                                            width: 500,
                                            height: 26,
                                            cls: 'red',
                                            bind: {
                                                html: '{element_iban_error}'
                                            }
                                        },{
                                            xtype: 'container',
                                            width: 500,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    ui: 'action',
                                                    text: i18n.gettext('Pay subscription'),
                                                    handler: 'startSubscribeSepa'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },{
                    xtype: 'container',
                    cls: 'border-bottom',
                }
            ]
        }
    ]
});