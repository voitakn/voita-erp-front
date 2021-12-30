const i18n = {
    localeDefault: 'en',
    localeEnabled: ['es','el','it','pt','sr','ru'],
    locale: null,
    start() {
        const me = this;
        const lng = me.getNavLocale();
        if(me.localeEnabled.includes(lng)) {
            me.locale = lng;
            me.linkLocale();
            me.gt = new Gettext({ domain: me.locale });
        } else {
            me.locale = me.localeDefault;
            me.gt = new Gettext({ domain: 'en', locale_data: {
                en: {"": {
                    "plural-forms": "nplurals=2; plural=(n != 1)",
                    "language" : "en"
                }}
            }});
        }
    },
    linkLocale() {
        let lngNavLink =  document.createElement('link');
        lngNavLink.rel = 'gettext';
        lngNavLink.type = 'application/x-po';
        lngNavLink.href = `/auth/locale/${this.locale}.po`;
        document.head.appendChild(lngNavLink);
    },
    gettext(str1) {
        const me = this;
        if (typeof(str1) !== 'undefined') {
            return me.gt.gettext(str1);
        }
        return '';
    },
    getNavLocale() {
        var navigatorLang = (
                navigator.browserLanguage
                || (navigator.languages && navigator.languages[0])
                || navigator.language
                || navigator.userLanguage
                || ''
            ),
            locale = location.href.match(/locale=([\w-]+)/);

        locale = (locale && locale[1])
            || navigatorLang.split('-')[0]
            || 'en';
        return locale;
    }
};
i18n.start();
