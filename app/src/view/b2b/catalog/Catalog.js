Ext.define('Erp.view.b2b.catalog.Catalog', {
    extend: 'Erp.base.Module',
    xtype: 'b2b_catalog',
    reference: 'b2b_catalog',
    controller: 'b2b_catalog_ctrl',
    viewModel: {
        type: 'b2b_catalog_vm'
    },
    autoSize: true,
    scrollable: 'y',
    items: [
        {
            xtype: 'container',
            docked: 'top',
            margin: '5 0 0 20',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            padding: '0 0 5 0',
            cls: 'head-1 border-bottom',
            items: [
                {
                    xtype: 'label',
                    margin: '0 20 0 0',
                    cls: 'title',
                    html: i18n.gettext('B2B')
                },
                {
                    xtype: 'button',
                    text: i18n.gettext('Back'),
                    iconCls: 'x-fa fa-arrow-left',
                    handler: 'toBack',
                },

            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    margin: '0 20 0 0',
                    width: 300,
                    items: [
                        {
                            xtype: 'head1',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'title',
                                    html: i18n.gettext('Partners list')
                                }
                            ]
                        },
                        {
                            xtype: 'list',
                            itemTpl: '{title}',
                            bind: {
                                store: '{partners_store}'
                            },
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'fit',
                    flex: 1,
                    items: [
                        {
                            xtype: 'head1',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'title',
                                    html: i18n.gettext('Partners catalog')
                                }
                            ]
                        },
                        {
                            xtype: 'b2b_produce_grid',
                        }
                    ]
                },
                // {
                //     xtype: 'b2b_produce_grid',
                //     flex: 1,
                // },
            ]
        },
    ]
});