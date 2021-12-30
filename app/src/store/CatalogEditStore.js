Ext.define('Erp.store.CatalogEditStore', {
    extend: 'Erp.data.TreeStore',
    alias: 'store.catalog_edit_store',
    requires: [
        'Erp.model.CatalogEdit'
    ],
    model: 'Erp.model.CatalogEdit',
    storeId: 'catalog_edit_store',
    autoSync: false,
    parentIdProperty: 'parent_id',
    root: {
        expanded: true,
        title: i18n.gettext('Catalog'),
        id: null,
    },
    /*proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            typeProperty:  'mtype'
        },
        url: '/local/categories'
    }*/
});