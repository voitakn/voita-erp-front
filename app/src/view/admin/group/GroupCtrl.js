Ext.define('Erp.view.admin.group.GroupCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin_group_ctrl',
    bindings: {
        groupSelected: '{groups_selection}'
    },
    addNewItem: function(){
        const me = this,
            grid = me.lookup('groups_grid');
        let store = grid.getStore();
        let records = store.insert(0, {title: '', can_use: false, active: true});
        grid.getPlugin('rowedit').startEdit(records[0], 0);
    },

    groupSelected: function(record){
        const me = this;
        const vm = me.getViewModel();
        const roles_grid = me.lookup('group_roles_grid');
        let roles_store = roles_grid.getStore();

        if(record && record.isModel){
            const id = record.id;
            if(User.checkAccess('adm.group_roles_list')) {
                vm.set('select_id', id);
                vm.set('select_record', record);
                roles_store.load({
                    params: {id: id}
                });
            }
        } else {
            vm.set('select_id', null);
            vm.set('select_record', null);
            roles_store.loadData([]);
        }
    },

    editItem: function(grid, row) {
       //console.('editItem', grid, row);
        grid.getPlugin('rowedit').startEdit(row.record, 0);
    },
    editorCancel: function(btn){
        btn.up('roweditor').cancel();
        this.lookup('groups_grid').getStore().rejectChanges();
    },

    addRolesToGroup: function(btn) {
        let me = this,
            vm = me.getViewModel(),
            ids = [],
            roles = vm.getStore('group_roles_store');
        roles.each(function(model){
            ids.push(model.get('id'));
        });
        me.dialog = Ext.create({
            xtype: 'grolesselect',
            viewModel: {
                data: {
                    ids: ids
                }
            },
            listeners: {
                onSave: function(win) {
                    me.saveRolesList(win);
                }
            }
        });
        me.dialog.show();
    },

    saveRolesList: function(win) {
        let me = this,
            vm = me.getViewModel(),
            groles = [],
            id = vm.get('select_id'),
            recs = win.lookup('common_groles_grid').getSelectable().getSelectedRecords();
        Ext.Array.each(recs, function(item){
            groles.push(item.get('id'));
        });
        if(id) {
            me.sendRoles(id, groles);
        }
        me.dialog.destroy();
    },

    deleteRoles: function(btn) {
        let me = this,
            vm = me.getViewModel(),
            id = vm.get('select_id'),
            groles = [],
            groles_d = [],
            rstore = vm.getStore('group_roles_store'),
            sels = me.lookup('group_roles_grid').getSelectable().getSelectedRecords();
        Ext.Array.each(sels, function(item){
            groles_d.push(item.get('id'));
        });
        rstore.each(function(rec){
            let id = rec.get('id');
            if(groles_d.indexOf(id) == -1){
                groles.push(id);
            }
        });
        me.sendRoles(id, groles);
    },

    sendRoles: function(id, groles){
        let me = this,
            vm = me.getViewModel(),
            rstore = vm.getStore('group_roles_store');
        Ext.Ajax.request({
            url: Api.adm.group_roles_save,
            jsonData: {
                groles: groles,
                id: id
            },
            method: "POST",
            success: function(resp, opt) {
                rstore.reload();
            },
            failure:  function(resp, opt) {
                Ext.Msg.alert(i18n.gettext('Error!'), i18n.gettext('Data was not found!'));
            },
        });
    },
    deleteItem: function(grid, row) {
        const me = this;
        let store = grid.getStore();
        store.setAutoSync(false);
        store.remove(row.record);
        store.sync({
            failure: function (record, operation) {
                store.rejectChanges();
                store.setAutoSync(true);
            },
            success: function (record, operation) {
                store.setAutoSync(true);
            }
        });
    }

});
