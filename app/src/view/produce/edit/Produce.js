Ext.define('Erp.view.produce.edit.Produce', {
    extend: 'Erp.base.ToolTip',
    xtype: 'produce_edit_produce',
    reference: 'produce_edit_produce',
    title: i18n.gettext('Edit main information'),
    //align: 't50-b50',
    autoSize: true,
    session: true,
    listeners: {
        onCancel: 'onCancelEditProd'
    },
    items: [
        {
            xtype: 'formpanel',
            width: 500,
            buttonAlign: 'center',
            buttons: [
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-times red',
                    margin: '0 10',
                    text: i18n.gettext('Cancel'),
                    handler: 'onCancelEditProd'
                },{
                    xtype: 'button',
                    ui: 'alt confirm',
                    iconCls: 'fi-save',
                    margin: '0 10',
                    text: i18n.gettext('Save'),
                    handler: 'onSaveProd'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    required: true,
                    label: i18n.gettext('Product name'),
                    bind: {
                        value: '{theCard.title}',
                        readOnly: '{!theCardEdit}'
                    },
                }, {
                    xtype: 'catalogfield',
                    viewModel: {
                        data: {
                            parent_field: 'theCard.catalog_id',
                            can_edit: true,
                            required: true
                        },
                        links: {
                            catalog_id: '{theCard.catalog_id}',
                            filter: '{catalogFilter}'
                        }
                    }
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            margin: '0 20 0 0',
                            width: 160,
                            hidden: true,
                            label: i18n.gettext('Barcode'),
                            bind: {
                                value: '{theCard.barcode}',
                                readOnly: '{!theCardEdit}',
                                hidden: '{theCard.serv}',
                            },
                        },{
                            xtype: 'selectfield',
                            clearable: true,
                            required: true,
                            width: 200,
                            margin: '0 20 0 0',
                            label: i18n.gettext('Unit type per'),
                            valueField: 'id',
                            displayTpl: '{name} {abr}',
                            itemTpl: '{name} {abr}',
                            store: {
                                type: 'unitStore'
                            },
                            bind: {
                                value: '{theCard.unit_type}',
                                readOnly: '{!theCardEdit}'
                            }
                        }, {
                            xtype: 'selectfield',
                            reference: 'select_tax_rate',
                            clearable: true,
                            required: true,
                            flex: 1,
                            label: i18n.gettext('Tax VAT'),
                            valueField: 'value',
                            displayTpl: '{name}',
                            itemTpl: '{name}',
                            bind: {
                                value: '{theCard.tax_rate}',
                                readOnly: '{!theCardEdit}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'textareafield',
                    label: i18n.gettext('Full description'),
                    maxRows: 5,
                    clearable: true,
                    bind: {
                        value: '{theCard.params.description}',
                        readOnly: '{!theCardEdit}'
                    },
                }
            ]
        }
    ],
});
