Ext.define('Erp.model.Worker', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'login', type: 'string'},
        {name: 'passwd', type: 'string'},
        {name: 'customer_id', type: 'string'},
        {name: 'params', type: 'auto'},
        {name: 'active', type: 'bool'},
        {name: 'date_create', type: 'date'}
    ],
    validators: [
        {
            email: {
                type: 'format',
                matcher: /^(([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})){0,24}$/,
                message: i18n.gettext('The e-mail should be like this:' + ' email@mail.com'),
            }
        },
        {
            Spassw: {
                type: 'length',
                min: 8
            },
        },
    ],
    proxy: {
        type: 'erp_api',
        api: {
            update: Api.com.worker_save,
        },
    },
});
