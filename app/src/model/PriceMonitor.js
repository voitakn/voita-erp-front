Ext.define('Erp.model.PriceMonitor', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'barcode', type: 'string'},
        {name: 'unit_type', type: 'string'},
        {
            name: 'place_title', type: 'string',
            calculate(data) {
                if (data.price === undefined || data.price.place_id === null) {
                    return ''
                } else {
                    const record = User.placesStore.getById(data.price.place_id);
                    return record.get('title');
                }
            }
        },
        {name: 'id', type: 'string'},
        {name: 'title', type: 'string'},
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
        {name: 'date_update', type: 'date'},
        {name: 'serv', type: 'boolean'},
        {name: 'price', type: 'auto'},
        {name: 'params', type: 'auto'},
    ],
});