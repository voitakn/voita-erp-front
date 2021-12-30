Ext.define('Erp.view.admin.customer.NewForm', {
    extend: 'Ext.form.Panel',
    xtype: 'admin_customer_new',
    session: true,
    buttonAlign : 'left',
    tbar: [
        {
            xtype: 'container',
            margin: '0 20 0 0',
            html: Ext.String.format('<b>{0}</b>', i18n.gettext('New organization'))
        }
    ],
    buttons: [{
        text: i18n.gettext('Save'),
        iconCls: 'fi-save',
        cls: 'green-dark',
        handler: 'onSaveNew',
        margin: '0 20 0 0',
    },{
        text: i18n.gettext('Back'),
        iconCls: 'x-fa fa-arrow-left',
        handler: 'onCancelNew',
    }],
    listeners: {
        activate: 'addedNewForm'
    },
    items: [
        {
            xtype: 'fieldset',
            margin: '0 0 20 0',
            padding: 0,
            title: i18n.gettext('Main information'),
            items: [
                {
                    xtype: 'textfield',
                    label: i18n.gettext('Organization title'),
                    required: true,
                    bind: {
                        value: '{newCard.customer.title}'
                    },
                },{
                    xtype: 'container',
                    layout: {type: 'hbox', pack: 'start'},
                    items: [
                        {
                            xtype: 'selectfield',
                            clearable: true,
                            required: true,
                            reference: 'new_country_select',
                            margin: '0 20 0 0',
                            width: 200,
                            label: i18n.gettext('Select the country'),
                            valueField: 'id',
                            displayTpl: '{country_en} ({country_orig})',
                            itemTpl: '{country_en} ({country_orig})',
                            store: {
                                type: 'counties_store'
                            },
                            bind: {
                                selection: '{newCard_country}',
                                value: '{newCard.customer.country_id}'
                            }
                        },{
                            xtype: 'textfield',
                            label: i18n.gettext('Phone'),
                            margin: '0 20 0 0',
                            width: 200,
                            clearable: true,
                            required: true,
                            bind: {
                                value: '{newCard.customer.phone}'
                            },
                            validators: [
                                {
                                    type: 'format',
                                    matcher: /^\+[0-9]{10,13}$/,
                                    message: i18n.gettext('The phone number should be like this: +1234567890'),
                                }
                            ]
                        },{
                            xtype: 'textfield',
                            label: i18n.gettext('Currency'),
                            margin: '0 20 0 0',
                            readOnly: true,
                            width: 100,
                            bind: {
                                value: '{newCard.customer.currency}'
                            }
                        }
                    ]
                }, {
                    xtype: 'container',
                    layout: {type: 'hbox', pack: 'start'},
                    items: [
                        {
                            xtype: 'textfield',
                            label: i18n.gettext('Name of point'),
                            required: true,
                            margin: '0 20 0 0',
                            width: 420,
                            bind: {
                                value: '{newCard.place.title}'
                            },
                        },{
                            xtype: 'groupcontainer',
                            label: i18n.gettext('Taxes of the selected country'),
                            flex: 1,
                            items: [
                                {
                                    xtype: 'chipview',
                                    bind: {
                                        data: '{newCard.customer.params.iva}',
                                    },
                                    displayField: 'name',
                                    closable: false
                                }
                            ]
                        },
                    ]
                }

            ]
        },{
            xtype: 'fieldset',
            margin: '0 0 20 0',
            padding: 0,
            title: i18n.gettext('Settings of the catalogs and sales'),
            items: [
                {
                    xtype: 'container',
                    layout: {type: 'hbox', pack: 'start'},
                    items: [
                        {
                            xtype: 'textfield',
                            label: i18n.gettext('Name of the products catalog'),
                            required: true,
                            margin: '0 20 0 0',
                            width: 250,
                            bind: {
                                value: '{newCard.catalog.products_name}'
                            },
                        },{
                            xtype: 'textfield',
                            label: i18n.gettext('Name of the service catalog'),
                            required: true,
                            margin: '0 20 0 0',
                            width: 250,
                            bind: {
                                value: '{newCard.catalog.services_name}'
                            },
                        }
                    ]
                },{
                    xtype: 'container',
                    layout: {type: 'hbox', pack: 'start'},
                    items: [
                        {
                            xtype: 'textfield',
                            label: i18n.gettext('Price name'),
                            required: true,
                            margin: '0 20 0 0',
                            width: 250,
                            bind: {
                                value: '{newCard.price_cols.title}'
                            },
                        },{
                            xtype: 'numberfield',
                            label: i18n.gettext('Default margin in %'),
                            required: true,
                            maxValue: 99.99,
                            minValue: 0.01,
                            margin: '0 20 0 0',
                            width: 250,
                            bind: {
                                value: '{newCard.price_cols.percent}'
                            },
                        }
                    ]
                }

            ]
        },{
            xtype: 'fieldset',
            margin: '0 0 20 0',
            padding: 0,
            title: i18n.gettext('Settings of the administrator account'),
            items: [
                {
                    xtype: 'container',
                    layout: {type: 'hbox', pack: 'start'},
                    items: [
                        {
                            xtype: 'textfield',
                            label: i18n.gettext('Name'),
                            required: true,
                            margin: '0 20 0 0',
                            width: 250,
                            bind: {
                                value: '{newCard.user.params.name}'
                            },
                        },{
                            xtype: 'textfield',
                            label: i18n.gettext('Last name'),
                            required: true,
                            width: 250,
                            bind: {
                                value: '{newCard.user.params.surname}'
                            },
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {type: 'hbox', pack: 'start'},
                    items: [
                        {
                            xtype: 'emailfield',
                            label: i18n.gettext('E-mail'),
                            margin: '0 20 0 0',
                            required: true,
                            width: 250,
                            validators: 'email',
                            bind: {
                                value: '{newCard.user.login}'
                            },
                        }, {
                            xtype: 'passwordfield',
                            label: i18n.gettext('Password'),
                            required: true,
                            revealable: true,
                            width: 250,
                            bind: {
                                value: '{newCard.user.passwd}'
                            },
                            validators: {
                                type: 'length', min: 6, max: 16
                            }
                        }
                    ]
                },


            ]
        }
    ]
});
