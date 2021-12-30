Ext.define('Erp.model.MoveProductsStore', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'barcode', type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'price', type: 'string'},
        {name: 'params', type: 'auto'},
        {name: 'amount', type: 'number'},
        {name: 'tax_rate', type: 'number'},
        {name: 'serv', type: 'boolean'},
        {
            name: 'tax_value', type: 'number',
            calculate(data) {
                if (data.tax_rate > 1) {
                    return Math.ceil((data.tax_rate - 1) * 100);
                }
                return 0.00;
            }
        }, {
            name: 'price_total', type: 'number',
            calculate(data) {
                return data.price ? Ext.Number.roundToPrecision((data.price * data.amount), 2) : 0.00;
            }
        },
    ]
});