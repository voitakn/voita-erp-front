Ext.define('Erp.model.WorkerMain', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'login',  type: 'string'},
        {name: 'params',  type: 'auto'}
    ]
});
