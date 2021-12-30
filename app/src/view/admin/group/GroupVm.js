Ext.define('Erp.view.admin.group.GroupVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin_group_vm',
    data: {
        select_id: null,
    },
    formulas: {
        group_sel_id: function(get) {
            return get('groups_selection.id') || null;
        },
        no_adm_group_save: function(get){
            return !User.checkAccess('adm.group_save');
        },
        no_adm_group_delete: function(get){
            return !User.checkAccess('adm.group_delete');
        },
        no_adm_group_roles_save: function(get){
            return !User.checkAccess('adm.group_roles_save');
        }
    },
    stores: {
        groups_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.admin.Group',
            autoLoad: true,
            autoSync: true,
            pageSize: 50,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.adm.group_list,
                    create: Api.adm.group_save,
                    update: Api.adm.group_save,
                    destroy: Api.adm.group_delete
                }
            }
        },
        group_roles_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.admin.Grole',
            autoLoad: true,
            autoSync: false,
            pageSize: 50,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.adm.group_roles_list,
                },
                extraParams: {
                    id: '{group_sel_id}'
                }
            },
        },

    }
});
