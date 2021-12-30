Ext.define('Erp.view.catalog.CatalogCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.catalog_ctrl',
    bindings: {
        catalogSell: '{catalog_selection}',
        doSearch: '{filter_search}',
        reloadProduce: '{filter_catalog_id}',
    },
    all_rendered: false,
    onTreeRender() {
        const tree = this.lookup('catalog_tree_edit');
        const treeStore = tree.getStore();
        treeStore.setData(User.catalogData);
    },
    onViewRender() {
        this.onCatalogRender();
    },
    onViewShow() {
        if(this.all_rendered) {
            User.catalogStore.clearFilter();
            this.loadProduce();
        }
    },
    onCatalogRender(){
        const vm = this.getViewModel();
        const taxes_store = vm.getStore('taxes_store');
        taxes_store.loadData(User.taxes());

        Ext.Ajax.request({
            url: Api.price.get_retail,
            method: "POST",
            jsonData: {},
            success: function(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if(result.data) {
                    const data = result.data;
                    const row = data[0];
                    vm.set('price_retail', row);
                }
                //console.log('Api.price.get_retail', result.data);
            },
            failure:  function(resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });
    },
    doSearch(search){
        //console.log('doSearch', search);
        if(!search || search.length === 0 || search.length > 2){
            this.reloadProduce();
        }
    },
    catalogSell(catalog){
        //console.log('catalogSell', catalog);
        if(catalog && catalog.isModel){
            this.getViewModel().set('filter_catalog_id', catalog.get('id'));
        } else {
            this.getViewModel().set('filter_catalog_id', null);
        }
    },
    loadProduce() {
        this.getViewModel().getStore('produce_store').load();
    },
    reloadProduce(filter_catalog_id){
        //console.log('reloadProduce', filter_catalog_id);
        if(this.all_rendered) {
            this.getViewModel().getStore('produce_store').loadPage(1);
        } else {
            this.all_rendered = true;
        }
    },
    /**
     * Редактируем раздел каталога из списка
     * @param grid
     * @param row
     */
    editItemCatalog(grid, row) {
        var me = this,
            vm = me.getViewModel();
        vm.set('catalog', row.record);
        vm.set('catalog_edit_title', i18n.gettext('Section editing'));

        me.showCatalogTooltip(row.event.target);
    },
    /**
     * Добавляем новый раздел каталога по + в существующий
     * @param grid
     * @param row
     */
    addNewCatalog(grid, row) {
        const me = this;
        const vm = me.getViewModel();
        const node = {
            id: -1,
            title: "",
            parent_id: row.record.get('id'),
            serv: row.record.get('serv'),
            main_catalog: false,
            mtype: "Section",
            leaf: true,
            is_edit: true
        };
        vm.set('catalog_edit_title', i18n.gettext('Section adding'));
        vm.set('catalog', node);
        me.showCatalogTooltip(row.event.target);
    },
    /**
     * Тултип редактирования каталога под нажатой кнопкой
     * @param target
     */
    showCatalogTooltip(target) {
        const me = this;
        const tooltip = me.lookup('catalog_edit_tooltip');
        //console.log('showCatalogTooltip', target);
        tooltip.setTarget(target);
        tooltip.show();
        const field = tooltip.down('textfield');
        if (field) {
            field.focus();
        }
    },
    /**
     * кнопка отмена редактирования каталога
     */
    cancelCatalogEdit() {
        const me = this;
        const vm = me.getViewModel();
        const catalog = vm.get('catalog');
        if(catalog && catalog.isModel){
            const store = me.lookup('catalog_tree_edit').getStore();
            store.rejectChanges();
        }
        vm.set('catalog', null);
        //console.log('cancelCatalogEdit');
    },
    /**
     * кнопка сохранить каталог из тултипа каталога
     * @param btn
     */
    saveCatalog(btn) {
        var me = this,
            vm = me.getViewModel(),
            tree = me.lookup('catalog_tree_edit'),
            store = tree.getStore(),
            catalog = vm.get('catalog'),
            tooltip = me.lookup('catalog_edit_tooltip');
            let record = catalog;
        if(!catalog.isModel){
            let parent_id = catalog.parent_id,
                parent = store.getById(parent_id),
                cat_model = Ext.create('Erp.model.Catalog', catalog);
            record = parent.appendChild(cat_model);
        }
        record.save({
            callback: function(record, operation, success) {
                tooltip.hide();
            }
        });
    },
    /**
     * Свернем разделы каталога
     * @param btn
     */
    collapseCatalog(btn) {
        var me = this,
            view = me.lookup('catalog_tree_edit');
        view.collapseAll();
    },
    /**
     * Развернем разделы каталога
     * @param btn
     */
    expandCatalog(btn) {
        const me = this;
        const tree = me.lookup('catalog_tree_edit');
        tree.expandAll();
    },

    onCancelNew(btn){
        const me = this;
        const vm = me.getViewModel();
        vm.set('newProd', {catalog_id: null});
        vm.set('newServ', {catalog_id: null});
        //me.lookup('catalogfield').getViewModel().set('catalog_id', null);
        this.goToProducesList();
    },

    onSaveNew(btn){
        const me = this;
        const vm = me.getViewModel();
        const prStore = vm.getStore('produce_store');
        const places_amount = this.lookup('places_amount');
        let newRec = null;
        if(btn.up('formpanel').validate()) {
            if(btn.serv === true){
                newRec = vm.get('newServ');
            } else {
                newRec = vm.get('newProd');
            }
            Ext.Ajax.request({
                url: Api.com.produce_save,
                method: "POST",
                jsonData: newRec,
                success(resp, opt) {
                    const result = Ext.JSON.decode(resp.responseText);
                    //Notice.showToast(result);
                    if(result.success === true) {
                        Ext.create({
                            xtype: 'base_dialog',
                            width: 300,
                            title: i18n.gettext('Successfully'),
                            html: `<b>${Notice.com.produce_save.info}</b>`,
                            buttons: [{
                                xtype: 'button',
                                text: i18n.gettext('To list'),
                                iconCls: 'x-fa fa-arrow-left red',
                                handler(btn){
                                    me.goToProducesList();
                                    btn.up('dialog').destroy();
                                }
                            },{
                                xtype: 'button',
                                cls: 'green-dark',
                                iconCls: 'x-fas fa-file-invoice',
                                text: i18n.gettext('To card'),
                                margin: '0 0 0 10',
                                handler(btn){
                                    me.redirectTo(`produce/${result.data.id}`);
                                    btn.up('dialog').destroy();
                                }
                            }]
                        }).show();
                    } else {
                        Notice.showToast(result);
                    }
                },
                failure(resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                },
            });
            //console.log('newRec', newRec);
        } else {
            Notice.showToast({success: false, code_err: 'all.not_required'});
        }
    },

    goToProducesList(){
        const catalog_right = this.lookup('catalog_right');
        const places_amount = this.lookup('places_amount');
        //console.log('goToProducesList', places_amount);
        catalog_right.setActiveItem(0);
        if(places_amount) {
            places_amount.resetDataStore();
        }
        this.onViewShow();
    },

    addNewProduce(btn){
        //console.log('addNewProduce');
        const me = this;
        const vm = me.getViewModel();
        const row = vm.get('price_retail');
        const catalog_right = me.lookup('catalog_right');
        vm.set('newProd', {
            cols_id: row.cols_id,
            cols_title: row.title,
            cols_percent: row.percent,
            cols_markup: row.markup,
            price: '',
            catalog_id: null,
            params: {},
            serv: false
        });
        catalog_right.setActiveItem(1);
    },

    addNewService(btn){
        //console.log('addNewService');
        const me = this;
        const vm = me.getViewModel();
        const row = vm.get('price_retail');
        const catalog_right = me.lookup('catalog_right');
        vm.set('newServ', {
            cols_id: row.cols_id,
            cols_title: row.title,
            cols_percent: row.percent,
            cols_markup: row.markup,
            price: '',
            catalog_id: null,
            params: {},
            serv: true
        });
        catalog_right.setActiveItem(2);
    },

    activeNewForm(cpm) {
        cpm.validate();
    },

});
