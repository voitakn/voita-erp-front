Ext.define('Erp.model.WorkerGroup', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'title',  type: 'string'},
        {name: 'active',  type: 'bool'},
    ]
});
