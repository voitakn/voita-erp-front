Ext.define('Erp.view.partners.edit.AddPartner', {
    extend: 'Erp.base.Dialog',
    xtype: 'add_partner',
    reference: 'add_partner',
    width: 500,
    title: i18n.gettext('Create new partner'),
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
                    hidden: true,
                    bind: {
                        hidden: '{isUserEmail}'
                    },
                    items: [
                        {
                            xtype: 'emailfield',
                            label: i18n.gettext('Email'),
                            // placeholder: i18n.gettext('Enter email'),
                            required: true,
                            validators: 'email',
                            bind: {
                                value: '{newCard.email}'
                            }
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
                                    xtype: 'displayfield',
                                    label: i18n.gettext('Partner email'),
                                    flex: 1,
                                    bind: {
                                        value: '{newCard.email}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    label: i18n.gettext('Name'),
                                    flex: 1,
                                    margin: '0 20 0 0',
                                    // required: true,
                                    bind: {
                                        value: '{newCard.title}'
                                    }
                                },

                                // {
                                //     xtype: 'container',
                                //     layout: {
                                //         type: 'hbox',
                                //         pack: 'start',
                                //         align: 'end'
                                //     },
                                //     items: [
                                //
                                //     ]
                                // },
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
                                            reference: 'country_combobox',
                                            margin: '0 20 0 0',
                                            width: 160,
                                            autoSelect: true,
                                            forceSelection: true,
                                            editable: false,
                                            // required: true,
                                            label: i18n.gettext('Country'),
                                            queryMode: 'local',
                                            valueField: 'id',
                                            displayField: 'country_orig',
                                            store: {},
                                            bind: {
                                                value: '{newCard.country_id}'
                                            },
                                        },

                                        {
                                            xtype: 'phonefield',
                                            width: 250,
                                            label: i18n.gettext('Phone '),
                                            reference: 'new_partner_phone',
                                            bind: {
                                                value: '{newCard.phone}'
                                            },
                                        },
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    label: i18n.gettext('Address'),
                                    flex: 1,
                                    bind: {
                                        value: '{newCard.params_partner.address}'
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
                                            width: 160,
                                            label: i18n.gettext('City'),
                                            bind: {
                                                value: '{newCard.params_partner.city}'
                                            },
                                        },

                                        {
                                            xtype: 'textfield',
                                            label: i18n.gettext('Postcode'),
                                            width: 250,
                                            bind: {
                                                value: '{newCard.params_partner.postcode}'
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
                                            // labelAlign: 'left',
                                            margin: '0 20 0 0',
                                            width: 160,
                                            labelWidth: 160,
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
                                            width: 250,
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
            // iconCls: 'x-fa fa-arrow-left',
            handler: 'onAddNewCancel',
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Check'),
            handler: 'onCheckEmail',
            hidden: true,
            bind: {
                hidden: '{isUserEmail}'
            },

        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Save'),
            handler: 'addNewPartner',
            hidden: true,
            bind: {
                hidden: '{!isUserEmail}'
            },

        }
    ]
});
