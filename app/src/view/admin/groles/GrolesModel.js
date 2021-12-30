/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Erp.view.admin.groles.GrolesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin_groles_vm',
    data: {
        grole_id: null,
        filter_scheme: null,
        filter_cluster: null,
    },
    stores: {
        groles_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.admin.Grole',
            autoLoad: false,
            autoSync: true,
            pageSize: 50,
            remoteSort: true,
            sorters: 'level',
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.adm.groles_list,
                    create: Api.adm.groles_save,
                    update: Api.adm.groles_save,
                    destroy: Api.adm.groles_delete
                },
                extraParams: {
                    scheme: '{filter_scheme}',
                    is_cluster: '{filter_cluster}'
                }
            },
        },
        groups_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.admin.Group',
            autoLoad: false,
            autoSync: true,
            pageSize: 50,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.adm.groles_groups
                },
                extraParams: {
                    id: '{grole_id}'
                }
            }
        },
        schemes_store: {
            extend: 'Erp.data.Store',
            fields: [{name:'id', type: 'string'},{name:'text', type: 'string'}],
            autoLoad: true,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.adm.scheme_list
                }
            }
        }
    },
    formulas: {
        no_adm_groles_save: function(get){
            return !User.checkAccess('adm.groles_save');
        },
        no_adm_groles_delete: function(get){
            return !User.checkAccess('adm.groles_delete');
        },
        no_adm_groles_groups: function(get){
            return !User.checkAccess('adm.groles_groups');
        }
    }
});
