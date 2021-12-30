Ext.define('Erp.model.PosList', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'place_id', type: 'string'},
        {
            name: 'place_title', type: 'string', calculate(data) {
                if (data.place_id) {
                    const record = User.placesStore.getById(data.place_id);
                    return record.get('title');
                }
            }
        },
        {name: 'user_id', type: 'string'},
        {
            name: 'user_title', type: 'string',
            calculate(data) {
                if (data.user_id) {
                    const record = User.workersStore.getById(data.user_id).data.params;
                    return Ext.String.format('{0} {1}',
                        record.name,
                        record.surname
                    );
                }
            }
        },
        {name: 'id', type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'period', type: 'string'},
        {name: 'amount_end', type: 'string'},
        {name: 'amount_start', type: 'string'},
        {name: 'date_close', type: 'date'},
        {name: 'date_open', type: 'date'},
        {name: 'active', type: 'boolean'},
    ],
});