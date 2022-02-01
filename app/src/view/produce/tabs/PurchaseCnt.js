Ext.define('Erp.view.produce.PurchaseContainer', {
    extend: 'Ext.Container',
    xtype: 'purchase_price_container',
    reference: 'purchase_price_container',
    items: [
        {
            xtype: 'container',
            cls: 'border-bottom',
            layout: {
                type: 'hbox',
                pack: 'end',
                align: 'center'
            },
            defaults: {
                xtype: 'container',
                flex: 1,
                defaults: {
                    xtype: 'label',
                    margin: '7 0',
                },
            },
            items: [
                {
                    items: [
                        {
                            cls: 'bolder size-15',
                            html: `${i18n.gettext('Affected price')}`
                        }, {
                            cls: 'bolder size-16',
                            bind: {
                                html: '{purchasePrice.title}'
                            }
                        }
                    ]
                },
                {
                    items: [
                        {
                            cls: 'bolder size-15 blue',
                            html: `${i18n.gettext('Total price')}`
                        }, {
                            cls: 'bolder size-16 blue',
                            bind: {
                                html: '{purchasePrice.price:erpMoney}'
                            }
                        }
                    ]
                },
            ]
        },
    ]
});