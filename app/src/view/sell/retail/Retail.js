Ext.define('Erp.view.sell.retail.Retail', {
    extend: 'Erp.base.Module',
    xtype: 'sell_retail',
    controller: 'sellretail',
    viewModel: {
        type: 'sellretail'
    },
    autoSize: true,
    scrollable: 'y',
    layout: 'fit',
    listeners: {
        element: 'element',
        click: 'onViewClick'
    },
    items: [
        {
            xtype: 'container',
            reference: 'sell_retail_ctrl',
            masked: {
                xtype: 'loadmask',
                cls: 'size-16 font-weight-bold text-light',
                message: 'Please wait',
            },
            scrollable: 'x',
            layout: {
                type: 'hbox',
            },
            items: [
                {
                    xtype: 'sell_retail_receipt',
                    minWidth: 600,
                    margin: '0 20 0 0',
                    flex: 1,
                },
                {
                    xtype: 'container',
                    minWidth: 550,
                    flex: 1,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'head1',
                            items: [
                                {
                                    xtype: 'segmentedbutton',
                                    margin: '0 20 5 0',
                                    reference: 'choose_retail_type',
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
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'vbox',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            reference: 'retail_place_combobox',
                                            autoSelect: true,
                                            forceSelection: true,
                                            editable: false,
                                            label: i18n.gettext('Point of sale: '),
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            valueField: 'id',
                                            displayField: 'title',
                                            store: {},
                                            bind: {
                                                value: '{filter.place_id}'
                                            },

                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'retail_produce_grid',
                            hidden: true,
                            bind: {
                                hidden: '{retail_type}'
                            },
                        },
                        {
                            xtype: 'retail_right_panel',
                            bind: {
                                hidden: '{!retail_type}'
                            },
                        }
                    ]
                },
            ]
        }
    ]
});
