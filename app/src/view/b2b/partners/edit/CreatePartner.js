Ext.define('Erp.view.partners.edit.CreatePartner', {
    extend: 'Erp.base.Dialog',
    xtype: 'create_partner',
    reference: 'create_partner',
    width: 550,
    title: i18n.gettext('Create new partner'),
    listeners: {
        hide: 'onCreateNewHide'
    },
    items: [
        {
            xtype: 'formpanel',
            reference: 'create_partner_form',
            items: [
                {
                    xtype: 'container',
                    hidden: true,
                    bind: {
                        hidden: '{isUserEmail}'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                pack: 'start',
                                align: 'end'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    label: i18n.gettext('Search by company name'),
                                    margin: '0 20 0 0',
                                    flex: 1,
                                    bind: {
                                        value: '{search_name}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'green',
                                    text: i18n.gettext('Search'),
                                    handler: 'onSearchName',
                                },
                            ]
                        },
                        {
                            xtype: 'list',
                            reference: 'search_partners_list',
                            height: 200,
                            itemConfig: {
                                xtype: 'partners_cnt',
                            },
                            bind: {
                                store: '{partners_search_name_store}'
                            },
                            onItemDisclosure: 'onSelectPartners',
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
                                    xtype: 'emailfield',
                                    label: i18n.gettext('Invite by email'),
                                    margin: '0 20 0 0',
                                    flex: 1,
                                    validators: 'email',
                                    bind: {
                                        value: '{search_email}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 0 0 10',
                                    cls: 'green',
                                    text: i18n.gettext('Invite'),
                                    handler: 'onSearchByEmail',
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end',
                        align: 'middle'
                    },
                    hidden: true,
                    bind: {
                        hidden: '{!isUserEmail}'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'start',
                                        align: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            label: i18n.gettext('Name'),
                                            flex: 1,
                                            margin: '0 20 0 0',
                                            required: true,
                                            validators: {
                                                type: 'length',
                                                min: 3
                                            },
                                            bind: {
                                                value: '{createCard.title}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            label: i18n.gettext('Email'),
                                            required: true,
                                            flex: 1,
                                            disabled: true,
                                            bind: {
                                                value: '{createCard.email}'
                                            }
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
                                            xtype: 'combobox',
                                            reference: 'create_country_combobox',
                                            margin: '0 20 0 0',
                                            flex: 1,
                                            autoSelect: true,
                                            forceSelection: true,
                                            editable: false,
                                            required: true,
                                            label: i18n.gettext('Country'),
                                            queryMode: 'local',
                                            valueField: 'id',
                                            displayField: 'country_orig',
                                            store: {},
                                            bind: {
                                                value: '{createCard.country_id}'
                                            },
                                        },

                                        {
                                            xtype: 'phonefield',
                                            flex: 1,
                                            label: i18n.gettext('Phone '),
                                            reference: 'create_partner_phone',
                                            bind: {
                                                value: '{createCard.phone}'
                                            },
                                        },
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    label: i18n.gettext('Address'),
                                    flex: 1,
                                    bind: {
                                        value: '{createCard.params_partner.address}'
                                    }
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
                                            xtype: 'phonefield',
                                            margin: '0 20 0 0',
                                            flex: 1,
                                            label: i18n.gettext('City'),
                                            bind: {
                                                value: '{createCard.params_partner.city}'
                                            },
                                        },
                                        {
                                            xtype: 'textfield',
                                            label: i18n.gettext('Postcode'),
                                            flex: 1,
                                            bind: {
                                                value: '{createCard.params_partner.postcode}'
                                            }
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
                                            flex: 1,
                                            labelWidth: 160,
                                            label: i18n.gettext('Partner is a client'),
                                            value: false,
                                            bind: {
                                                value: '{createCard.params.client}',
                                                boxLabel: `{!createCard.params.client ? "${i18n.gettext('No')}" : "${i18n.gettext('Yes')}"}`
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            reference: 'create_price_row_combobox',
                                            flex: 1,
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
                                                value: '{createCard.params.price_row}',
                                                disabled: '{!createCard.params.client}'
                                            },
                                        },
                                    ]
                                },
                                {
                                    xtype: 'togglefield',
                                    flex: 1,
                                    label: i18n.gettext('Partner is a supplier'),
                                    value: false,
                                    bind: {
                                        value: '{createCard.params.supplier}',
                                        boxLabel: `{!createCard.params.supplier ? "${i18n.gettext('No')}" : "${i18n.gettext('Yes')}"}`
                                    }
                                },
                            ]
                        }
                    ]
                }
            ]
        },
    ],
    buttonAlign: 'center',
    buttons: [
        {
            xtype: 'button',
            text: i18n.gettext('Cancel'),
            handler: 'onCreateNewCancel',
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Save'),
            handler: 'saveNewPartner',
            hidden: true,
            bind: {
                hidden: '{!isUserEmail}'
            },
        }
    ]
});
