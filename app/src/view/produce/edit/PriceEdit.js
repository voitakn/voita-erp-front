Ext.define('Erp.view.produce.edit.PriceEdit', {
    extend: 'Erp.base.ToolTip',
    xtype: 'produce_price_edit',
    reference: 'produce_price_edit',
    title: i18n.gettext('Edit POS price'),
    align: 'l60-r100',
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
                    handler: 'cancelPosPriceEdit'
                },{
                    xtype: 'button',
                    margin: '0 0 0 15',
                    iconCls: 'fi-save green-dark',
                    text: i18n.gettext('Save'),
                    handler: 'savePriceForPlace'
                }
            ],

            items: [
                {
                    xtype: 'togglefield',
                    labelAlign: 'left',
                    labelWidth: 110,
                    label: i18n.gettext('Price for POS'),
                    boxLabel: i18n.gettext('Turn on'),
                    bind: {
                        value: '{priceEdit.active}'
                    }
                },
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
                                    required: true,
                                    disabled: true,
                                    name: 'priceEdit_price',
                                    label: `${i18n.gettext('Base price')}`,
                                    bind: {
                                        value: '{priceEdit.price_base}',
                                        disabled: '{!priceEdit.active}'
                                    },
                                    listeners: {
                                        blur: 'onPricePlaceCalc'
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
                                html: '{priceEdit.price:erpMoney}'
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
                                    name: 'priceEdit_sale_percent',
                                    disabled: true,
                                    bind: {
                                        value: '{priceEdit.sale_percent}',
                                        disabled: '{!priceEdit.active}'
                                    },
                                    listeners: {
                                        blur: 'onPricePlaceCalc'
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
                                html: '{priceEdit.sale:erpMoney}'
                            },
                        }
                    ]
                }
            ]
        }
    ]
});
