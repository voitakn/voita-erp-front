//PlaceInvent
Ext.define('Erp.common.PlaceInvent', {
    extend: 'Ext.grid.Grid',
    xtype: 'placeinvent',
    store: {
        fields: [
            {name: 'id', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'params', type: 'auto'},
            {name: 'invent', type: 'number', defaultValue: 0},
        ],
        data: [],
        proxy: {
            type: 'memory'
        }
    },
    plugins: {
        cellediting: {
            selectOnEdit: false
        }
    },
    selectable: {
        rows: false,
        cells: true
    },
    afterRender: function(){
        const store = this.getStore();
        store.loadData(User.places());
    },
    resetDataStore(){
        const store = this.getStore();
        store.rejectChanges();
    },
    listeners: {
        hide: function(cmp){
            cmp.resetDataStore();
        }
    },
    columns: [
        {
            text: i18n.gettext('Balance'),
            width: 120,
            dataIndex: 'invent',
            editable: true,
            menu: false,
            sortable: false,
            editor: {
                xtype: 'numberfield',
            },
            cell: {
                tools: {
                    edit: {
                        cls: 'blue',
                        tooltip: i18n.gettext('Edit quantity'),
                        zone: 'end',
                        handler(grid, row){
                            grid.getPlugin('cellediting').startEdit(row.record, 0);
                        },
                    }
                }
            }
        },{
            text: i18n.gettext('Store availability'),
            flex: 1,
            tpl: `<div class="flexes"><span class="flex-3">{title}</span> <span class="flex-1">{params.phone}</span></div>`,
            editable: false,
            menu: false,
            sortable: false,
            cell: {
                encodeHtml: false,
            }
        }
    ]
});
