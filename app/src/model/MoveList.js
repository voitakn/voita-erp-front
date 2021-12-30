Ext.define('Erp.model.MoveList', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'amount_total', type: 'string'},
        {name: 'boxes', type: 'string'},
        {name: 'comment', type: 'string'},
        {name: 'customer_id', type: 'string'},
        {name: 'date_create', type: 'date'},
        {name: 'date_update', type: 'date'},
        {name: 'doc_index', type: 'string'},
        {name: 'doc_number', type: 'string'},
        {name: 'from_place_id', type: 'string'},
        {name: 'from_user_id', type: 'string'},
        {name: 'id', type: 'string'},
        {name: 'params', type: 'auto'},
        {name: 'period', type: 'string'},
        {name: 'period_year', type: 'string'},
        {name: 'price_total', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'to_place_id', type: 'string'},
        {name: 'to_user_id', type: 'string'},
        {
            name: 'date_create_short', type: 'date', calculate(data) {
                return Ext.Date.format(data.date_create, "Y-m-d H:i");
            }
        },

        // {
        //     name: 'opened', type: 'boolean', calculate(data) {
        //         return !data.closed;
        //     }
        // },
        // {
        //     name: 'user_from', type: 'string',
        //     calculate(data) {
        //         let from_user_id = data.from_user_id;
        //         if (from_user_id) {
        //             const record = User.workersStore.getById(from_user_id).data.params;
        //             return Ext.String.format('{0} {1}',
        //                 record.name,
        //                 record.surname
        //             );
        //         }
        //     }
        // },
        // {
        //     name: 'admin_title', type: 'string',
        //     calculate(data) {
        //         if (data.customer_id) {
        //             const record = User.workersStore.getById(data.customer_id).data.params;
        //             return Ext.String.format('{0} {1}',
        //                 record.name,
        //                 record.surname
        //             );
        //         }
        //     }
        // },
        // {
        //     name: 'title', type: 'string',
        //     calculate(data) {
        //         if (data.id)
        //             return Ext.String.format('<a href="/#move_card/{0}"><b>№ {1} {2} {3}</b></a>', `${data.id}`, `${data.doc_number}`, `${i18n.gettext('from')}`,
        //             `${data.date_create_short}`);
        //     }
        // },
        {
            name: 'req_result', type: 'string',
            calculate(data) {
                if (data.status === '2') {
                    return i18n.gettext('2');
                } else if (data.status === '1') {
                    return i18n.gettext('1');
                } else {
                    return i18n.gettext('0');
                }
            }
        }
    ],
});