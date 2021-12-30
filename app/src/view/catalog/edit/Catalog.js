Ext.define('Erp.view.catalog.edit.Catalog', {
    extend: 'Erp.base.ToolTip',
    xtype: 'catalog_edit_tooltip',
    reference: 'catalog_edit_tooltip',
    bind: {
        title: '{catalog_edit_title}',
    },
    items: [
        {
            xtype: 'formpanel',
            items: [
                {
                    xtype: 'textfield',
                    reference: 'catalog_field',
                    required: true,
                    label: i18n.gettext('Catalog name'),
                    bind: {
                        value: '{catalog.title}'
                    },
                }
            ]
        }
    ],
    buttonAlign: 'center',
    buttons: [
        {
            xtype: 'button',
            iconCls: 'x-fa fa-times red',
            text: i18n.gettext('Cancel'),
            handler: function(btn) {
                btn.up('catalog_edit_tooltip').hide();
            }
        },
        {
            xtype: 'button',
            margin: '0 0 0 15',
            iconCls: 'fi-save green-dark',
            text: i18n.gettext('Save'),
            handler: 'saveCatalog'
        }
    ]
});
