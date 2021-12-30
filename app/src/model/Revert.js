Ext.define('Erp.model.Revert', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'date_closed', type: 'date'},
        {name: 'date_create', type: 'date'},
        {
            name: 'date_create_short', type: 'date', calculate(data) {
                return Ext.Date.format(data.date_create, "Y-m-d H:i");
            }
        },
        {name: 'doc_date', type: 'string'},
        {name: 'doc_number', type: 'string'},
        {name: 'event', type: 'string'},
        {name: 'id', type: 'string'},
        {name: 'invoice_id', type: 'string'},
        {name: 'period', type: 'string'},
        {name: 'user_id', type: 'string'},
        {name: 'admin_id', type: 'string'},
        {name: 'customer_id', type: 'string'},
        {name: 'price_total', type: 'string'},
        {name: 'comment', type: 'string'},
        {name: 'closed', type: 'boolean'},
        {name: 'revert', type: 'boolean'},
        {name: 'paid', type: 'boolean'},
        {
            name: 'opened', type: 'boolean', calculate(data) {
                return !data.closed;
            }
        },
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
        {
            name: 'admin_title', type: 'string',
            calculate(data) {
                if (data.admin_id) {
                    const record = User.workersStore.getById(data.admin_id).data.params;
                    return Ext.String.format('{0} {1}',
                        record.name,
                        record.surname
                    );
                }
            }
        },
        {
            name: 'title', type: 'string',
            calculate(data) {
                if (data.id)
                    return Ext.String.format('<a href="/#sell_card/{0}"><b>№ {1} {2} {3}</b></a>', `${data.invoice_id}`, `${data.doc_number}`, `${i18n.gettext('from')}`, `${data.date_create_short}`);
            }
        },{
            name: 'req_result', type: 'string',
            calculate(data) {
                if(data.event === 'approved') {
                    return i18n.gettext('Approved');
                } else if(data.event === 'rejected') {
                    return i18n.gettext('Rejected');
                } else {
                    return i18n.gettext('In progress');
                }
            }
        }
    ],
});