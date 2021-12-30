Ext.define('Erp.view.movement.add.Add', {
    extend: 'Erp.base.Module',
    requires: [
        'Erp.base.Dialog',
        'Erp.util.Nominal',
    ],
    xtype: 'movement_add',
    controller: 'movement_add_ctrl',
    viewModel: {
        type: 'movement_add_vm'
    },
    autoSize: true,
    items: [
        {
            xtype: 'container',
            reference: 'movement_add',
            listeners: {
                element: 'element',
                click: 'onViewClick'
            },
            layout: {
                type: 'hbox',
                pack: 'start',
            },
            scrollable: 'x',
            items: [
                {
                    xtype: 'container',
                    width: 700,
                    margin: '0 20 0 0',
                    scrollable: 'y',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'head1',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'title',
                                    html: i18n.gettext('New movement')
                                },{
                                    text: i18n.gettext('Back'),
                                    iconCls: 'x-fa fa-arrow-left',
                                    handler: 'toBack',
                                },{
                                    xtype: 'label',
                                    html: `${i18n.gettext('Source POS')}:`
                                },
                                {
                                    xtype: 'label',
                                    padding: '0 15',
                                    bind: {
                                        html: `{pos_market_place_from}`,
                                        cls: `{pos_market_place_from === 'Not selected' ? 'status-failed' : 'status-confirm'}`,
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'fi-pencil blue',
                                    tooltip: i18n.gettext('Change point from movement products'),
                                    handler: 'onSelectStoreFrom'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            docked: 'top',
                            layout: {
                                type: 'hbox',
                            },
                            cls: 'border-bottom',
                            defaults: {
                                xtype: 'container',
                                minWidth: 250,
                                flex: 1,
                                margin: '5 0',
                                layout: {
                                    type: 'vbox',
                                    pack: 'start'
                                },
                                defaults: {
                                    xtype: 'container',
                                    margin: '5 0',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    flex: 1,
                                    defaults: {
                                        xtype: 'label',
                                    }
                                }
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 130,
                                                    cls: 'bolder',
                                                    html: `${i18n.gettext('City')}:`,
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    bind: {
                                                        html: `{pos_market_place_from_city} {pos_market_place_from_postcode}`,
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 130,
                                                    cls: 'bolder',
                                                    html: `${i18n.gettext('Address')}:`,
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    bind: {
                                                        html: `{pos_market_place_from_address}`,
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 130,
                                                    cls: 'bolder',
                                                    html: `${i18n.gettext('Phone')}:`,
                                                }, {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    bind: {
                                                        html: `{pos_market_place_from_phone}`,
                                                    }
                                                }
                                            ]
                                        },
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 130,
                                                    cls: 'bolder',
                                                    html: `${i18n.gettext('Manager')}:`,
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    bind: {
                                                        html: `{operator}`,
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 130,
                                                    cls: 'bolder',
                                                    html: `${i18n.gettext('Boxes')}:`,
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    bind: {
                                                        html: `{boxes}`,
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 130,
                                                    cls: 'bolder',
                                                    html: `${i18n.gettext('Comment')}:`,
                                                }, {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    bind: {
                                                        html: '{comment}',
                                                    }
                                                }
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'head2',
                            margin: '10 0 0 0',
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'title',
                                    html: i18n.gettext('Select products by')
                                },
                                {
                                    xtype: 'segmentedbutton',
                                    margin: '0 0 0 0',
                                    bind: {
                                        value: '{retail_type}'
                                    },
                                    defaults: {
                                        iconAlign: 'left',
                                        ui: 'raised',
                                        border: 1
                                    },
                                    items: [
                                        {text: i18n.gettext('BARCODE'), value: true, iconCls: 'x-fa fa-barcode blue'},
                                        {text: i18n.gettext('CATALOG'), value: false, iconCls: 'x-fa fa-sitemap blue'},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'movement_add_catalog',
                            layout: 'hbox',
                            hidden: true,
                            minHeight: 500,
                            flex: 1,
                            bind: {
                                hidden: '{retail_type}'
                            },
                        },
                        {
                            xtype: 'movement_add_panel',
                            minHeight: 500,
                            layout: 'hbox',
                            flex: 1,
                            bind: {
                                hidden: '{!retail_type}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'movement_add_receipt',
                    width: 500,
                }
            ]
        },
        {
            xtype: 'movement_add_amount',
            listeners: {
                hide: 'onCloseAmount'
            }
        },
        {
            xtype: 'move_products_from'
        },
        {
            xtype: 'move_products_to'
        },
        {
            xtype: 'print_dialog'
        },
        {
            xtype: 'move_products_trash',
            reference: 'move_products_trash_confirm',
        }
    ]
});
