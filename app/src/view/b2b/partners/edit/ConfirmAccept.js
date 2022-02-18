Ext.define('Erp.view.b2b.partners.edit.ConfirmAccept', {
    extend: 'Erp.base.ToolTip',
    xtype: 'accept_invite',
    reference: 'accept_invite',
    session: true,
    title: i18n.gettext('Confirm the invitation'),
    width: 400,
    align: 'l50-r100',
    listeners: {
        hide: 'onConfirmHide'
    },
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
                                html: '{confirmCard.email}'
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
                                html: '{confirmCard.title}'
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
                                html: '{confirmCard.country_en}'
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
                                html: '{confirmCard.phone}'
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
                                html: '{confirmCard.params_partner.address}'
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
                                html: '{confirmCard.params_partner.city}'
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
                                html: '{confirmCard.params_partner.postcode}'
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
                        value: '{confirmCard.params.client}',
                        boxLabel: `{!confirmCard.params.client ? "${i18n.gettext('No')}" : "${i18n.gettext('Yes')}"}`
                    }
                },
                {
                    xtype: 'combobox',
                    reference: 'confirm_price_row_combobox',
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
                        value: '{confirmCard.params.price_row}',
                        disabled: '{!confirmCard.params.client}'
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
                value: '{confirmCard.params.supplier}',
                boxLabel: `{!confirmCard.params.supplier ? "${i18n.gettext('No')}" : "${i18n.gettext('Yes')}"}`
            }
        },
    ],
    buttonAlign: 'center',
    buttons: [
        {
            xtype: 'button',
            margin: '0 10 0 0',
            iconCls: 'x-fa fa-times red',
            text: i18n.gettext('No'),
            handler: 'onCancelConfirm'
        },
        {
            xtype: 'button',
            iconCls: 'x-fa fa-check green-dark',
            text: i18n.gettext('Yes'),
            handler: 'confirmInvite'
        }
    ]
});
