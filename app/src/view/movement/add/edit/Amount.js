Ext.define('Erp.view.movement.add.edit.Amount', {
    extend: 'Erp.base.Dialog',
    xtype: 'movement_add_amount',
    reference: 'movement_add_amount',
    floated: true,
    width: 350,
    modal: true,
    centered: true,
    session: true,
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
                        }, {
                            xtype: 'label',
                            cls: 'bolder text-right',
                            bind: {html: '{amount_data.price:erpMoney}'},
                        }
                    ]
                }, {
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
                        }, {
                            xtype: 'label',
                            cls: 'bolder text-right',
                            bind: {html: '{amount_data.tax_value}%'},
                        }
                    ]
                }, {
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
                        }, {
                            xtype: 'label',
                            cls: 'bolder text-right',
                            bind: {html: '{(amount_data.price * (amount_data.tax_rate - 1)):erpMoney}'},
                        }
                    ]
                }, {
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
                        }, {
                            xtype: 'label',
                            cls: 'bolder text-right',
                            bind: {html: '{amount_data.price.sale:erpMoney}'},
                        }
                    ]
                },
                {
                    xtype: 'spinnerfield',
                    label: `<b>${i18n.gettext('Quantity')}</b>`,
                    ui: 'payment',
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
            handler: function (btn) {
                btn.up('movement_add_amount').hide();
            }
        },
        ok: {
            iconCls: 'x-fa fa-check green-dark',
            text: i18n.gettext('Add'),
            handler: 'addProdToOrder'
        }
    },
});
