Ext.define('Erp.common.CatalogChip', {
    extend: 'Ext.field.Container',
    xtype: 'catalogchip',
    layout: 'hbox',
    viewModel: {
        data: {},
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
        }
    },
    bind: {
        value: '{catalog_id}',
    },
    items: [
        {
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
        },{
            xtype: 'hiddenfield',
            bind: {
                value: '{catalog_id}'
            }
        }
    ],
    controller: {
        alias: 'controller.catalog_chip',
        bindings: {
            renderParents: '{catalog_id}'
        },
        renderParents(catalog_id) {
            const me = this;
            const view = me.getView();
            let node = null;
            view.setValue(catalog_id);
            if(catalog_id) {
                node = User.catalogStore.getNodeById(catalog_id);
                if(node) {
                    me.renderChips(node, true);
                    return;
                }
            }
            me.clearChips();
        },
        renderChips(node, start){
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
                        me.renderChips(node.parentNode);
                    }
                }
            }
        },
        clearChips() {
            const me = this;
            const vm = me.getViewModel();
            const chip_store = vm.getStore('chip_store');
            chip_store.loadData([]);
        }
    }
})
