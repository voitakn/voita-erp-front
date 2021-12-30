Ext.define('Erp.view.purchase.buy.edit.NewProduce', {
    extend: 'Erp.base.ToolTip',
    xtype: 'buy_edit_produce',
    reference: 'buy_edit_produce',
    align: 't50-b50',
    title: i18n.gettext('New product'),
    items: [
        {
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'textfield',
                    width: 400,
                    required: true,
                    clearable: true,
                    label: i18n.gettext('Product name'),
                    bind: {
                        value: '{produce.title}'
                    },
                },{
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            margin: '0 20 0 0',
                            width: 190,
                            label: i18n.gettext('Barcode'),
                            bind: {
                                value: '{produce.barcode}'
                            },
                        },{
                            xtype: 'selectfield',
                            clearable: false,
                            required: true,
                            width: 190,
                            label: i18n.gettext('tax VAT'),
                            valueField: 'value',
                            displayTpl: '{name}',
                            itemTpl: '{name}',
                            bind: {
                                value: '{produce.tax_rate}',
                                store: '{taxes_store}'
                            }
                        }
                    ]
                },{
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'numberfield',
                            margin: '0 20 0 0',
                            width: 190,
                            label: i18n.gettext('Purchase price'),
                            required: true,
                            clearable: true,
                            bind: {
                                value: '{produce.price}',
                            },
                        },{
                            xtype: 'spinnerfield',
                            label: i18n.gettext('Quantity'),
                            width: 190,
                            required: true,
                            clearable: true,
                            bind: {
                                value: '{produce.amount}'
                            },
                        }
                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'numberfield',
                            width: 220,
                            required: true,
                            clearable: true,
                            label: i18n.gettext('Basic retail price'),
                            bind: {
                                value: '{produce.retail_price}'
                            },
                        },
                    ]
                }, {
                    xtype: 'container',
                    margin: '5 0 20 0',
                    html: i18n.gettext('The price of selling the products will be immediately available')
                }
            ]
        }
    ],
    buttonAlign: 'center',
    buttons: [{
        xtype: 'button',
        iconCls: 'x-fa fa-times red',
        text: i18n.gettext('Cancel'),
        handler: function(btn){
            btn.up('buy_edit_produce').hide();
        }
    }, {
        xtype: 'button',
        margin: '0 0 0 15',
        iconCls: 'x-fa fa-check green-dark',
        text: i18n.gettext('Add'),
        handler: 'addNewToInvoice'
    }]
});
