Ext.define('Erp.view.catalog.edit.NewProduce', {
    extend: 'Ext.form.Panel',
    xtype: 'catalog_new_produce',
    itemId: 'newProduce',
    requres: [
        'Erp.common.CatalogField',
        'Erp.store.Units'
    ],
    session: true,
    autoSize: true,
    layout: {
        type: 'hbox',
        pack: 'start',
    },
    listeners: {
        activate: 'activeNewForm'
    },
    items: [
        {
            xtype: 'head1',
            items: [
                {
                    xtype: 'label',
                    cls: 'title',
                    html: i18n.gettext('New product')
                },{
                    text: i18n.gettext('Back'),
                    iconCls: 'x-fa fa-arrow-left',
                    handler: 'onCancelNew',
                    margin: '0 10 0 0',
                },{
                    text: i18n.gettext('Save'),
                    iconCls: 'fi-save',
                    cls: 'green-dark',
                    serv: false,
                    handler: 'onSaveNew',
                }
            ]
        },
        {
            xtype: 'container',
            margin: '0 10 0 0',
            //padding: '0 10 0 0',
            width: 520,
            scrollable: 'y',
            autoSize: true,
            items: [
                {
                    xtype: 'textfield',
                    width: 500,
                    required: true,
                    label: i18n.gettext('Product name'),
                    bind: {
                        value: '{newProd.title}'
                    },
                },{
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            margin: '0 20 0 0',
                            width: 240,
                            label: i18n.gettext('Barcode'),
                            bind: {
                                value: '{newProd.barcode}'
                            },
                        },{
                            xtype: 'selectfield',
                            clearable: true,
                            required: true,
                            width: 240,
                            label: i18n.gettext('tax VAT'),
                            valueField: 'value',
                            displayTpl: '{name}',
                            itemTpl: '{name}',
                            bind: {
                                value: '{newProd.tax_rate}',
                                store: '{taxes_store}'
                            }
                        }
                    ]
                },{
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'numberfield',
                            margin: '0 20 0 0',
                            width: 150,
                            required: true,
                            label: i18n.gettext('Price'),
                            bind: {
                                label: '{newProd.cols_title}',
                                value: '{newProd.price}'
                            },
                        },{
                            xtype: 'selectfield',
                            clearable: true,
                            required: true,
                            width: 210,
                            margin: '0 20 0 0',
                            label: i18n.gettext('Unit type per'),
                            valueField: 'id',
                            displayTpl: '{name} {abr}',
                            itemTpl: '{name} {abr}',
                            store: {
                                type: 'unitStore'
                            },
                            bind: {
                                value: '{newProd.unit_type}',
                            }
                        },{
                            xtype: 'textfield',
                            label: i18n.gettext('Currency'),
                            readOnly: true,
                            width: 100,
                            bind: {
                                value: `{currencySymbol}`
                            }
                        },

                    ]
                },{
                    xtype: 'textareafield',
                    label: i18n.gettext('Full description'),
                    width: 500,
                    maxRows: 5,
                    bind: {
                        value: '{newProd.params.description}'
                    },
                },{
                    xtype: 'catalogfield',
                    filter: 'prod',
                    viewModel: {
                        data: {
                            parent_field: 'newProd.catalog_id',
                            can_edit: true,
                            required: true,
                        },
                        links: {
                            catalog_id: '{newProd.catalog_id}',
                        }
                    }
                },{
                    xtype: 'hiddenfield',
                    name: 'prod_check_catalog_id',
                    required: true,
                    bind: {
                        value: '{newProd.catalog_id}'
                    }
                }
            ]
        }

    ]
});
