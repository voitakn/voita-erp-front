Ext.define('Erp.model.Partners', {
    extend: 'Erp.model.Base',
    fields: [

        {name: 'phone', type: 'string'},
        {name: 'params', type: 'auto'},
        {name: 'email', type: 'string'},
        {name: 'id', type: 'string'},
        {name: 'customer_id', type: 'string'},
        {name: 'customer_id_net', type: 'string'},
        {name: 'country', type: 'number'},
        {name: 'title', type: 'string'},
        {name: 'applied', type: 'date'},
        {name: 'created', type: 'date'},
        {
            name: 'created_short', type: 'string', calculate(data) {
                return Ext.Date.format(data.created, "Y-m-d H:i");
            }
        },
        {
            name: 'applied_short', type: 'string', calculate(data) {
                return Ext.Date.format(data.applied, "Y-m-d H:i");
            }
        },
        {
            name: 'customer_title_net',
            calculate(data) {
                return User.workersObj[data.customer_id_net] ? User.workersObj[data.customer_id_net].params.name + ' ' + User.workersObj[data.customer_id_net].params.surname : '';
            }
        },

    ],
});