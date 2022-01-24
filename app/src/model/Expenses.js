Ext.define('Erp.model.Expenses', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'comment', type: 'string'},
        {name: 'doc_date', type: 'string'},
        {name: 'date_create', type: 'date'},
        {name: 'doc_number', type: 'string'},
        {name: 'place_id', type: 'string'},
        {name: 'id', type: 'string'},
        {name: 'price_total', type: 'number'},
        {name: 'tax_total', type: 'number'},
        {name: 'tax_refund', type: 'boolean'},
        {name: 'paid', type: 'boolean'},
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
                return User.fullName();
            }
        }
    ],
    proxy: {
        type: 'erp_api',
        api: {
            update: Api.inv.expense_edit,
            create: Api.inv.expense_edit
        }
    },

});