Ext.define('Erp.view.subscription.SubsData', {
    extend: 'Ext.Container',
    xtype: 'subscription_subsdata',
    layout: 'fit',
    items: [
        {
            xtype: 'container',
            layout: 'fit',
            /*layout: {
                type: 'vbox'
            },*/
            items: [
                {
                    xtype: 'container',
                    //minHeight: 600,
                    scrollable: true,
                    margin: '0 0 15 0',
                    layout: {
                        type: 'hbox'
                    },
                    //flex: 1,
                    items: [
                        {
                            xtype: 'container',
                            width: 500,
                            items: [
                                {
                                    xtype: 'head2',
                                    items: [
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            cls: 'title',
                                            html: i18n.gettext('Your subscriptions information'),
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 5 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'size-14',
                                            width: 180,
                                            html: `${i18n.gettext('Product name / plan')}:`
                                        },{
                                            xtype: 'container',
                                            cls: 'bolder size-14',
                                            bind: {
                                                html: '{subsData.prod_name} / {subsData.price_name}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '5 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'size-14',
                                            width: 180,
                                            html: `${i18n.gettext('Price per POS')}:`
                                        },{
                                            xtype: 'container',
                                            cls: 'size-14',
                                            bind: {
                                                html: '{subsData.price:eurMoney}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '5 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'size-14',
                                            width: 180,
                                            html: `${i18n.gettext('Number of POS')}:`
                                        },{
                                            xtype: 'container',
                                            cls: 'size-14',
                                            bind: {
                                                html: '{subsData.quantity}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '5 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'size-14',
                                            width: 180,
                                            html: `${i18n.gettext('Last paid')}:`
                                        },{
                                            xtype: 'container',
                                            cls: 'size-14',
                                            bind: {
                                                html: `{subsData.last_paid:date("Y-m-d H:i")}`
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '5 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'size-14',
                                            width: 180,
                                            html: `${i18n.gettext('Subscription status')}:`
                                        },{
                                            xtype: 'container',
                                            bind: {
                                                html: `{subsData.status_text}`,
                                                cls: `{subsData.status_cls}`,
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '5 0',
                                    hidden: true,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    bind: {
                                        hidden: '{!subsData.cancel_start}'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'size-14',
                                            width: 180,
                                            html: `${i18n.gettext('Cancellation date')}:`
                                        },{
                                            xtype: 'container',
                                            cls: 'bolder size-15 red',
                                            bind: {
                                                html: `{subsData.cancel_date}`,
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '5 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'bolder size-15',
                                            width: 180,
                                            html: `${i18n.gettext('Subscription price')}:`
                                        },{
                                            xtype: 'container',
                                            cls: 'bolder size-15',
                                            bind: {
                                                html: `{subsData.total:eurMoney}`
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '15 0',
                                    cls: 'blue size-14 justify',
                                    html: i18n.gettext('When you will change the number of POS, the quantity and total amount in the subscription will be changed for next payment.')
                                },
                                {
                                    xtype: 'container',
                                    //docked: 'bottom',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'end',
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            bind: {
                                                hidden: '{subsData.hide_cancel}'
                                            },
                                            ui: 'alt decline',
                                            text: i18n.gettext('Cancel subscription'),
                                            handler: 'startCancelPosSubs'
                                        },{
                                            xtype: 'button',
                                            hidden: true,
                                            bind: {
                                                hidden: '{subsData.hide_renew}'
                                            },
                                            ui: 'alt confirm',
                                            text: i18n.gettext('Renew subscription'),
                                            handler: 'startRenewPosSubs'
                                        },{
                                            xtype: 'button',
                                            hidden: true,
                                            bind: {
                                                hidden: '{subsData.hide_change_method}'
                                            },
                                            ui: 'action',
                                            text: i18n.gettext('Change payment method'),
                                            handler: 'changePaymentPosSubs'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    //docked: 'bottom',
                                    bind: {
                                        hidden: '{subsData.hide_cancel}'
                                    },
                                    margin: '15 0',
                                    cls: 'red justify size-14',
                                    html: i18n.gettext(`Attention! If you cancel your subscription, you will switch to the free mode with many disabled features.`)+ ' ' +
                                        i18n.gettext(`In the free mode, you will always have access to only the Company, Catalog, POS and Selling List functions.`)
                                },
                                /*{
                                    xtype: 'container',
                                    //docked: 'bottom',
                                    hidden: true,
                                    bind: {
                                        hidden: '{subsData.hide_change_method}'
                                    },
                                    margin: '15 0',
                                    cls: 'red justify size-14',
                                    html: i18n.gettext(`Sorry! Your subscription is incomplete, and you need change payment method and try to pay.`)
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    bind: {
                                        hidden: '{subsData_pos_methods_hide}'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '10 0 0 0',
                                            cls: 'bolder size-14',
                                            html: i18n.gettext('Select a Payment Method')
                                        },{
                                            xtype: 'container',
                                            reference: 'subsData_pos_method_btns',
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
                                    reference: 'subsData_container_card',
                                    bind: {
                                        hidden: '{subsData_card_hide}',
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'bolder size-15',
                                            margin: '10 0',
                                            html: i18n.gettext('Enter your card details')
                                        },{
                                            xtype: 'formpanel',
                                            reference: 'subsData_form_card',
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
                                                        value: '{subsData.customer_name}'
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
                                                    html: '<div id="subsData-element-card"></div>'
                                                },{
                                                    xtype: 'container',
                                                    height: 26,
                                                    cls: 'red',
                                                    bind: {
                                                        html: '{subsData_card_error}'
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
                                                            text: i18n.gettext('Save payment method'),
                                                            handler: 'sendUpdateStripeCard'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },*/
                            ]
                        },
                        {
                            xtype: 'grid',
                            margin: '0 0 0 20',
                            width: 520,
                            scrollable: 'y',
                            reserveScrollbar: true,
                            autoSize: true,
                            plugins: {
                                gridpagingtoolbar: true
                            },
                            bind: {
                                store: '{invoice_list_store}',
                            },
                            items: [
                                {
                                    xtype: 'head2',
                                    items: [
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            cls: 'title',
                                            html: i18n.gettext('Invoices'),
                                        }
                                    ]
                                }
                            ],
                            columns: [
                                {
                                    menu: false,
                                    text: i18n.gettext('Number / Date'),
                                    tpl: `<a href="{inv_url}" target="_blank"><b>{inv_number}</b></a><div>{date_create_text}</div>`,
                                    minWidth: 150,
                                    flex: 1,
                                    cell: {
                                        encodeHtml: false
                                    }
                                },{
                                    menu: false,
                                    text: i18n.gettext('Status'),
                                    align: 'center',
                                    width: 80,
                                    cell: {
                                        align: 'center',
                                        encodeHtml: false
                                    },
                                    renderer(value, record, dataIndex, cell) {
                                        cell.setUserCls(record.get('status_cls'));
                                        return record.get('status_text');
                                    },
                                },{
                                    menu: false,
                                    text: i18n.gettext('Amount'),
                                    tpl: `{total:eurMoney}`,
                                    align: 'right',
                                    width: 80,
                                    cell: {
                                        align: 'right',
                                        encodeHtml: false
                                    }
                                },{
                                    menu: false,
                                    text: i18n.gettext('Download'),
                                    tpl: `<a href="{inv_pdf}" target="_blank"><b>PDF</b></a>`,
                                    align: 'center',
                                    width: 90,
                                    cell: {
                                        align: 'center',
                                        encodeHtml: false
                                    }
                                }
                            ]
                        },

                    ]
                }/*,{
                    xtype: 'container',
                    cls: 'border-top',
                    minHeight: 200,
                    flex: 1,
                    html: ''
                }*/
            ]
        }
    ]
});