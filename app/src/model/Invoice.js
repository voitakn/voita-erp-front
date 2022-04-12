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
            calculate(data) {
                if (data.user_id) {
                    const store = Ext.data.StoreManager.lookup('workersStore');
                    // console.log('store', store);
                    if(store && store.getById(data.user_id)) {
                        const record = store.getById(data.user_id);
                        if(record) {
                            return {
                                params: record.data.params,
                                login: record.data.login
                            };
                        }
                    } else {
                        return {
                            params: User.data.params,
                            login: User.data.login
                        };
                    }
                }
            }
        },{
            name: 'place_title',
            calculate(data){
                if (data.place_id) {
                    const store = Ext.data.StoreManager.lookup('placesStore');
                    if(store) {
                        const record = store.getById(data.place_id);
                        return record.get('title');
                    }
                }
            }
        }
    ]
});