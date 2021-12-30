Ext.define('Erp.view.sell.retail.edit.Amount', {
    extend: 'Erp.base.ToolTip',
    xtype: 'sell_retail_amount',
    reference: 'sell_retail_amount',
    align: 'r-l',
    title: i18n.gettext('Quantity'),
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
                    cls: 'size-16 blue',
                    items: [
                        {
                            xtype: 'label',
                            margin: '0 30 0 0',
                            flex: 1,
                            html: `${i18n.gettext('Item price')}:`,
                        },{
                            xtype: 'label',
                            cls: 'bolder text-right',
                            bind: {html: '{amount_data.price.price:erpMoney}'},
                        }
                    ]
                },{
                    xtype: 'container',
                    margin: '5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end',
                        align: 'middle'
                    },
                    cls: 'size-16 red',
                    items: [
                        {
                            xtype: 'label',
                            margin: '0 30 0 0',
                            flex: 1,
                            html: `${i18n.gettext('Tax rate')}:`,
                        },{
                            xtype: 'label',
                            cls: 'bolder text-right',
                            bind: {html: '{amount_data.tax_value}%'},
                        }
                    ]
                },{
                    xtype: 'container',
                    margin: '5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end',
                        align: 'middle'
                    },
                    cls: 'size-16 red',
                    items: [
                        {
                            xtype: 'label',
                            margin: '0 30 0 0',
                            flex: 1,
                            html: `${i18n.gettext('Item tax')}:`,
                        },{
                            xtype: 'label',
                            cls: 'bolder text-right',
                            bind: {html: '{(amount_data.price.price * (amount_data.tax_rate - 1)):erpMoney}'},
                        }
                    ]
                },{
                    xtype: 'container',
                    margin: '5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end',
                        align: 'middle'
                    },
                    cls: 'size-16 green-dark',
                    items: [
                        {
                            xtype: 'label',
                            margin: '0 30 0 0',
                            flex: 1,
                            html: `${i18n.gettext('Item discount')}:`,
                        },{
                            xtype: 'label',
                            cls: 'bolder text-right',
                            bind: {html: '{amount_data.price.sale:erpMoney}'},
                        }
                    ]
                },
                /*{
                    xtype: 'container',
                    margin: '15 0 5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'label',
                            margin: '0 30 0 0',
                            cls: 'size-14 red',
                            flex: 1,
                            html: `${i18n.gettext('Total tax')}:`,
                        },{
                            xtype: 'label',
                            cls: 'size-14 bolder text-right red',
                            bind: {html: '{(amount_data.amount * (amount_data.price.price * (amount_data.tax_rate - 1))):erpMoney}'},
                        }
                    ]
                },{
                    xtype: 'container',
                    margin: '5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'label',
                            margin: '0 30 0 0',
                            cls: 'size-14 green-dark',
                            flex: 1,
                            html: `${i18n.gettext('Total discount')}:`,
                        },{
                            xtype: 'label',
                            cls: 'size-14 bolder text-right green-dark',
                            bind: {html: '{(amount_data.amount * amount_data.price.sale):erpMoney}'},
                        }
                    ]
                },{
                    xtype: 'container',
                    margin: '5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'label',
                            margin: '0 30 0 0',
                            cls: 'size-16 blue',
                            flex: 1,
                            html: `${i18n.gettext('Total at discount')}:`,
                        },{
                            xtype: 'label',
                            cls: 'size-16 bolder text-right blue',
                            bind: {html: '{(amount_data.amount * amount_data.price.price):erpMoney}'},
                        }
                    ]
                },*/
                {
                    xtype: 'spinnerfield',
                    label: `<b>${i18n.gettext('Quantity')}</b>`,
                    cls: 'bolder',
                    margin: '10 0',
                    width: 300,
                    required: true,
                    clearable: true,
                    bind: {
                        value: '{amount_data.amount}'
                    },
                }
            ]
        }
    ],
    buttonAlign: 'center',
    buttons: {
        cancel: {
            margin: '0 15 0 0',
            iconCls: 'x-fa fa-times red',
            text: i18n.gettext('Cancel'),
            handler: function(btn){
                btn.up('sell_retail_amount').hide();
            }
        },
        ok: {
            iconCls: 'x-fa fa-check green-dark',
            text: i18n.gettext('Add'),
            handler: 'addProdToOrder'
        }
    },
});
