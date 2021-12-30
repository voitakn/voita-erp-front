Ext.define('Erp.view.worker.edit.NewWorker', {
    extend: 'Erp.base.ToolTip',
    xtype: 'worker_new',
    binding: {
        store: '{workers_store}',
    },
    autoSize: true,
    session: true,
    width: 400,
    align: 'l-r',
    defaults: {
        scrollable: true,
    },
    title: i18n.gettext('New Employee'),
    items: [
        {
            xtype: 'formpanel',
            reference: 'worker_new_form',
            defaults: {
                xtype: 'textfield',
                required: true,
                validators: {
                    type: 'length',
                    min: 2
                }
            },
            items: [
                {
                    xtype: 'emailfield',
                    label: i18n.gettext('E-mail'),
                    name: 'worker_login',
                    bind: {
                        value: '{newWorker.login}'
                    },
                    validators: 'email'
                },
                {
                    xtype: 'passwordfield',
                    name: 'worker_passwd',
                    revealable: true,
                    label: i18n.gettext('Password'),
                    bind: {
                        value: '{newWorker.passwd}'
                    },
                    validators: {
                        type: 'format',
                        matcher: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\._])(?=.{8,})/
                    }
                },
                {
                    label: i18n.gettext('Name'),
                    name: 'worker_name',
                    bind: {
                        value: '{newWorker.params.name}'
                    },
                },
                {
                    label: i18n.gettext('Last name'),
                    name: 'worker_surname',
                    bind: {
                        value: '{newWorker.params.surname}'
                    },
                },
                {
                    label: i18n.gettext('Phone'),
                    name: 'worker_phone',
                    required: false,
                    bind: {
                        value: '{newWorker.params.phone}'
                    },
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'chipview',
                            reference: 'chipview_places_list',
                            displayField: 'title',
                            closeHandler: 'removePoints'
                        },
                        {
                            xtype: 'button',
                            margin: '10 10 10 0',
                            text: i18n.gettext('Add Points'),
                            iconCls: 'x-fa fa-map-marker',
                            tooltip: 'Add user points',
                            handler: 'onAddPoints'
                        },
                        {
                            xtype: 'chipview',
                            reference: 'chipview_groups_list',
                            displayField: 'title',
                            closeHandler: 'removeGroups'
                        },
                        {
                            xtype: 'button',
                            margin: '10 10 10 0',
                            text: i18n.gettext('Add Groups'),
                            iconCls: 'x-fa fa-map-marker',
                            tooltip: 'Add user roles',
                            handler: 'onAddRoles'
                        },

                    ]
                },
                {
                    xtype: 'places_list',
                    reference: 'places_list',
                },
                {
                    xtype: 'togglefield',
                    label: i18n.gettext('Active'),
                    required: false,
                    boxLabel: i18n.gettext('Can work in  service'),
                    bind: {
                        value: '{newWorker.active}'
                    }
                }
            ],
            buttonAlign: 'center',
            buttons: {
                cancel: {
                    iconCls: 'x-fa fa-times red',
                    margin: '0 10',
                    text: i18n.gettext('Cancel'),
                    handler: 'onCancelNew'
                },
                save: {
                    iconCls: 'fi-save green-dark',
                    margin: '0 10',
                    text: i18n.gettext('Save'),
                    handler: 'onSaveNew'
                }
            }
        }
    ]
});
