Ext.define('Erp.model.SubsInvoice', {
    extend: 'Erp.model.Base',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'status', type: 'number'},
        {name: 'inv_id', type: 'string'},
        {name: 'inv_number', type: 'string'},
        {name: 'inv_pdf', type: 'string'},
        {name: 'inv_url', type: 'string'},
        {name: 'total', type: 'number'},
        {name: 'date_create', type: 'date'},
        {name: 'date_create_text', type: 'string',
            calculate(data) {
                return Ext.Date.format(data.date_create, "Y-m-d H:i");
            }
        },
        {name: 'inv_data', type: 'auto'},
        {name: 'status_text', type: 'string',
            calculate(data) {
                let stText;
                switch (Number(data.status)){
                    case 10:
                        stText = i18n.gettext('Paid');
                        break;
                    default:
                        stText = i18n.gettext('Unpaid');
                        break;
                }
                return stText;
            }
        },
        {name: 'status_cls', type: 'string',
            calculate(data) {
                let stText;
                switch (Number(data.status)){
                    case 10:
                        stText = 'status-confirm';
                        break;
                    default:
                        stText = 'status-failed';
                        break;
                }
                return stText;
            }
        }

    ],
});