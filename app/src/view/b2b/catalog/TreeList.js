Ext.define('Erp.view.b2b.catalog.TreeList', {
    extend: 'Ext.list.Tree',
    xtype: 'b2b_catalog_treelist',
    reference: 'b2b_catalog_treelist',
    ui: 'nav',
    scrollable: 'y',
    expanderFirst: false,
    expanderOnly: true,
    cls: 'no-icon',
    bind: {
        store: '{b2bTreeCatalog}',
        selection: '{catalogSelected}',
    },
});
