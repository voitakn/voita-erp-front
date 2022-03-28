Ext.define('Erp.view.produce.MainInfo', {
    extend: 'Ext.Container',
    xtype: 'produce_main_info',
    reference: 'produce_main_info',
    // cls: 'border-bottom',
    items: [
        {
            xtype: 'container',
            margin: '0 0 5 0',
            items: [
                {
                    xtype: 'head2',
                    margin: '10 0 0 0',
                    items: [
                        {
                            xtype: 'label',
                            flex: 1,
                            cls: 'bolder blue',
                            bind: {
                                html: '{theCard.title}'
                            }
                        },{
                            text: i18n.gettext('Edit'),
                            iconCls: 'fi-pencil',
                            margin: '0 0 0 0',
                            disabled: false,
                            handler: 'onEditProd',
                            bind: {
                                disabled: '{no_items_produce_save}',
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'start'
                    },
                    defaults: {
                        xtype: 'container',
                        minWidth: 250,
                        flex: 1,
                    },
                    items: [
                        {
                            defaults: {
                                xtype: 'container',
                                margin: '10 0',
                                layout: {
                                    type: 'hbox'
                                },
                                flex: 1,
                                defaults: {
                                    xtype: 'label',
                                }
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            width: 130,
                                            cls: 'bolder',
                                            html: `${i18n.gettext('Barcode')}:`
                                        },{
                                            flex: 1,
                                            bind: {
                                                html: '{theCard.barcode}',
                                            }
                                        }
                                    ]
                                },{
                                    items: [
                                        {
                                            width: 130,
                                            cls: 'bolder',
                                            html: `${i18n.gettext('Tax VAT')}:`
                                        },{
                                            flex: 1,
                                            bind: {
                                                html: '{extra.tax_name}',
                                            }
                                        }
                                    ]
                                },{
                                    items: [
                                        {
                                            width: 130,
                                            cls: 'bolder',
                                            html: `${i18n.gettext('Unit type per')}:`
                                        },{
                                            flex: 1,
                                            bind: {
                                                html: '{extra.unit_name}',
                                            }
                                        }
                                    ]
                                }
                            ]
                        },{
                            layout: {
                                type: 'hbox',
                                pack: 'end',
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    bind: {
                                        hidden: '{!theCardOrigin.barcode}'
                                    },
                                    html: `<img class="produce-barcode-img" height="85"/>`
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'start'
                    },
                    items: [
                        {
                            xtype: 'label',
                            width: 130,
                            cls: 'bolder',
                            html: `${i18n.gettext('Catalog')}:`
                        }, {
                            xtype: 'catalogchip',
                            viewModel: {
                                links: {
                                    catalog_id: '{theCard.catalog_id}',
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'start'
                    },
                    items: [
                        {
                            xtype: 'label',
                            width: 130,
                            cls: 'bolder',
                            html: `${i18n.gettext('Description')}:`
                        }, {
                            xtype: 'label',
                            flex: 1,
                            bind: {
                                html: '{theCard.params.description}',
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'produce_edit_produce',
        }
    ]
});
