Ext.define('Erp.view.company.edit.TemplateSettingsEdit', {
    extend: 'Erp.base.ToolTip',
    xtype: 'template_settings_edit',
    reference: 'template_settings_edit',
    autoSize: true,
    session: true,
    title: i18n.gettext('Edit template settings'),
    titleAlign: 'center',
    listeners: {
        onCancel: 'onCancelTemplateEdit'
    },
    align: 'b50-t50',
    items: [
        {
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Invoice type',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'start',
                                        align: 'bottom'
                                    },
                                    cls: 'bolder',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            width: 80,
                                            label: i18n.gettext('Series*'),
                                            margin: '0 5 0 0',
                                            clearable: false,
                                            textAlign: 'right',
                                            disabled: true,
                                            bind: {
                                                value: '{type_series}',
                                                disabled: '{!invoice_type_edit}'
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            cls: 'bolder',
                                            html: `${new Date().getFullYear()}`
                                        },
                                        {
                                            xtype: 'textfield',
                                            width: 150,
                                            margin: '0 20 0 20',
                                            label: i18n.gettext('Name'),
                                            disabled: true,
                                            bind: {
                                                value: '{type_text}',
                                                disabled: '{!invoice_type_edit}'
                                            }
                                        },
                                        {
                                            xtype: 'spinnerfield',
                                            label: i18n.gettext('Size of receipt'),
                                            minValue: 40,
                                            maxValue: 80,
                                            bind: {
                                                value: '{widthCnt}'
                                            }
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            label: i18n.gettext('Text_1'),
                            bind: {
                                value: '{text_1}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            label: i18n.gettext('Text_2'),
                            bind: {
                                value: '{text_2}'
                            }
                        },
                    ]
                },
            ],
            buttonAlign: 'center',
            buttons: [
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-times red',
                    margin: '0 10',
                    text: i18n.gettext('Cancel'),
                    handler: 'onCancelTemplateEdit'
                }, {
                    xtype: 'button',
                    ui: 'alt confirm',
                    iconCls: 'fi-save',
                    margin: '0 10',
                    text: i18n.gettext('Save'),
                    handler: 'onSaveTemplate'
                }
            ]
        }
    ]
});
