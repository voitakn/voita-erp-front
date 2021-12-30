Ext.define('Erp.view.catalog.Tree', {
    extend: 'Ext.grid.Tree',
    xtype: 'catalog_tree_edit',
    reference: 'catalog_tree_edit',
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
        checkbox: true,
        headerCheckbox: false,
        extensible: true,
        mode: 'single',
    },
    items: [
        {
            xtype: 'head1',
            items: [
                {
                    xtype: 'label',
                    cls: 'title',
                    //html: i18n.gettext('Catalog management')
                    html: i18n.gettext('Products and services')
                },{
                    xtype:'spacer'
                },{
                    xtype: 'button',
                    tooltip: i18n.gettext('Close all sections'),
                    iconCls: 'x-fa fa-arrow-up blue',
                    handler: 'collapseCatalog',
                },{
                    xtype: 'button',
                    tooltip: i18n.gettext('Open all sections'),
                    iconCls: 'x-fa fa-arrow-down blue',
                    handler: 'expandCatalog',
                }
            ]
        }
    ],
    columns: [{
        xtype: 'treecolumn',
        text: i18n.gettext('Category'),
        dataIndex: 'title',
        tpl: '{title}',
        flex: 1,
        sortable: false,
        menuDisabled: true,
    },{
        width: 70,
        menu: false,
        cell: {
            tools: {
                edit: {
                    cls: 'blue',
                    tooltip: i18n.gettext('Edit section'),
                    hidden: true,
                    zone: 'end',
                    handler: 'editItemCatalog',
                    bind: {
                        hidden: '{no_com_catalog_tree_save}'
                    }
                },
                plus: {
                    cls: 'green-dark',
                    tooltip: i18n.gettext('Add child section'),
                    handler: 'addNewCatalog',
                    hidden: true,
                    zone: 'end',
                    bind: {
                        hidden: '{no_com_catalog_tree_save}'
                    }
                }
            }
        }
    }]
});
