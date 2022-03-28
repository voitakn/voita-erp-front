Ext.define('Erp.view.admin.common.GrolesSelect', {
    extend: 'Erp.base.Dialog',
    xtype: 'grolesselect',
    title: i18n.gettext('Select role from the list'),
    width: 1000,
    height: 650,
    layout: 'fit',
    viewModel: {
        data: {
            ids: [],
            btn_text_save: i18n.gettext('Apply'),
            btn_text_cancel: i18n.gettext('Cancel'),
        },
        stores: {
            roles: {
                model: 'Erp.model.admin.Grole',
                autoLoad: true,
                autoSync: true,
                pageSize: 100,
                proxy: {
                    type: 'erp_api',
                    extraParams: {
                        active: true
                    },
                    api: {
                        read: Api.adm.groles_list
                    }
                },
                listeners: {
                    load: 'onRolesLoad'
                }
            }
        }
    },
    controller: {
        onRolesLoad: function(store){
            const me = this;
            let vm = me.getViewModel(),
                ids = vm.get('ids'),
                selectedData = [],
                grid = me.lookup('common_groles_grid');
            const grid_sel = grid.getSelectable();
            if(ids.length > 0) {
                Ext.Array.each(ids, item => {
                    let rec = store.getById(item);
                   //console.(rec);
                    if(rec){
                        selectedData.push(rec);
                    }
                });
                grid_sel.select(selectedData);
            }
        }
    },
    items: [
        {
            xtype: 'grid',
            reference: 'common_groles_grid',
            bind: {
                store: '{roles}',
                selection: '{selectedData}',
            },
            scrollable: 'y',
            reserveScrollbar: true,
            selectable: {
                columns: false,
                cells: false,
                checkbox: true,
                row: true,
                headerCheckbox: false,
                extensible: true,
                mode: 'multi',
            },
            plugins: {
                gridpagingtoolbar: true
            },
            columns: [
                {
                    text: i18n.gettext('Roles name (ID)'),
                    dataIndex: 'urole',
                    flex: 1
                },{
                    text: i18n.gettext('Level'),
                    align: 'center',
                    dataIndex: 'level'
                },{
                    text: i18n.gettext('Description'),
                    dataIndex: 'title',
                    flex: 1
                },{
                    text: i18n.gettext('Request'),
                    dataIndex: 'can_use',
                    align: 'center',
                    tpl: `{can_use:checkIcon}`,
                    cell: {
                        encodeHtml: false
                    },
                },{
                    text: i18n.gettext('Active'),
                    dataIndex: 'active',
                    align: 'center',
                    tpl: `{active:checkIcon}`,
                    cell: {
                        encodeHtml: false
                    },
                }
            ]
        }
    ]
});
