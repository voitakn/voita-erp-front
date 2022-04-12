Ext.define('Erp.view.sell.pos.edit.SellConfig', {
    extend: 'Erp.base.Dialog',
    xtype: 'sell_pos_config',
    reference: 'sell_pos_config',
    width: 400,
    title: i18n.gettext('Selling configuration'),
    items: [
        {
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'container',
                    margin: '5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'size-14 bolder text-center',
                                    html: `${i18n.gettext('Select store and cash register then begin to sell!')}`,
                                },
                                {
                                    xtype: 'placebox',
                                    reference: 'pos_place_combobox',
                                    viewModel: {
                                        data: {
                                            parent_field: 'config_place_id',
                                            autoSelect: true,
                                            required: true
                                        },
                                        links: {
                                            place_id: '{config_place_id}'
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    reference: 'pos_cash_combobox',
                                    autoSelect: true,
                                    forceSelection: true,
                                    editable: false,
                                    label: i18n.gettext('Cash register'),
                                    queryMode: 'local',
                                    valueField: 'id',
                                    displayField: 'name',
                                    store: {},
                                    bind: {
                                        value: '{filter.cash_register}',
                                        hidden: '{!check_checkout}'
                                    },

                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'start'
                                    },
                                    items: [
                                        {
                                            xtype: 'spinnerfield',
                                            margin: '0 20 0 0',
                                            flex: 1,
                                            label: `<b>${i18n.gettext('Cash amount')}</b>`,
                                            clearable: true,
                                            decimals: 2,
                                            bind: {
                                                value: '{cash_amount}'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            reference: 'pos_duration_combobox',
                                            flex: 1,
                                            autoSelect: true,
                                            forceSelection: true,
                                            editable: false,
                                            label: i18n.gettext('Duration of work'),
                                            queryMode: 'local',
                                            valueField: 'val',
                                            displayField: 'text',
                                            store: [
                                                {val: 1, text: i18n.gettext('1 hour')},
                                                {val: 2, text: i18n.gettext('2 hours')},
                                                {val: 3, text: i18n.gettext('3 hours')},
                                                {val: 4, text: i18n.gettext('4 hours')},
                                                {val: 5, text: i18n.gettext('5 hours')},
                                                {val: 6, text: i18n.gettext('6 hours')},
                                                {val: 7, text: i18n.gettext('7 hours')},
                                                {val: 8, text: i18n.gettext('8 hours')},
                                                {val: 9, text: i18n.gettext('9 hours')},
                                                {val: 10, text: i18n.gettext('10 hours')},
                                                {val: 11, text: i18n.gettext('11 hours')},
                                                {val: 12, text: i18n.gettext('12 hours')},
                                                /*{val: 13, text: i18n.gettext('13 hours')},
                                                {val: 14, text: i18n.gettext('14 hours')},
                                                {val: 15, text: i18n.gettext('15 hours')},
                                                {val: 16, text: i18n.gettext('16 hours')},*/
                                            ],
                                            bind: {
                                                value: '{filter.hours}'
                                            },
                                        }
                                    ]
                                },

                            ]
                        }
                    ]
                }
            ]
        },
    ],
    buttonAlign: 'center',
    buttons: [
        {
            xtype: 'button',
            text: i18n.gettext('Exit'),
            iconCls: 'x-fa fa-arrow-left',
            handler: 'onPosSellExit'
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Start selling'),
            handler: 'onStartSell'
        }
    ]
});
