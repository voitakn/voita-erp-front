Ext.define('Erp.view.admin.country.CountryRightPanel', {
    extend: 'Ext.Container',
    xtype: 'country_right',
    autoSize: true,
    layout: 'fit',
    items: [
        {
            xtype: 'container',
            reference: 'right_cnt',
            autoSize: true,
            layout: 'center',
            flex: 1,
            items: [
                {
                    xtype: 'container',
                    autoSize: true,
                    flex: 1,
                    items: [
                        {
                            xtype: 'label',
                            html: Ext.String.format('<h1>{0}</h1>', i18n.gettext('Select country from the list')),
                        }
                    ]
                }

            ]
        },
        {
            xtype: 'country_panel',
            reference: 'country_panel',
            flex: 1,
            hidden: true,
            tbar: {
                xtype: 'toolbar',
                docked: 'bottom',
                margin: '0 0 0 0',
                items: [
                    {
                        xtype: 'button',
                        margin: '0 20 0 0',
                        text: i18n.gettext('Back'),
                        iconCls: 'x-fa fa-arrow-left',
                        handler: 'onCancel',
                    },
                    {
                        xtype: 'button',
                        margin: '0 0 0 20',
                        text: i18n.gettext('Save'),
                        iconCls: 'fi-save green-dark',
                        handler: 'onSave',
                    }
                ]
            },

        }
    ]
});
