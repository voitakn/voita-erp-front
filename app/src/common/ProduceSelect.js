Ext.define('Erp.common.ProduceSelect', {
    extend: 'Ext.grid.Grid',
    xtype: 'common_produce_select',
    autoSize: true,
    plugins: {
        gridpagingtoolbar: true
    },
    bind: {
        store: '{select_produce_store}',
    },
    items: [
        {
            xtype: 'head2',
            items: [{
                xtype: 'label',
                cls: 'title',
                html: i18n.gettext('Products and services')
            },{
                xtype: 'searchfield',
                margin: '0 0 0 20',
                flex: 1,
                placeholder: i18n.gettext('By name and barcode (at least 3 characters )'),
                bind: {
                    value: '{filter.search}'
                }
            }]
        }, {
            xtype: 'catalogfield',
            margin: '7 0 7 0',
            docked: 'top',
            flex: 1,
            minWidth: 300,
            viewModel: {
                data: {
                    parent_field: 'filter.catalog_id',
                    labelText: false,
                    btnText: i18n.gettext('Filter by catalog')
                },
                links: {
                    catalog_id: '{filter.catalog_id}',
                    can_edit: true,
                }
            }
        }
    ],
    columns: [
        {
            flex: 1,
            minWidth: 200,
            text: i18n.gettext('Title'),
            tpl: `<b>{title}</b>`,
            cell: {
                encodeHtml: false,
                tools: {
                    plus: {
                        iconCls: 'x-fas fa-arrow-circle-left green size-24',
                        margin: '0 15 0 0',
                        tooltip: i18n.gettext('Select'),
                        handler: 'onAddProduce',
                        zone: 'start',
                    },
                }
            }
        },{
            text: i18n.gettext('Price'),
            width: 100,
            tpl: `<b>{params.price.value}</b> {[User.symbol()]}`,
            cell: {
                align: 'right',
                encodeHtml: false,
            }
        },{
            text: i18n.gettext('Barcode'),
            width: 100,
            dataIndex: 'barcode',
            cell: {
                align: 'right',
                encodeHtml: false,
            }
        },{
            text: i18n.gettext('Description'),
            flex: 1,
            tpl: `{params.description}`,
            cell: {
                encodeHtml: false,
            }
        },
    ],
    viewModel: {
        data: {
            filter: {
                catalog_id: null,
                search: null
            }
        },
        stores: {
            select_produce_store: {
                extend: 'Erp.data.Store',
                model: 'Erp.model.ProduceList',
                autoLoad: true,
                autoSync: false,
                pageSize: 50,
                proxy: {
                    type: 'erp_api',
                    api: {
                        read: Api.items.produce_list
                    },
                    extraParams: {
                        catalog_id: '{filter.catalog_id}',
                        search: '{filter.search}',
                    }
                }
            },
        }
    },
    controller: {
        bindings: {
            doSearch: '{filter.search}',
            reloadProd: '{filter.catalog_id}'
        },
        reloadProd(catalog_id) {
            if(this.all_rendered) {
                this.getViewModel().getStore('select_produce_store').load();
            } else {
                this.all_rendered = true;
            }
        },
        doSearch(search) {
            if(!search || search.length === 0 || search.length > 2){
                this.reloadProd();
            }
        },
        onAddProduce: function(grid, row) {
            grid.getSelectable().select(row.record);
            grid.fireEvent('prodSelected', row.record, row.event.target, grid);
        },
    }
});
