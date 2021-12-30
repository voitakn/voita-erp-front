Ext.define('Erp.common.CatalogField', {
    extend: 'Ext.field.Container',
    xtype: 'catalogfield',
    layout: 'hbox',
    errorTarget: 'side',
    viewModel: {
        data: {
            btn_tooltip: null,
            required: false,
            labelText: i18n.gettext('Categories'),
            btnText: i18n.gettext('Edit'),
            label_def_text: ''
        },
        stores: {
            chip_store: {
                extend: 'Erp.data.Store',
                fields: [
                    {name: 'id', type: 'string'},
                    {name: 'title', type: 'string'}
                ],
                data: [],
                proxy: {
                    type: 'memory',
                }
            }
        },
        formulas: {
            catalog_clear: {
                bind: {
                    catalog_id: '{catalog_id}',
                    can_edit: '{can_edit}',
                },
                get(data) {
                   //console.('catalog_clear', data);
                    if(data.catalog_id && data.can_edit) {
                        return false;
                    }
                    return true;
                }
            }
        }
    },
    bind: {
        required: '{required}',
        value: '{catalog_id}',
        label: '{labelText}',
    },
    items: [
        {
            xtype: 'button',
            iconCls: 'x-fa fa-sitemap',
            margin: '0 10 0 0',
            bind: {
                cls: '{btn_cls}',
                tooltip: '{btn_tooltip}',
                disabled: '{!can_edit}',
                text: '{btnText}',
                iconCls: 'x-fa fa-sitemap'
            },
            handler: 'openCatalogs'
        }, {
            xtype: 'label',
            margin: '8 0',
            bind: {
                hidden: '{!catalog_clear}',
                html: '{label_def_text}'
            },
        }, {
            xtype: 'button',
            iconCls: 'x-fa fa-times red',
            margin: '0 10 0 0',
            tooltip: i18n.gettext('Clean selected category'),
            hidden: true,
            handler: 'clearCatalogId',
            bind: {
                hidden: '{catalog_clear}',
                disabled: '{!can_edit}'
            }
        }, {
            xtype: 'chipview',
            displayField: 'title',
            margin: '0 10 0 0',
            flex: 1,
            closable: false,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'middle'
            },
            bind: {
                store: '{chip_store}'
            }
        }, {
            xtype: 'base_tooltip',
            title: i18n.gettext('Select category'),
            align: 'l50-r50',
            items: [
                {
                    xtype: 'panel',
                    layout: 'fit',
                    width: 450,
                    height: 550,
                    items: [
                        {
                            xtype: 'footbuttons',
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-times red',
                                    text: i18n.gettext('Cancel'),
                                    handler: 'onCancelSelect'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-check green-dark',
                                    text: i18n.gettext('Select'),
                                    handler: 'onSelectCatalog'
                                }
                            ]
                        },{
                            xtype: 'tree',
                            rootVisible: false,
                            rowLines: true,
                            bind: {
                                selection: '{catalog_rec}',
                            },
                            columns: [{
                                xtype: 'treecolumn',
                                dataIndex: 'title',
                                text: i18n.gettext('Category name'),
                                tpl: '{title}',
                                flex: 1,
                                sortable: false,
                                menuDisabled: true
                            }],
                            selectable: {
                                columns: false,
                                cells: false,
                                checkbox: true,
                                headerCheckbox: false,
                                extensible: true,
                                mode: 'single',
                            }
                        }
                    ]
                }

            ]
        }
    ],
    onRender: function() {
        this.callParent();
        const tree = this.down('tree');
        tree.setStore(User.catalogStore);
        this.getController().treeSelection();
    },
    controller: {
        alias: 'controller.catalog_field',
        bindings: {
            renderParents: '{catalog_id}',
            treeFilter: '{filter}',
            checkBtnCls: {
                catalog_id: '{catalog_id}',
                required: '{required}',
                can_edit: '{can_edit}'
            }
        },
        checkBtnCls(data) {
            const vm  = this.getViewModel();
            if(data.required) {
                vm.set('btn_tooltip', i18n.gettext('This field is required.'));
                if(data.catalog_id && data.catalog_id.length === 36 ){
                    vm.set('btn_cls', 'blue');
                } else {
                    vm.set('btn_cls', 'red');
                }
                return;
            }
            vm.set('btn_cls', 'blue');
        },
        treeFilter (filter) {
            if(filter === 'prod'){
                User.catalogStore.filter('serv', false);
            }
            if(filter === 'serv'){
                User.catalogStore.filter('serv', true);
            }
        },
        openCatalogs (btn) {
            const catalogs = btn.up('catalogfield').down('base_tooltip');
            catalogs.setTarget(btn);
            catalogs.show();
            this.setStoreFilter();
        },
        setStoreFilter() {
            const view = this.getView();
            const vm  = this.getViewModel();
            const vmFlt = view.filter || vm.get('filter');
           //console.('setStoreFilter', vmFlt);
            if(vmFlt === 'prod'){
                User.catalogStore.filter('serv', false);
            }
            if(vmFlt === 'serv'){
                User.catalogStore.filter('serv', true);
            }
        },
        onSelectCatalog (btn) {
            const vm  = this.getViewModel();
            const parent_field = vm.get('parent_field');
            const parentVm = vm.getParent();
            const rec = vm.get('catalog_rec');
           //console.('onSelectCatalog', rec);
            if(rec && rec.isModel) {
                parentVm.set(parent_field, rec.get('id'));
            } else {
                parentVm.set(parent_field, null);
            }
            this.clearCatalogFilter();
            btn.up('base_tooltip').hide();
        },
        clearCatalogFilter() {
            User.catalogStore.clearFilter();
        },
        onCancelSelect (btn) {
            this.treeSelection();
            this.clearCatalogFilter();
            btn.up('base_tooltip').hide();
        },
        treeSelection () {
            const me = this;
            const vm  = this.getViewModel();
            const catalog_id = vm.get('catalog_id');
            const tree = me.getView().down('tree');
            const store = tree.getStore();
           //console.('treeSelection', catalog_id, store, vm.get('catalog_rec'));
            if(catalog_id){
                const node = store.getNodeById(catalog_id);
                if(node) {
                    tree.getSelectable().select(node);
                    return;
                }
            }
           //console.('tree.getSelectable().deselectAll()');
            tree.getSelectable().deselectAll();

        },

        renderParents(catalog_id) {
            const me = this;
            const view = me.getView();
            const tree = view.down('tree');
            const store = tree.getStore();
            let node = null;
            if(catalog_id) {
                node = store.getNodeById(catalog_id);
            }
            view.setValue(catalog_id);
            me.createBread(node, true);
            me.treeSelection();
        },
        /**
         * метод создания хлебных крошек выбранного каталога обработка всей глубины через рекурсию
         * @param node
         */
        createBread(node, start){
            const me = this;
            const vm = me.getViewModel();
            const chip_store = vm.getStore('chip_store');
            if(start === true) {
                chip_store.removeAll();
            }
            if(node && node.isModel){
                if(node.get('id') !== 'root') {
                    chip_store.insert(0, {
                        id: node.get('id'),
                        title: node.get('title'),
                    });
                    if(node.parentNode) {
                        me.createBread(node.parentNode);
                    }
                }
            }
        },
        clearCatalogId(btn) {
            const vm  = this.getViewModel();
            const parent_field = vm.get('parent_field');
            const parentVm = vm.getParent();
            parentVm.set(parent_field, null);
        },
        clearSelection(btn) {
            const me = this;
            const view = me.getView();
            const tree = view.down('tree');
            tree.deselectAll();
        }
    }
})
