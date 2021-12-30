Ext.define('Erp.model.Place', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'title',  type: 'string'},
        {name: 'customer_id',  type: 'string'},
        {name: 'params',  type: 'auto'},
        {name: 'main',  type: 'bool'}
    ],
    proxy: {
        type: 'erp_api',
        api: {
            update: Api.com.place_save,
        },
    },
});
