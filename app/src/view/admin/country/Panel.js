Ext.define('Erp.view.admin.country.Panel', {
    extend: 'Ext.Panel',
    xtype: 'country_panel',
    bodyPadding: 20,
    autoSize: true,
    scrollable: 'y',
    title: i18n.gettext('Countries JSON'),
    margin: '0 0 20 0',
    layout: 'vbox',
    items: [
        {
            xtype: 'textareafield',
            flex: 1,
            reference: 'textarea_json',
            bind: {
                value: '{country_json}'
            },
        }
    ]
});
