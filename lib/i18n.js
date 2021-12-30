/**
 * Подключим библиотеку Gettext.js для переводов
 * Как этим пользоваться?
 * 1. Вариант
 * i18n.gettext("фраза перевода"); // Так переводим просто текст указываем только  1 параметр
 * i18n.gettext("фраза {0} перевода", "строка"); //Так переводим обычные строки с форматированием 2 параметра
 * i18n.ngettext("прилетело {0} пользователь", "прилетело {0} пользователей", 10); //Перевод для количества чегото там.
 * Тут нужны подготовленные массивы так как в русском 3 варианта перевода чисел
 * которые можно глянуть тут src/main/frontend/solar/packages/local/inrights-core/resources/lng/ru.json
 * для примера "{0} пользователь": ["{0} пользователей","{0} пользователь","{0} пользователя","{0} пользователей"]
 */
// Define default locale en
const DATA_LNG = {
    "en": {
        "": {
            "plural-forms": "nplurals=2; plural=(n != 1);",
            "language": "en"
        }
    }
};

const i18n_old = {
    poLocales: ['es'],
    appLocale: null,
    init(){
        var me = this;
        let locale = Ext.getNavLocale();
        if(me.poLocales.indexOf(locale) > -1) {
            me.gt = new Gettext({domain: locale});
            me.appLocale = locale;
        } else {
            me.gt = new Gettext({domain: "en", locale_data: DATA_LNG});
            me.appLocale = 'en';
        }
    },
    gettext(str1, str2) {
        var me = this;
        if (typeof (str2) != 'undefined') {
            return Ext.String.format(me.gt.gettext(str1), str2);
        } else if (typeof (str1) != 'undefined') {
            return me.gt.gettext(str1);
        } else {
            return '';
        }
    },
    /**
     * Вынес плюрализацию в отдельный метод для того чтобы в Poedit оно парсилось и присутсвовали множественные варианты
     */
    ngettext(str1, str2, str3) {
        var me = this;
        return Ext.String.format(me.gt.ngettext(str1, str2, str3), str3);
    }
}
//i18n_old.init();
/*var locale_data_erp = {
    "voita" : {
        "" : {
            "domain"        : "voita",
            "lang"          : "en",
            "plural-forms"  : "nplurals=2; plural=(n != 1);"
        },
        "test" : ["test_translation_output"]
    }
};
const i18n = new Jed({
    "domain" : "voita",
    "locale_data" : locale_data_erp
});*/
console.log('i18n = new Jed');
