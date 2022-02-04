Ext.define('Erp.model.History', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'user_id', type: 'string'},
        {name: 'cols_id', type: 'string'},
        {name: 'invoice_id', type: 'string'},
        {name: 'place_id', type: 'string'},
        {name: 'produce_id', type: 'string'},
        {name: 'period', type: 'string'},
        {name: 'sale', type: 'number'},
        {name: 'sale_percent', type: 'number'},
        {name: 'price', type: 'number'},
        {name: 'price_base', type: 'number'},
        {name: 'title', type: 'string'},
        {name: 'date_create', type: 'date'},
        {
            name: 'date_create_short', type: 'string', calculate(data) {
                return Ext.Date.format(data.date_create, "Y-m-d H:i");
            }
        },
        {
            name: 'place_title',
            calculate(data) {
                return User.placesObj[data.place_id] ? User.placesObj[data.place_id].title : '';
            }
        },
        {
            name: 'user_title',
            calculate(data) {
                return User.workersObj[data.user_id] ? User.workersObj[data.user_id].params.name + ' ' + User.workersObj[data.user_id].params.surname : '';
            }
        },

    ],
});