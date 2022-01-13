Ext.define('Erp.view.sell.Ctrl', {
    extend: 'Erp.view.base.BaseCtrl',
    printReceipt(invoiceData) {
        const me = this;
        const country = User.data.country.country_en;
        invoiceData.company_name = User.data.customer.title;
        const invPlace = User.placesObj[invoiceData.place_id];
        const invCity = invPlace.params.city || User.data.customer.configs.city || '';
        const invPost = invPlace.params.postcode || User.data.customer.configs.postcode || '';
        const invPhone = invPlace.params.phone || User.data.customer.configs.phone || '';
        const custConf = User.data.customer.configs;
        let custLogo = false;
        if(custConf.logo_id && custConf.logo_id.length === 36) {
            custLogo = custConf.logo;
        }
        invoiceData.company_email = User.data.customer.email;
        invoiceData.company_phone = invPhone;
        invoiceData.company_address_1 = invPlace.params.address || User.data.customer.configs.address;
        invoiceData.company_address_2 = `${invPost} ${invCity}`;
        invoiceData.tax_number = custConf.tax_number || '---------';
        invoiceData.capital = custConf.capital || '1.00';
        invoiceData.tax_include = custConf.tax_include === true || false;
        invoiceData.logo = custLogo;
        invoiceData.operator = `${User.data.params.name} ${User.data.params.surname}`;
        invoiceData.date_time = Ext.util.Format.erpFromUTC(invoiceData.date_create, 'Y-m-d H:i');
        invoiceData.client_tax_number = '---------';
        me.clearBill();
        me.removeItemsStores();
        switch (country) {
            case 'Portugal':
                invoiceData.client_name = 'Consumidor Final';
                invoiceData.origin = 'Original';
                invoiceData.caixa = `Caixa 1`;
                ReceiptPortugal.htmlRender(invoiceData);
                break;
            case 'Spain':
                invoiceData.client_name = i18n.gettext('Final customer');
                invoiceData.origin = i18n.gettext('Original');
                invoiceData.caixa = i18n.gettext('Checkout 1');
                ReceiptSpain.htmlRender(invoiceData);
                break;
            default:
                invoiceData.client_name = 'Final customer';
                invoiceData.origin = 'Original';
                invoiceData.caixa = `Checkout 1`;
                ReceiptEnglish.htmlRender(invoiceData);
                me.clearBill();
                break;
        }
    },
});