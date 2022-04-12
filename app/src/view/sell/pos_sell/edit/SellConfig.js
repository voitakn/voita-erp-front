Ext.define('Erp.view.sell.pos_sell.edit.SellConfig', {
    extend: 'Erp.base.Dialog',
    xtype: 'pos_sell_config',
    reference: 'pos_sell_config',
    width: 350,
    title: i18n.gettext('Change point of sale'),
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
                                    xtype: 'placebox',
                                    reference: 'pos_sell_place_combobox',
                                    viewModel: {
                                        data: {
                                            parent_field: 'filter.place_id',
                                            autoSelect: true,
                                            required: true
                                        },
                                        links: {
                                            place_id: '{filter.place_id}'
                                        }
                                    }
                                }
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
                btn.up('pos_sell_config').hide();
            }
        },
        {
            xtype: 'button',
            margin: '0 0 0 10',
            cls: 'green-dark-bg white',
            text: i18n.gettext('Apply'),
            handler: 'onSelectPos'
        }
    ]
});
