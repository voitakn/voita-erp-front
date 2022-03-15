Ext.define('Erp.view.b2b.partners.edit.AddPartner', {
    extend: 'Erp.base.Dialog',
    xtype: 'add_partner',
    reference: 'add_partner',
    width: 400,
    title: i18n.gettext('Invite partner'),
    listeners: {
        hide: 'onAddNewHide'
    },
    items: [
        {
            xtype: 'formpanel',
            reference: 'add_partner_form',
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
                                        html: '{newCard.email}'
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
                                        html: '{newCard.title}'
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
                                        html: '{newCard.country_en}'
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
                                        html: '{newCard.phone}'
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
                                        html: '{newCard.params_partner.address}'
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
                                        html: '{newCard.params_partner.city}'
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
                                        html: '{newCard.params_partner.postcode}'
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
                                value: '{newCard.params.client}',
                                boxLabel: `{!newCard.params.client ? "${i18n.gettext('No')}" : "${i18n.gettext('Yes')}"}`
                            }
                        },
                        {
                            xtype: 'combobox',
                            reference: 'price_row_combobox',
                            width: 160,
                            autoSelect: true,
                            forceSelection: true,
                            editable: false,
                            clearable: true,
                            label: i18n.gettext('Price'),
                            queryMode: 'local',
                            valueField: 'id',
                            displayField: 'title',
                            store: {},
                            disabled: true,
                            bind: {
                                value: '{newCard.params.price_row}',
                                disabled: '{!newCard.params.client}'
                            },
                        },
                    ]
                },
                {
                    xtype: 'togglefield',
                    // labelAlign: 'left',
                    labelWidth: 160,
                    label: i18n.gettext('Partner is a supplier'),
                    value: false,
                    bind: {
                        value: '{newCard.params.supplier}',
                        boxLabel: `{!newCard.params.supplier ? "${i18n.gettext('No')}" : "${i18n.gettext('Yes')}"}`
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
            handler: 'onAddNewCancel',
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Save'),
            handler: 'addNewPartner',
        }
    ]
});
