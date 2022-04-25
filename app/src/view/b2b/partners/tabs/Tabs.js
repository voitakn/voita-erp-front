Ext.define('Erp.view.b2b.partners.tabs.Tabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'partners_tabs',
    defaults: {
        layout: 'fit'
    },
    tabBar: {
        layout: {
            pack: 'start',
        }
    },
    listeners: {
        activeItemchange: 'onPartnersTabs',
    },
    items: [
        {
            title: 'Partners',
            xtype: 'container',
            reference: 'tab_partners',
            items: [
                {
                    xtype: 'partners_grid',
                    margin: '10 0 0 0',
                }
            ]
        },
        {
            title: 'Sent requests',
            xtype: 'container',
            reference: 'tab_outgoing',
            items: [
                {
                    xtype: 'partners_outgoing_grid',
                    margin: '10 0 0 0',
                }
            ]
        },
        {
            title: 'Received requests',
            xtype: 'container',
            reference: 'tab_incoming',
            items: [
                {
                    xtype: 'partners_incoming_grid',
                    margin: '10 0 0 0',
                },
            ]
        }
    ]
});
