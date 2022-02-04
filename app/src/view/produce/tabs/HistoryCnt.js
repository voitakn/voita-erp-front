Ext.define('Erp.view.produce.tabs.HistoryCnt', {
    extend: 'Ext.Container',
    xtype: 'purchase_price_container',
    reference: 'purchase_price_container',
    autoSize: true,
    layout: 'fit',
    listeners: {
        show: 'onShowHistory'
    },
    items: [
        {
            xtype: 'container',
            docked: 'top',
            items: [
                {
                    xtype: 'container',
                    cls: 'head-1',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'title',
                            html: i18n.gettext('Prices history')
                        },
                        {
                            xtype: 'segmentedbutton',
                            margin: '10 0 0 0',
                            defaults: {
                                ui: 'default',
                            },
                            bind: {
                                value: '{history_mode}'
                            },
                            items: [
                                {text: i18n.gettext('Retail'), value: 'retail'},
                                {text: i18n.gettext('Purchases'), value: 'purchase'},
                            ]
                        }
                    ]
                },
            ]
        },
        {
            xtype: 'history',
            margin: '20 0 0 0'
        }
    ]
});