Ext.define('Erp.view.b2b.partners_card.CardGrid', {
    extend: 'Ext.Container',
    xtype: 'card_cnt',
    reference: 'card_cnt',
    layout: 'fit',
    items: [
        {
            xtype: 'container',
            // hidden: true,
            // bind: {
            //     hidden: '{!theCardView.id}'
            // },
            items: [
                {
                    xtype: 'container',
                    margin: '0 0 10 0',
                    defaults: {
                        xtype: 'container',
                        margin: '3 0',
                        layout: {
                            type: 'hbox'
                        },
                        flex: 1,
                    },
                    items: [
                        {
                            xtype: 'head1',
                            items: [
                                {
                                    xtype: 'label',
                                    margin: '0 20 0 0',
                                    cls: 'title',
                                    html: i18n.gettext('Partners information')
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
                            items: [
                                {
                                    xtype: 'label',
                                    html: i18n.gettext('Name'),
                                    flex: 1,
                                    maxWidth: 130,
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: '{theCardView.title}'
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    html: i18n.gettext('Country'),
                                    flex: 1,
                                    maxWidth: 130,
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: '{theCardView.country_en}'
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    html: i18n.gettext('Address'),
                                    flex: 1,
                                    maxWidth: 130,
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: '{theCardView.address_row}'
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    html: i18n.gettext('Phone'),
                                    flex: 1,
                                    maxWidth: 130,
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: '{theCardView.phone}'
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    html: i18n.gettext('Email'),
                                    flex: 1,
                                    maxWidth: 130,
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: '<a href= mailto:{theCardView.email}><b>{theCardView.email}</b></a>'
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'label',
                                    html: i18n.gettext('Person'),
                                    flex: 1,
                                    maxWidth: 130,
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'bolder',
                                    bind: {
                                        html: '{theCardView.name} {theCardView.surname}'
                                    }
                                }
                            ]
                        },
                    ],
                },


                // {
                //     xtype: 'container',
                //     cls: 'border-bottom',
                //     autoSize: true,
                //     hidden: true,
                //     bind: {
                //         hidden: '{no_com_supplier_save}'
                //     },
                //     items: [
                //         {
                //             xtype: 'head2',
                //             items: [{
                //                 xtype: 'label',
                //                 cls: 'title',
                //                 flex: 1,
                //                 maxWidth: 120,
                //                 html: i18n.gettext('Purchases')
                //             },
                //                 {
                //                     xtype: 'button',
                //                     text: i18n.gettext('New Purchase'),
                //                     iconCls: 'x-fa fa-plus green-dark',
                //                     hidden: true,
                //                     bind: {
                //                         hidden: '{no_com_purchase_produce_list}'
                //                     },
                //                     handler: 'addNewPurchase',
                //                 }
                //             ]
                //         },
                //         {
                //             xtype: 'supplier_purchase_list',
                //             minHeight: 500
                //         }
                //     ],
                // }
            ]
        }
    ],
})