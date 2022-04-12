Ext.define('Erp.view.sell.Ctrl', {
    extend: 'Erp.view.base.BaseCtrl',
    printReceipt(invoiceData) {
        const me = this;
        invoiceData.company_name = User.data.customer.title;
        const invPlace = Ext.data.StoreManager.lookup('placesStore').getById(invoiceData.place_id);
        const invCity = invPlace.data.params.city || User.data.customer.configs.city || '';
        const invPost = invPlace.data.params.postcode || User.data.customer.configs.postcode || '';
        const invPhone = invPlace.data.params.phone || User.data.customer.configs.phone || '';
        const custConf = User.data.customer.configs;
        let custLogo = false;
        if(custConf.logo_id && custConf.logo_id.length === 36) {
            custLogo = custConf.logo;
        }
        invoiceData.company_email = User.data.customer.email;
        invoiceData.company_phone = invPhone;
        invoiceData.company_address_1 = invPlace.data.params.address || User.data.customer.configs.address;
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
        Receipt.htmlRender(invoiceData);
    },
});