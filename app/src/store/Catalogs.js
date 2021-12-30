Ext.define('Erp.store.Catalogs', {
    extend: 'Erp.data.TreeStore',
    alias: 'store.catalog_tree_list',
    requires: [
        'Erp.model.Catalog'
    ],
    model: 'Erp.model.Catalog',
    autoSync: false,
    storeId: 'catalog_tree_list',
    parentIdProperty: 'parent_id',
    root: {
        expanded: true,
        title: i18n.gettext('Catalog'),
        id: null,
    },
    proxy: {
        type: 'erp_api',
        api: {
            read: Api.com.catalog_tree+'---'
        },
        reader: {
            type: 'json',
            typeProperty:  'mtype',
            rootProperty:  'data'
        }
    }
});