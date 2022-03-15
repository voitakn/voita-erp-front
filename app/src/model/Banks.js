Ext.define('Erp.model.Banks', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'default', type: 'boolean'},
        {name: 'iban', type: 'string'},
        {name: 'id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'swift', type: 'string'},
    ],
});
