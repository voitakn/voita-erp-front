Ext.define('Erp.view.pages.Test', {
    extend: 'Erp.base.Module',
    xtype: 'page_test',
    viewModel: {
        data: []
    },
    controller: {},
    items:[
        {
            xtype: 'panel',
            items: [
                {
                    xtype: 'head1',
                    items: [{
                        xtype: 'label',
                        cls: 'title',
                        html: i18n.gettext('Test components')
                    }]
                },
                {
                    xtype: 'tabpanel',
                    width: 600,
                    items: [
                        {
                            title: 'Retail',
                        },
                        {
                            title: 'Purchase',
                        },
                        {
                            title: 'Wholesale',
                        },
                        {
                            title: 'Marketplace',
                        }
                    ]
                }
            ]
        }
    ]
});
