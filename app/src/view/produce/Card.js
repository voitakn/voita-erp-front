Ext.define('Erp.view.produce.Card', {
    extend: 'Ext.Container',
    xtype: 'produce_card',
    mixins: ['Ext.mixin.Responsive'],
    scrollable: 'y',
    items: [
        {
            xtype: 'container',
            width: 800,
            items: [
                {
                    xtype: 'head1',
                    items: [{
                        xtype: 'label',
                        cls: 'title',
                        html: i18n.gettext('Product card')
                    }, {
                        text: i18n.gettext('Back'),
                        iconCls: 'x-fa fa-arrow-left',
                        handler: 'toBack',
                        margin: '0 15 0 0',
                    }, {
                        text: i18n.gettext('Go to catalog'),
                        iconCls: 'x-fa fa-sitemap green-dark',
                        handler: 'toCatalog',
                    }]
                },
                {
                    xtype: 'produce_main_info',
                },
                {
                    xtype: 'produce_tabs',
                    hidden: true,
                    bind: {
                        hidden: `{catalogFilter === 'serv'}`
                    }
                },
                {
                    xtype: 'produce_price_container',
                    hidden: true,
                    bind: {
                        hidden: `{catalogFilter === 'prod'}`
                    }
                }
            ]
        },
    ]
});
