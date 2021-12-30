Ext.define('Erp.view.movement.card.CardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.movement_card_vm',
    data: {
        show_invoice: {},
        year: Ext.Date.format(new Date(), 'Y'),
    },
    stores: {
        move_invoice_items_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.MoveList',
            autoLoad: false,
            autoSync: false,
            proxy: {
                type: 'erp_api',
                url: Api.inv.move_invoice_items,
                extraParams: {
                    invoice_id: '{show_invoice.id}',
                    period_year: '{year}'
                }
            }
        }
    },
    formulas: {
        status: {
            bind: {
                bindTo: '{show_invoice}',
                deep: true
            },
            get(invoice) {
                switch (invoice.status) {
                    case 0:
                        this.set('status_cls', 'gray-light-bg');
                        return `${i18n.gettext('Status')}: ${i18n.gettext('Created')}`;
                    case 1:
                        this.set('status_cls', 'blue-light-bg');
                        return `${i18n.gettext('Status')}: ${i18n.gettext('Sending')}`;
                    case 2:
                        this.set('status_cls', 'yellow-bg');
                        return `${i18n.gettext('Status')}: ${i18n.gettext('Is not complete')}`;
                    case 3:
                        this.set('status_cls', 'blue-light-bg');
                        return `${i18n.gettext('Status')}: ${i18n.gettext('Item sent back')}`;
                    case 4:
                        this.set('status_cls', 'gray-bg');
                        return `${i18n.gettext('Status')}: ${i18n.gettext('Item returned')}`;

                    case 10:
                        this.set('status_cls', 'status-confirm');
                        return `${i18n.gettext('Status')}: ${i18n.gettext('Received')}`;

                    case -1:
                        this.set('status_cls', 'status-failed');
                        return `${i18n.gettext('Status')}: ${i18n.gettext('Lost')}`;

                    default:
                        this.set('status_cls', 'status-failed');
                        return `${i18n.gettext('Status')}: ${i18n.gettext('Undefined')}`;
                }
            }
        },
        no_move_dispatched: {
            bind: {
                bindTo: '{show_invoice}',
                deep: true
            },
            get(show_invoice) {
                const request = (show_invoice.from_user_id === User.data.user_id || User.data.groups['admin']) ? ((show_invoice.status !== 0)) : true;
                return request;
            }
        },
        no_move_accepted: {
            bind: {
                bindTo: '{show_invoice}',
                deep: true
            },
            get(show_invoice) {
                const request = (show_invoice.from_user_id !== User.data.user_id || User.data.groups['admin']) ? ((show_invoice.status === 1) ? false : true) : true;
                return request;
            }
        },

    }
});