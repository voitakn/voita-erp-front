Ext.define('Erp.model.PricesRules', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'active', type: 'bool'},
        {name: 'markup', type: 'number'},
        {name: 'retail', type: 'bool'},
        {name: 'percent', type: 'number'},
        {name: 'purchase', type: 'bool'},
        {name: 'parent_id', type: 'string'},
        {name: 'customer_id', type: 'string'},
        {name: 'user_id', type: 'string'},
        {name: 'type_change', type: 'number'},
        {name: 'date_update', type: 'date'},
        {
            name: 'date_update_short', type: 'string', calculate(data) {
                return Ext.Date.format(data.date_update, "Y-m-d H:i");
            }
        },
        {
            name: 'user_title',
            calculate(data) {
                let user = User.workersObj[data.user_id];
                if (user) {
                    return user.params.name + ' ' + user.params.surname;
                }
                return '';
            }
        },
        {
            name: 'affect_price',
            calculate(data) {
                return data.parent_id && User.rulesObj[data.parent_id] ? User.rulesObj[data.parent_id].title : 'Not';
            }
        },
    ],
    proxy: {
        type: 'erp_api',
        api: {
            update: Api.price.cols_save,
        },
    },
});
