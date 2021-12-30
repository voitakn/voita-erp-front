Ext.define('Erp.view.sell.pos.PosTreeCatalog', {
    extend: 'Ext.grid.Tree',
    xtype: 'pos_catalog_tree',
    reference: 'pos_catalog_tree',
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
    items: [
        {
            xtype: 'toolbar',
            docked: 'bottom',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    text: i18n.gettext('Deselect all'),
                    handler: 'deselectCategory'
                }
            ]
        }
    ],
    columns: [{
        xtype: 'treecolumn',
        text: i18n.gettext('Categories'),
        dataIndex: 'title',
        tpl: '{title}',
        flex: 1,
        sortable: false,
        menuDisabled: true,
    }]
});
