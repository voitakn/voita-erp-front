Ext.define('Erp.view.admin.groles.GrolesCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin_groles_ctrl',
    bindings: {
        roleSelected: '{grole_id}',
        onSchemeSelected: '{filter_scheme}',
        onClusterSelected: '{filter_cluster}',
    },
    onViewRender() {
       //console.('onViewRender');
        //this.onSchemeSelected();
    },
    addNewRole(){
        const me = this,
            grid = me.lookup('groles_grid');
        let store = grid.getStore();
        let records = store.insert(0, {cmp: '', proc: '', title: '', can_use: false, active: true, level: 2});
        grid.getPlugin('rowedit').startEdit(records[0], 0);
    },

    onSchemeSelected(scheme) {
        const vm = this.getViewModel();
       //console.('onSchemeSelected', scheme, vm);
        if(vm) {
            const store = vm.getStore('groles_store');
            if(store) {
                store.load();
            }
        }
    },
    onClusterSelected(cluster) {
        const vm = this.getViewModel();
       //console.('onClusterSelected', cluster, vm);

        if(vm) {
            if(cluster === '') {
                vm.set('filter_cluster', null);
            } else {
                const store = vm.getStore('groles_store');
                if(store) {
                    store.load();
                }
            }
        }
    },
    /**
     * {name: 'id', type: 'string'},
     {name: 'cmp',  type: 'string'},
     {name: 'proc',  type: 'string'},
     {name: 'title',  type: 'string'},
     {name: 'can_use',  type: 'boolean'},
     {name: 'active',  type: 'boolean'},
     {name: 'level',  type: 'int'}
     * @param grid
     * @param sels
     */

    onItemSelected(grid, sels){
        const me = this;
        let vm = me.getViewModel();
        let store = vm.getStore('groles_groups');
        if (sels.length > 0) {
            let rec = sels[0],
                id = rec.get('id');
            if(User.checkAccess('adm.groles_groups')) {
                store.getProxy().setExtraParams({id: id});
                store.load();
            } else {
                store.loadData([]);
            }
        } else {
            store.loadData([]);
        }
    },

    onShowGroups(grid, row){
        const record = row.record;
        const vm = this.getViewModel();
        const tooltip = this.lookup('groups_tooltip');
        vm.set('grole_id', record.get('id'));
        if(tooltip){
            tooltip.setTarget(row.event.target);
            tooltip.show();
        }

    },

    roleSelected(grole_id){
        const vm = this.getViewModel();
        const store = vm.getStore('groups_store');
        if(User.checkAccess('adm.groles_groups')) {
            if(store && grole_id){
                store.load();
            }
        }
    },

    editItem(grid, row) {
        grid.getPlugin('rowedit').startEdit(row.record, 0);
    },

    deleteItem(grid, row) {
        const me = this;
        let store = grid.getStore();
        store.setAutoSync(false);
        store.remove(row.record);
        store.sync({
            failure(record, operation) {
                store.rejectChanges();
                store.setAutoSync(true);
            },
            success(record, operation) {
                store.setAutoSync(true);
            }
        });
    },

    editorCancel(btn){
        btn.up('roweditor').cancel();
        this.lookup('groles_grid').getStore().rejectChanges();
    }
});
