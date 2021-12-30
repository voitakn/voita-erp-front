Ext.define('Erp.view.movement.add.AddTreeCatalog', {
    extend: 'Ext.grid.Tree',
    xtype: 'movement_add_catalog_tree',
    reference: 'movement_add_catalog_tree',
    rootVisible: false,
    rowLines: true,
    scrollable: 'y',
    bind: {
        selection: '{catalog_selection}',
    },
    onRender() {
        this.callParent();
        this.setStore(User.catalogStore);
    },
    selectable: {
        columns: false,
        cells: false,
        extensible: true,
        mode: 'single',
    },
    columns: [{
        xtype: 'treecolumn',
        text: i18n.gettext('Catalog'),
        dataIndex: 'title',
        tpl: '{title}',
        flex: 1,
        sortable: false,
        menuDisabled: true,
    }]
});
