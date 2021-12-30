Ext.define('Erp.view.payment.new_pos.Order', {
    extend: 'Erp.base.Module',
    xtype: 'new_pos',
    autoSize: true,
    scrollable: 'y',
    requires: [
        'Erp.view.payment.new_pos.OrderModel',
        'Erp.view.payment.new_pos.OrderCtrl'
    ],
    viewModel: {
        type: 'payment_order_vm'
    },
    controller: 'payment_order_ctrl',
    layout: 'hbox',
    items: [
        {
            xtype: 'company_menu',
        },{
            xtype: 'container',
            flex: 1,
            scrollable: 'y',
            items: [
                {
                    xtype: 'head1',
                    items: [{
                        xtype: 'label',
                        cls: 'title',
                        html: i18n.gettext('Buy subscription for points of sale')
                    }]
                }, {
                    xtype: 'formpanel',
                    reference: 'new_pos_form',
                    width: 400,
                    items: [
                        {
                            xtype: 'container',
                            cls: 'size-18 bolder',
                            margin: '20 0 10 0',
                            html: i18n.gettext('Number of points'),
                        },{
                            xtype: 'container',
                            width: 400,
                            margin: '10 0 20 0',
                            layout: {
                                type: 'hbox',
                                pack: 'end',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    margin: '0 20 0 0',
                                    flex: 1,
                                    cls: 'size-14 bolder blue',
                                    html: `${i18n.gettext('How many additional points of sale do you need?')}`,
                                },
                                {
                                    xtype: 'spinnerfield',
                                    required: true,
                                    placeholder: '0',
                                    clearable: false,
                                    decimals: 0,
                                    minValue: 1,
                                    width: 100,
                                    cls: 'bolder',
                                    bind: {
                                        value: '{order.points_count}'
                                    },
                                }
                            ]
                        },{
                            xtype: 'container',
                            margin: '0 0 20 0',
                            html: i18n.gettext('Remember that the total number of points of sale will be one more, with the main point.')
                        },{
                            xtype: 'container',
                            cls: 'border-bottom'
                        },{
                            xtype: 'container',
                            cls: 'size-18 bolder',
                            margin: '20 0 10 0',
                            html: i18n.gettext('Subscription price'),
                        },{
                            xtype: 'container',
                            width: 400,
                            margin: '20 0',
                            layout: {
                                type: 'hbox',
                                pack: 'end',
                                align: 'middle'
                            },
                            cls: 'size-14 bolder blue',
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    html: `${i18n.gettext('Price per one point per month')}:`,
                                },{
                                    xtype: 'label',
                                    cls: 'text-right size-18',
                                    width: 100,
                                    bind: {html: '{price.month:erpMoney}'},
                                }
                            ]
                        },{
                            xtype: 'container',
                            margin: '0 0 20 0',
                            html: i18n.gettext('You only pay for additional points of sale. The first main point of sale is always free.')
                        },{
                            xtype: 'container',
                            cls: 'border-bottom'
                        },{
                            xtype: 'container',
                            cls: 'size-18 bolder',
                            margin: '20 0 10 0',
                            html: i18n.gettext('Subscription amount'),
                        },{
                            xtype: 'container',
                            width: 400,
                            margin: '20 0',
                            layout: {
                                type: 'hbox',
                                pack: 'end',
                                align: 'middle'
                            },
                            cls: 'size-16 bolder',
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    html: `${i18n.gettext('Amount per month')}:`,
                                },{
                                    xtype: 'label',
                                    cls: 'text-right green-dark',
                                    width: 100,
                                    bind: {html: '{order_amount:erpMoney}'},
                                }
                            ]
                        },{
                            xtype: 'container',
                            width: 400,
                            margin: '20 0',
                            layout: {
                                type: 'hbox',
                                pack: 'end',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    margin: '0 20 0 0',
                                    flex: 1,
                                    cls: 'size-16 bolder',
                                    html: `${i18n.gettext('Billing email')}`,
                                },
                                {
                                    xtype: 'emailfield',
                                    required: true,
                                    clearable: true,
                                    width: 200,
                                    bind: {
                                        value: '{order.email}'
                                    },
                                }
                            ]
                        },{
                            xtype: 'container',
                            cls: 'border-bottom'
                        }, {
                            xtype: 'container',
                            width: 400,
                            margin: '20 0',
                            layout: {
                                type: 'hbox',
                                pack: 'end',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    ui: 'action',
                                    //cls: 'green-dark',
                                    text: i18n.gettext('Buy subscription'),
                                    handler: 'byStoreTariff'
                                }
                            ]
                        }

                    ]
                },{
                    xtype: 'container',
                    reference: 'new_pos_payment',
                    hidden: true,
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '10 0 10 0',
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '5',
                                    width: 250,
                                    cls: 'size-14 bolder',
                                    bind: {
                                        html: i18n.gettext('Subscription number'),
                                    }

                                },{
                                    xtype: 'container',
                                    margin: '5',
                                    flex: 1,
                                    cls: 'size-14 bolder',
                                    bind: {
                                        html: '<b>{orderFrame.order_number}</b>',
                                    }
                                }
                            ]
                        },{
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '10 0 20 0',
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '5',
                                    width: 250,
                                    cls: 'size-14 bolder',
                                    bind: {
                                        html: i18n.gettext('Order date payment'),
                                    }

                                },{
                                    xtype: 'container',
                                    margin: '5',
                                    flex: 1,
                                    cls: 'size-14 bolder',
                                    html: Ext.Date.dateFormat(new Date(), 'Y-m-d')
                                }
                            ]
                        },{
                            xtype: 'container',
                            reference: 'new_pos_iframe',
                            width: 900,
                            height: 700,
                            html: 'Test',
                        }
                    ]
                }
            ]
        }
    ]

});
