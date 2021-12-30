Ext.define('Erp.model.PlaceMain', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'title',  type: 'string'},
        {name: 'params',  type: 'auto'},
        {name: 'main',  type: 'bool'}
    ]
});
