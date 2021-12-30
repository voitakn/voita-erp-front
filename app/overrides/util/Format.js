Ext.define('Erp.overrides.util.Format', {
    override: 'Ext.util.Format',
    decimalSeparator: ',',
    thousandSeparator: ' ',
    erpMoney(v) {
        if(v && v > 0) return this.currency(v, User.symbol(), 2);
        return this.currency(0.00, User.symbol(), 2);
    },
    eurMoney(v) {
        if(v && v > 0) return this.currency(v, '€', 2);
        return this.currency(0.00, '€', 2);
    },
    usdMoney(v) {
        if(v && v > 0) return this.currency(v, '$', 2);
        return this.currency(0.00, '$', 2);
    },
    erpCurrency(v) {
        if(v) {
            return `${v} ${User.symbol()}`;
        }
        return User.symbol();
    },
    checkIcon(value) {
        if (value === true) {
            return '<span class="far fa-check-circle x-action-col-icon green"></span>';
        }
        return '<span class="far fa-circle x-action-col-icon red"></span>';
    },
    payType(val) {
        const types = {
            'cash': i18n.gettext('Cash'),
            'card_visa': i18n.gettext('Visa'),
            'card': i18n.gettext('Card'),
            'card_master': i18n.gettext('Master Card'),
            'card_other': i18n.gettext('Card'),
            'pay_pal': i18n.gettext('Pay Pal'),
        }
        return types[val] || '-';
    },
    toFloat(v) {
        return this.number(v, '0.000,00/i');
    },
    toFloat4(v) {
        return this.number(v, '0.000,0000/i');
    },
    toFloat3(v) {
        return this.number(v, '0.000,000/i');
    },
    erpFromUTC(v, format) {
        const dateToUtc = Ext.Date.parse(v, 'Y-m-dTH:i:s.u');
        const dateUtc = Ext.Date.utc(dateToUtc.getFullYear(),
            dateToUtc.getMonth(),
            dateToUtc.getDate(),
            dateToUtc.getHours(),
            dateToUtc.getMinutes());
        return Ext.Date.dateFormat(dateUtc, format);
    },
    toDecimal2(v) {
        if(Ext.Number.parseFloat(v) > 0) {
            return Ext.Number.toFixed(Ext.Number.parseFloat(v), 2);
        }
        return '0.00';
    },
});