/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Erp.view.admin.customer.CustomerModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin_customer_vm',
    data: {
        filter_search: null,
        filter_country_id: null,
        newCard: {},
    },
    formulas: {
        no_adm_customer_create: function(get) {
            return !User.checkAccess('adm.customer_create');
        },
        no_adm_customer_save: function(get) {
            return !User.checkAccess('adm.customer_save');
        },
        no_adm_customer_edit: function(get) {
            return !User.checkAccess('adm.customer_save');
        },
        no_adm_customer_edit_btn: function(get) {
            return !(User.checkAccess('adm.customer_save') && get('theCard.id'));
        },
        on_new_form: function(get){
            return !!get('newCard.customer');
        },
        on_country_select: {
            bind: {
                bindTo: '{newCard_country}',
                deep: true
            },
            get: function(record) {
                if(record && record.isModel){
                    const params = record.get('params');
                    this.set('newCard.customer.params', params);
                    this.set('newCard.customer.phone', params.code_phone);
                    this.set('newCard.customer.currency', params.currency.name);
                    return record.id;
                } else {
                    return null;
                }
            }
        }
    },
    stores: {
        customers_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.admin.Customer',
            autoLoad: false,
            autoSync: false,
            pageSize: 50,
            remoteSort: true,
            sorters: {
                property: 'title'
            },
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.adm.customer_list
                },
                extraParams: {
                    search: '{filter_search}',
                    country_id: '{filter_country_id}'
                }
            },
        },
        card_users_list: {
            extend: 'Erp.data.Store',
            fields: [
                {name: 'id', type: 'string'},
                {name: 'login', type: 'string'},
                {name: 'params', type: 'auto'},
                {name: 'active', type: 'bool'},
                {name: 'date_create', type: 'auto'}
            ],
            data: [],
            proxy: {
                type: 'memory',
            }
        },
        card_places_list: {
            extend: 'Erp.data.Store',
            fields: [
                {name: 'id', type: 'string'},
                {name: 'title', type: 'string'},
                {name: 'params', type: 'auto'}
            ],
            data: [],
            proxy: {
                type: 'memory',
            }
        }

    },
});
