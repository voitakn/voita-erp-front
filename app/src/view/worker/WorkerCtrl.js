Ext.define('Erp.view.worker.WorkerCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.workers_ctrl',
    bindings: {
        onShowCard: '{theCard}',
    },
    /**
     * Загрузим дерево каталога после рендера
     */
    afterViewShow() {
        const me = this;
        const vm = me.getViewModel();
        me.onCloseCard();
        const store = vm.getStore('workers_store');
        store.load();
        me.setActiveMenu('workers');
    },

    onCloseCard() {
        const grid = this.lookup('worker_grid');
        grid.deselectAll();
    },

    addNewWorker(btn) {
        const me = this;
        const vm = this.getViewModel();
        const form = me.lookup('worker_new_form');
        const chipview_places_list = me.lookup('chipview_places_list');
        const chipview_groups_list = me.lookup('chipview_groups_list');
        const tooltip = me.lookup('worker_new');
        const field = tooltip.down('textfield');
        const grid = me.lookup('worker_grid');
        const places_store = vm.getStore('places_store');
        const worker_groups_store = vm.getStore('worker_groups_store');
        grid.deselectAll();
        places_store.load();
        worker_groups_store.load();
        chipview_places_list.setStore(places_store);
        chipview_groups_list.setStore(worker_groups_store);
        tooltip.setTarget(btn);
        tooltip.show();
        if (field) {
            field.focus();
        }
        form.validate();
    },
    onSaveNew(btn) {
        const me = this;
        const vm = this.getViewModel();
        const newWorker = vm.get('newWorker');
        const form = btn.up('formpanel');
        const workerNewTooltip = me.lookup('worker_new');
        const store = vm.getStore('workers_store');
        const places_store = vm.getStore('places_store');
        const worker_groups_store = vm.getStore('worker_groups_store');
        let places = [];
        let groups = [];
        Ext.Array.each(places_store.getRange(), (rec) => {
            places.push(rec.get('id'));
        });
        Ext.Array.each(worker_groups_store.getRange(), (rec) => {
            groups.push(rec.get('id'));
        });
        if (form.validate()) {
            Ext.Ajax.request({
                url: Api.com.worker_save,
                jsonData: {
                    active: newWorker.active,
                    login: newWorker.login,
                    passwd: newWorker.passwd,
                    params: newWorker.params,
                    id: '',
                    customer_id: '',
                    date_create: null,
                    places: places,
                    groups: groups
                },
                method: "POST",
                success: function (resp) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    const data = result.data;
                    const row = data[0];
                   //console.('onSaveNew', row);
                    store.add(row);
                    workerNewTooltip.hide();
                    me.onCancelNew();
                },
            });
        }
    },
    onCancelNew(btn) {
        const me = this;
        this.getViewModel().set('newWorker', {params: {}});
        const tooltip = me.lookup('worker_new');
        tooltip.hide();
    },

    onSelectPlaces(field, records, tooltip) {
        const vm = this.getViewModel();
        const places = records.map(rec => rec.get('id')) || [];
        Ext.Ajax.request({
            url: Api.com.worker_place_save,
            jsonData: {
                id: vm.get('theCard.id'),
                places
            },
            method: "POST",
            success: function(resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if(result.data && result.success){
                    vm.set('fullCard.places', result.data);
                    vm.getStore('places_store').loadData(result.data);
                    tooltip.hide();
                }
            },
        });
    },

    onSelectGroups(field, records, tooltip) {
        const vm = this.getViewModel();
        const items = records.map(rec => rec.get('id')) || [];
        Ext.Ajax.request({
            url: Api.com.worker_group_save,
            jsonData: {
                id: vm.get('theCard.id'),
                items
            },
            method: "POST",
            success: function (resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.data && result.success) {
                    vm.set('fullCard.groups', result.data);
                    vm.getStore('worker_groups_store').loadData(result.data);
                    tooltip.hide();
                }
            },
        });
    },
    onSelectPoint(record) {
        const me = this;
        const vm = me.getViewModel();
        const places_list = me.lookup('places_list');
        const places_store = vm.getStore('places_store');
        places_store.add(record);
        places_list.hide();

    },
    onSelectGroup(record) {
        const me = this;
        const vm = me.getViewModel();
        const places_list = me.lookup('places_list');
        const worker_groups_store = vm.getStore('worker_groups_store');
        worker_groups_store.add(record);
        places_list.hide();

    },
    onAddPoints(btn) {
        const me = this;
        const vm = me.getViewModel();
        const add_places_store = vm.getStore('add_places_store');
        const places_list = me.lookup('places_list');
        const list_places_store = me.lookup('list_places_store');
        list_places_store.setOnItemDisclosure('onSelectPoint');
        places_list.setTarget(btn);
        places_list.show();
        add_places_store.load();
        list_places_store.setStore(add_places_store);

    },
    onAddRoles(btn) {
        const me = this;
        const vm = me.getViewModel();
        const add_places_store = vm.getStore('add_groups_store');
        const places_list = me.lookup('places_list');
        const list_places_store = me.lookup('list_places_store');
        list_places_store.setOnItemDisclosure('onSelectGroup');
        places_list.setTarget(btn);
        places_list.show();
        add_places_store.load();
        list_places_store.setStore(add_places_store);
    },
    removePoints(chipview, location) {
        const me = this;
        const vm = me.getViewModel();
        const places_store = vm.getStore('places_store');
        places_store.remove(location.record);
        return false;
    },
    removeGroups(chipview, location) {
        const me = this;
        const vm = me.getViewModel();
        const worker_groups_store = vm.getStore('worker_groups_store');
        worker_groups_store.remove(location.record);
        return false;
    }
});
