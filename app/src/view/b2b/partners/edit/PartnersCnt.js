Ext.define('Erp.view.b2b.partners.edit.PartnersCnt', {
    extend: 'Ext.dataview.ListItem',
    xtype: 'partners_cnt',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    autoDestroy: true,
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'start',
            },
            items: [
                {
                    xtype: 'label',
                    reference: 'itemTitle',
                    margin: '0 20 0 0',
                    cls: 'bolder',
                    minWidth: 220,
                    flex: 1
                },
                {
                    xtype: 'label',
                    reference: 'itemAddress',
                    minWidth: 220,
                    flex: 1,
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'start',
            },
            items: [
                {
                    xtype: 'label',
                    reference: 'itemEmail',
                    margin: '0 20 0 0',
                    flex: 1,
                    cls: 'bolder',
                    minWidth: 220,
                },
                {
                    xtype: 'label',
                    reference: 'itemCity',
                    minWidth: 220,
                    flex: 1,
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'start',
            },
            items: [
                {
                    xtype: 'label',
                    reference: 'itemPhone',
                    margin: '0 20 0 0',
                    flex: 1,
                    cls: 'bolder',
                    minWidth: 220,
                },
                {
                    xtype: 'label',
                    reference: 'itemPostcode',
                    minWidth: 220,
                    flex: 1,
                }
            ]
        },
    ],
    dataMap: {
        itemTitle: {
            html: 'title'
        },
        itemEmail: {
            html: 'email'
        },
        itemCity: {
            html: 'city'
        },
        itemAddress: {
            html: 'address'
        },
        itemPostcode: {
            html: 'postcode'
        },
        itemPhone: {
            html: 'phone'
        },
    }
});