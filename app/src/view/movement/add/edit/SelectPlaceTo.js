Ext.define('Erp.view.movement.add.edit.SelectPlaceTo', {
    extend: 'Erp.base.Dialog',
    xtype: 'move_products_to',
    reference: 'move_products_to',
    width: 350,
    title: i18n.gettext('Select a destination POS'),
    items: [
        {
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'container',
                    margin: '5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'end',
                        align: 'middle'
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
                                    xtype: 'combobox',
                                    reference: 'move_products_place_to_combobox',
                                    // placeholder: 'Not selected',
                                    selectOnTab: true,
                                    autoSelect: true,
                                    forceSelection: true,
                                    clearable: true,
                                    // editable: false,
                                    label: i18n.gettext('Point of sale'),
                                    queryMode: 'local',
                                    valueField: 'id',
                                    displayField: 'title',
                                    store: {},
                                    bind: {
                                        value: '{config.to_place_id}'
                                    },
                                    listeners: {
                                        select: 'onSelectedTo'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    clearable: true,
                                    label: `${i18n.gettext('Address:')}`,
                                    bind: {
                                        value: '{edit.pos_market_place_to_address}',
                                    },
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    clearable: true,
                                    label: `${i18n.gettext('City:')}`,
                                    bind: {
                                        value: '{edit.pos_market_place_to_city}',
                                    },
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    clearable: true,
                                    label: `${i18n.gettext('Postcode:')}`,
                                    bind: {
                                        value: '{edit.pos_market_place_to_postcode}',
                                    },
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    label: `${i18n.gettext('Phone:')}`,
                                    clearable: true,
                                    bind: {
                                        value: '{edit.pos_market_place_to_phone}',
                                    },
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
            iconCls: 'x-fa fa-arrow-left',
            handler: function (btn) {
                btn.up('move_products_to').hide();
            }
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Apply'),
            handler: 'onSelectPlaceTo'
        }
    ]
});
