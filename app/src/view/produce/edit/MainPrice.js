Ext.define('Erp.view.produce.edit.MainPrice', {
    extend: 'Erp.base.ToolTip',
    xtype: 'produce_edit_mainprice',
    title: i18n.gettext('Edit base price'),
    session: true,
    align: 'l60-r100',
    listeners: {
        onCancel: 'cancelMainPrice'
    },
    items: [
        {
            xtype: 'formpanel',
            width: 440,
            buttonAlign: 'center',
            buttons: [
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-times red',
                    text: i18n.gettext('Cancel'),
                    handler: 'cancelMainPrice'
                },{
                    xtype: 'button',
                    margin: '0 0 0 15',
                    iconCls: 'fi-save green-dark',
                    text: i18n.gettext('Save'),
                    handler: 'saveMainPrice'
                }
            ],
            items: [
                {
                    xtype: 'container',
                    margin: '5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'numberfield',
                                    width: 220,
                                    labelAlign: 'left',
                                    labelWidth: 110,
                                    reference: 'main_price_base_field',
                                    required: true,
                                    label: `${i18n.gettext('Basic price')}`,
                                    bind: {
                                        value: '{mainPrice.price_base}',
                                    },
                                    listeners: {
                                        blur: 'onCalcMainPriceSale'
                                    }
                                }
                            ]
                        },{
                            xtype: 'label',
                            margin: '0 15',
                            cls: 'size-16 blue',
                            html: `${i18n.gettext('Total price')}:`,
                        },{
                            xtype: 'label',
                            cls: 'size-16 blue bolder',
                            bind: {
                                html: '{mainPrice.price:erpMoney}'
                            },
                        }
                    ]
                },{
                    xtype: 'container',
                    margin: '5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'numberfield',
                                    width: 220,
                                    labelAlign: 'left',
                                    labelWidth: 110,
                                    margin: '0 20 0 0',
                                    label: i18n.gettext('Discount %'),
                                    bind: {
                                        value: '{mainPrice.sale_percent}',
                                    },
                                    listeners: {
                                        blur: 'onCalcMainPriceSale'
                                    }
                                }
                            ]
                        }, {
                            xtype: 'label',
                            margin: '0 15',
                            cls: 'size-16 green-dark',
                            html: `${i18n.gettext('Discount')}:`,
                        },{
                            xtype: 'label',
                            cls: 'size-16 green-dark bolder',
                            bind: {
                                html: '{mainPrice.sale:erpMoney}'
                            },
                        }
                    ]
                }
            ]
        }
    ]
});
