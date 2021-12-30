Ext.define('Erp.view.catalog.edit.NewService', {
    extend: 'Ext.form.Panel',
    xtype: 'catalog_new_service',
    requres: [
        'Erp.common.CatalogField'
    ],
    session: true,
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
                    html: i18n.gettext('New service'),
                },{
                    text: i18n.gettext('Back'),
                    iconCls: 'x-fa fa-arrow-left',
                    handler: 'onCancelNew',
                    margin: '0 10 0 0',
                },{
                    text: i18n.gettext('Save'),
                    iconCls: 'fi-save',
                    cls: 'green-dark',
                    serv: true,
                    handler: 'onSaveNew',
                }
            ]
        }, {
            xtype: 'textfield',
            width: 500,
            required: true,
            label: i18n.gettext('Service name'),
            bind: {
                value: '{newServ.title}'
            },
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
                        label: '{newServ.cols_title}',
                        value: '{newServ.price}'
                    },
                },
                {
                    xtype: 'container',
                    margin: '0 20 0 0',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'selectfield',
                            clearable: true,
                            required: true,
                            width: 210,
                            label: i18n.gettext('tax VAT'),
                            valueField: 'value',
                            displayTpl: '{name}',
                            itemTpl: '{name}',
                            bind: {
                                value: '{newServ.tax_rate}',
                                store: '{taxes_store}'
                            }
                        }
                    ]
                },{
                    xtype: 'textfield',
                    label: i18n.gettext('Currency'),
                    readOnly: true,
                    width: 100,
                    bind: {
                        value: `{currencySymbol}`
                    }
                }
            ]
        },{
            xtype: 'textareafield',
            label: i18n.gettext('Full dеscription'),
            width: 500,
            maxRows: 5,
            bind: {
                value: '{newServ.params.description}'
            },
        },{
            xtype: 'catalogfield',
            filter: 'serv',
            viewModel: {
                data: {
                    parent_field: 'newServ.catalog_id',
                    can_edit: true,
                    required: true,
                },
                links: {
                    catalog_id: '{newServ.catalog_id}'
                }
            }
        },{
            xtype: 'hiddenfield',
            name: 'prod_check_catalog_id',
            required: true,
            bind: {
                value: '{newServ.catalog_id}'
            }
        }
    ]
});
