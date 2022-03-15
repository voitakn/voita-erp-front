Ext.define('Erp.view.b2b.partners.tabs.Tabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'partners_tabs',
    reference: 'partners_tabs',
    defaults: {
        layout: 'fit'
    },
    tabBar: {
        layout: {
            pack: 'start',
            overflow: 'scroller'
        }
    },
    items: [
        {
            title: 'Partners',
            xtype: 'container',
            listeners: {
                show: 'onShowPartners'
            },
            items: [
                {
                    xtype: 'partners_grid',
                    margin: '5 0 0 0',
                }
            ]
        },
        {
            title: 'Sent requests',
            xtype: 'container',
            listeners: {
                show: 'onShowPartnersOutgoing'
            },
            items: [
                {
                    xtype: 'partners_outgoing_grid',
                    margin: '5 0 0 0',
                }
            ]
        },
        {
            title: 'Received requests',
            xtype: 'container',
            listeners: {
                show: 'onShowPartnersIncoming'
            },
            items: [
                {
                    xtype: 'partners_incoming_grid',
                    margin: '5 0 0 0',
                },
            ]
        },
    ]
});
