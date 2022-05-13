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
            width: 240,
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
                    xtype: 'numberfield',
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
        }
    ]
});
