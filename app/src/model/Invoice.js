Ext.define('Erp.model.Invoice', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'y_m', type: 'string'},
        {name: 'paid', type: 'bool'},
        {name: 'title', type: 'string'},
        {name: 'period', type: 'string'},
        {name: 'revert', type: 'bool'},
        {name: 'doc_date', type: 'string'},
        {name: 'pay_type', type: 'string'},
        {name: 'tax_total', type: 'number'},
        {name: 'doc_number', type: 'string'},
        {name: 'pay_params', type: 'auto'},
        {name: 'customer_id', type: 'string'},
        {name: 'date_create', type: 'date'},
        {name: 'price_total', type: 'number'},
        {name: 'amount_total', type: 'number'},
        {name: 'customer_id_net', type: 'string'},
        {name: 'invoice_id_net', type: 'string'},
        {name: 'paid', type: 'bool'},
        {name: 'paid_params', type: 'auto'},
        {name: 'user_id', type: 'string'},
        {name: 'place_id', type: 'string'},
        {
            name: 'user_data',
            calculate(data){
                return User.workersObj[data.user_id] || {params:{}}
            }
        },{
            name: 'place_title',
            calculate(data){
                return User.placesObj[data.place_id] ? User.placesObj[data.place_id].title : '';
            }
        }
    ]
});