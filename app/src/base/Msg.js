Ext.define('Erp.base.Msg', {
    singleton: true,
    alternateClassName: ['Erp.Msg'],
    confirm(title, message, callback){
        Ext.Msg.setStandardButtons({
            no: {
                text: i18n.gettext('No')
            },
            yes: {
                text: i18n.gettext('Yes')
            },
        });
        Ext.Msg.confirm(title, message, callback);
    }
});
