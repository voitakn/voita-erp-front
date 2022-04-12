Ext.define('Erp.model.PosList', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'place_id', type: 'string'},
        {
            name: 'place_title', type: 'string', calculate(data) {
                if (data.place_id) {
                    const store = Ext.data.StoreManager.lookup('placesStore');
                    if(store) {
                        const record = store.getById(data.place_id);
                        return record.get('title');
                    }
                }
            }
        },
        {name: 'user_id', type: 'string'},
        {
            name: 'user_title', type: 'string',
            calculate(data) {
                if (data.user_id) {
                    const store = Ext.data.StoreManager.lookup('workersStore');
                    if(store && store.getById(data.user_id)) {
                        const record = store.getById(data.user_id).data.params;
                        if(record) {
                            return Ext.String.format('{0} {1}',
                                record.name,
                                record.surname
                            );
                        }
                    } else {
                        return `${User.data.params.name} ${User.data.params.surname}`;
                    }
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