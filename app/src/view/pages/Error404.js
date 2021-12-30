Ext.define('Erp.view.pages.Error404', {
    extend: 'Erp.view.pages.ErrorBase',
    xtype: 'page404',
    items:[{
        cls: 'error-page-top-text',
        html: '404'
    }, {
        cls: 'error-page-desc',
        html: Ext.String.format('<p>{0}</p><p>{1} <a href="#home">{2}</a></p>',
            i18n.gettext('Page was not found'),
            i18n.gettext('Try to go to'),
            i18n.gettext('the main panel')
            )
    }]
});
