Ext.define('Erp.util.Msg',() => {
    return {
        alternateClassName: ['Umsg'],
        singleton: true,
        message: {
            "The checkout was launched earlier, we cannot start it again.": i18n.gettext("The checkout was launched earlier, we cannot start it again."),
            "An error occurred while saving.": i18n.gettext("An error occurred while saving."),
            "The checkout was successfully launched, now you can sell.": i18n.gettext("The checkout was successfully launched, now you can sell."),
        },
    }
});
