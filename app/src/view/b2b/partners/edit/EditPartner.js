Ext.define('Erp.view.b2b.partners.edit.EditPartner', {
    extend: 'Erp.base.ToolTip',
    xtype: 'edit_partner',
    reference: 'edit_partner',
    width: 400,
    title: i18n.gettext('Edit partner'),
    listeners: {
        hide: 'onEditHide'
    },
    items: [
        {
            xtype: 'formpanel',
            reference: 'edit_partner_form',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            pack: 'start'
                        },
                        defaults: {
                            xtype: 'label',
                            margin: '0 5 10 0'
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    cls: 'bolder',
                                    html: i18n.gettext('Partner email'),
                                    flex: 1
                                },
                                {
                                    bind: {
                                        html: '{editCard.email}'
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    cls: 'bolder',
                                    html: i18n.gettext('Name'),
                                    flex: 1
                                },
                                {
                                    bind: {
                                        html: '{editCard.title}'
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    cls: 'bolder',
                                    html: i18n.gettext('Country'),
                                    flex: 1
                                },
                                {
                                    bind: {
                                        html: '{editCard.country_en}'
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    cls: 'bolder',
                                    html: i18n.gettext('Phone'),
                                    flex: 1
                                },
                                {
                                    bind: {
                                        html: '{editCard.phone}'
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    cls: 'bolder',
                                    html: i18n.gettext('Address:'),
                                    flex: 1
                                },
                                {
                                    bind: {
                                        html: '{editCard.params_partner.address}'
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    cls: 'bolder',
                                    html: i18n.gettext('City'),
                                    flex: 1
                                },
                                {
                                    bind: {
                                        html: '{editCard.params_partner.city}'
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    cls: 'bolder',
                                    html: i18n.gettext('Postcode'),
                                    flex: 1
                                },
                                {
                                    bind: {
                                        html: '{editCard.params_partner.postcode}'
                                    }
                                }
                            ]
                        },
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'end'
                    },
                    items: [
                        {
                            xtype: 'togglefield',
                            margin: '0 20 0 0',
                            width: 160,
                            labelWidth: 160,
                            flex: 1,
                            label: i18n.gettext('Partner is a client'),
                            value: false,
                            bind: {
                                value: '{editCard.params.client}',
                                boxLabel: `{!editCard.params.client ? "${i18n.gettext('No')}" : "${i18n.gettext('Yes')}"}`
                            }
                        },
                        {
                            xtype: 'combobox',
                            reference: 'edit_price_row_combobox',
                            width: 160,
                            autoSelect: true,
                            forceSelection: true,
                            editable: false,
                            clearable: true,
                            required: true,
                            label: i18n.gettext('Price'),
                            queryMode: 'local',
                            valueField: 'id',
                            displayField: 'title',
                            store: {},
                            disabled: true,
                            bind: {
                                value: '{editCard.params.price_row}',
                                disabled: '{!editCard.params.client}'
                            },
                        },
                    ]
                },
                {
                    xtype: 'togglefield',
                    labelWidth: 160,
                    label: i18n.gettext('Partner is a supplier'),
                    value: false,
                    bind: {
                        value: '{editCard.params.supplier}',
                        boxLabel: `{!editCard.params.supplier ? "${i18n.gettext('No')}" : "${i18n.gettext('Yes')}"}`
                    }
                },
            ]
        },
    ],
    buttonAlign: 'center',
    buttons: [
        {
            xtype: 'button',
            text: i18n.gettext('Cancel'),
            handler: 'onEditCancel',
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Save'),
            handler: 'savePartner',
        }
    ]
});
