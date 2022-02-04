Ext.define('Erp.view.produce.edit.PurchasePrice', {
    extend: 'Erp.base.ToolTip',
    xtype: 'produce_edit_purchaseprice',
    title: i18n.gettext('Edit purchase price'),
    session: true,
    align: 'l60-r100',
    listeners: {
        onCancel: 'cancelPurchasePrice'
    },
    items: [
        {
            xtype: 'formpanel',
            width: 250,
            buttonAlign: 'center',
            buttons: [
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-times red',
                    text: i18n.gettext('Cancel'),
                    handler: 'cancelPurchasePrice'
                }, {
                    xtype: 'button',
                    margin: '0 0 0 15',
                    iconCls: 'fi-save green-dark',
                    text: i18n.gettext('Save'),
                    handler: 'savePurchasePrice'
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
                                    width: 160,
                                    // labelAlign: 'left',
                                    // labelWidth: 180,
                                    reference: 'purchase_price_base_field',
                                    required: true,
                                    label: `${i18n.gettext('Purchase price')}`,
                                    bind: {
                                        value: '{purchasePrice.price_base}',
                                    },
                                    listeners: {
                                        blur: 'onCalcPurchasePriceSale'
                                    }
                                }
                            ]
                        },
                    ]
                },
            ]
        }
    ]
});
