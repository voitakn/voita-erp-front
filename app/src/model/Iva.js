Ext.define('Erp.model.Iva', {
    extend: 'Erp.model.Base',
    idProperty: 'value',
    fields: [
        {name: 'value', type: 'number'},
        {name: 'name',  type: 'string'},
    ]
});
