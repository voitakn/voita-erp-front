Ext.define('Erp.view.sell.pos.PosRetail', {
    extend: 'Erp.base.Module',
    requires: [
        'Erp.base.Dialog',
        'Erp.util.Nominal',
    ],
    xtype: 'sell_pos',
    controller: 'pos_ctrl',
    viewModel: {
        type: 'pos_vm'
    },
    autoSize: true,
    scrollable: true,
    layout: 'fit',
    items: [
        {
            xtype: 'container',
            reference: 'sell_pos',
            listeners: {
                element: 'element',
                click: 'onViewClick'
            },
            scrollable: 'x',
            layout: {
                type: 'hbox',
            },
            items: [
                {
                    xtype: 'container',
                    // width: 650,
                    flex: 1,
                    margin: '0 20 0 0',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'head1',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'title',
                                    bind: {
                                        html: `<b>${i18n.gettext('POS')} | {pos_market_place} | {pos_cash_register}</b>`,
                                    }
                                },{
                                    xtype: 'button',
                                    ui: 'alt decline',
                                    margin: '0 0 0 0',
                                    text: i18n.gettext('Stop sellings'),
                                    handler: 'openFinishDialog'
                                }
                            ]
                        },{
                            xtype: 'head2',
                            margin: '5 0',
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 0',
                                    padding: '10 15',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center',
                                    },
                                    bind: {
                                        cls: '{pos_last_time_bg}',
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '0 20 0 0',
                                            cls: 'text-white size-16',
                                            html: `${i18n.gettext('Expiration')}`,
                                        },{
                                            xtype: 'container',
                                            cls: 'text-white size-18',
                                            bind: {
                                                html: `<b>{pos_last_time}</b>`,
                                            }
                                        }
                                    ]
                                },{
                                    xtype: 'spacer'
                                },{
                                    xtype: 'segmentedbutton',
                                    margin: '0 0 0 0',
                                    bind: {
                                        value: '{retail_type}'
                                    },
                                    defaults: {
                                        iconAlign: 'left',
                                        ui: 'raised',
                                        border: 1
                                    },
                                    items: [
                                        {text: i18n.gettext('BARCODE'), value: true, iconCls: 'x-fa fa-barcode blue'},
                                        {text: i18n.gettext('CATALOG'), value: false, iconCls: 'x-fa fa-sitemap blue'},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'pos_catalog',
                            flex: 1,
                            hidden: true,
                            bind: {
                                hidden: '{retail_type}'
                            },
                        },
                        {
                            xtype: 'pos_panel',
                            flex: 1,
                            bind: {
                                hidden: '{!retail_type}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'pos_receipt',
                    minWidth: 500,
                }
            ]
        },
        {
            xtype: 'sell_pos_amount',
            listeners: {
                hide: 'onCloseAmount'
            }
        },
        {
            xtype: 'sell_pos_config'
        },
        {
            xtype: 'sell_pos_paycard',
            listeners: {
                hide: 'onClosePayCard',
                onSavePayCard: 'savePayCard'
            }
        },
        {
            xtype: 'sell_pos_paycash',
            listeners: {
                hide: 'onClosePaycash',
                onSavePayCash: 'savePayCash'
            }
        },{
            xtype: 'base_dialog',
            reference: 'pos_dialog_finish',
            width: 500,
            title: i18n.gettext('Check the amount of cash'),
            bind: {
                html: `<div class="size-16 text-center">${i18n.gettext('Do you confirm the availability of the amount?')}</div> <br/>
                        <div class="size-24 text-center bolder">{checkout_amount_end:erpMoney}</div>`
            },
            listeners: {
                onSave: 'sendFinishRequest'
            }
        },{
            xtype: 'sell_pos_trash',
            reference: 'sell_pos_trash_confirm',
        }
    ]
});
