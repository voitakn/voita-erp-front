Ext.define('Erp.util.Formats', {
    alternateClassName: ['Formats'],
    singleton: true,
    checkIcon(value) {
        if (value == true) {
            return '<span class="fas fa-check x-action-col-icon green"></span>';
        }
        return '';
    },
    payType(val) {
        const types = {
            'cash': i18n.gettext('Cash'),
            'card_visa': i18n.gettext('Visa'),
            'card_master': i18n.gettext('Master Card'),
            'card_other': i18n.gettext('Card'),
            'pay_pal': i18n.gettext('Pay Pal'),
        }
        return types[val] || '-';
    }
});
