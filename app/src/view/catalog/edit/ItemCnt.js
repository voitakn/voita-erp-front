Ext.define('Erp.view.catalog.edit.ItemCnt', {
    extend: 'Ext.Container',
    xtype: 'item_cnt',
    defaults: {
        xtype: 'container',
        cls: 'size-12',
    },
    items: [
        {
            items: [
                {
                    flex: 1,
                    defaults: {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            pack: 'start',
                            align: 'center'
                        },
                        defaults: {
                            xtype: 'container',
                            margin: '0 5 0 5'
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    html: i18n.gettext('Price name'),
                                },
                                {
                                    cls: 'bolder text-right',
                                    flex: 1,
                                    reference: 'textTitle'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    html: i18n.gettext('Price'),
                                },
                                {
                                    cls: 'bolder blue text-right',
                                    flex: 1,
                                    reference: 'textPrice'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    html: i18n.gettext('Discount'),
                                },
                                {
                                    cls: 'green-dark text-right',
                                    flex: 1,
                                    reference: 'textPercent',
                                },
                            ]
                        }
                    ]
                },
            ],
        },
    ]
})