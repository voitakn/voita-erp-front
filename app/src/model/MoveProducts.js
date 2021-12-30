Ext.define('Erp.model.MoveProducts', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'customer_id', type: 'string'},
        {name: 'barcode', type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'price', type: 'number'},
        {name: 'price_base', type: 'number'},
        {name: 'sale', type: 'number'},
        {name: 'sale_percent', type: 'number'},
        {name: 'params', type: 'auto'},
        {name: 'date_create', type: 'auto'},
        {name: 'tax_rate', type: 'number'},
        {
            name: 'tax_value', type: 'number',
            calculate(data) {
                if (data.tax_rate > 1) {
                    return Math.ceil((data.tax_rate - 1) * 100);
                }
                return 0.00;
            }
        },

    ]
});
