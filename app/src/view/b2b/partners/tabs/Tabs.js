Ext.define('Erp.view.partners.tabs.Tabs', {
    extend: 'Ext.Container',
    xtype: 'partners_tabs',
    items: [
        {
            xtype: 'panel',
            items: [
                {
                    xtype: 'tabpanel',
                    reference: 'partners_tabs',
                    height: 600,
                    items: [
                        {
                            title: 'Partners',
                            xtype: 'container',
                            margin: '5 0 10 0',
                            listeners: {
                                show: 'onShowPartners'
                            },
                            items: [
                                {
                                    xtype: 'partners_grid',
                                    height: 500,
                                }
                            ]
                        },
                        {
                            title: 'Sent requests',
                            xtype: 'container',
                            margin: '15 0 15 0',
                            listeners: {
                                show: 'onShowPartnersOutgoing'
                            },
                            items: [
                                {
                                    xtype: 'partners_outgoing_grid',
                                    height: 500,
                                }
                            ]
                        },
                        {
                            title: 'Received requests',
                            xtype: 'container',
                            margin: '15 0 15 0',
                            listeners: {
                                show: 'onShowPartnersIncoming'

                            },
                            items: [
                                {
                                    xtype: 'partners_incoming_grid',
                                    height: 500,
                                }
                            ]
                        },
                    ]
                },
            ]
        },
    ]
});
