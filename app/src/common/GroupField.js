Ext.define('Erp.common.WgroupField', {
    extend: 'Ext.field.Container',
    xtype: 'wgroupfield',
    layout: 'hbox',
    requires: [
        'Erp.store.WorkersGroups'
    ],
    config: {
        selectGroups: []
    },
    viewModel: {
        data: {
            labelText: i18n.gettext('Users groups'),
            titleT: i18n.gettext('Groups'),
            btnText: i18n.gettext('Edit groups'),
            closableT: true
        },
        stores: {
            groups_store: {
                type: 'workersGroupStore'
            }
        },
    },
    items: [
        {
            xtype: 'button',
            iconCls: 'x-fas fa-user-friends',
            bind: {
                ui: '{btn_type_ui}',
                tooltip: '{btn_tooltip}',
                disabled: '{!can_edit}',
                text: '{btnText}',
            },
            handler: 'openItemsGrid'
        }, {
            xtype: 'base_tooltip',
            align: 't50-b50',
            bind: {
                closable: '{closableT}',
                title: '{titleT}'
            },
            items: [
                {
                    xtype: 'grid',
                    width: 400,
                    height: 500,
                    scrollable: 'y',
                    reserveScrollbar: true,
                    bind: {
                        store: '{groups_store}'
                    },
                    items: [
                        {
                            xtype: 'toolbar',
                            docked: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-times red',
                                    text: i18n.gettext('Cancel'),
                                    handler: 'onCancelSelect'
                                }, '->', {
                                    xtype: 'button',
                                    iconCls: 'fi-save green-dark',
                                    text: i18n.gettext('Save'),
                                    handler: 'onSaveSelected'
                                }
                            ]
                        }
                    ],
                    selectable: {
                        columns: false,
                        cells: false,
                        checkbox: true,
                        headerCheckbox: false,
                        extensible: true,
                        mode: 'multi',
                    },
                    columns: [
                        {
                            text: i18n.gettext('Groups titles'),
                            flex: 1,
                            tpl: `<b>{title}</b>`,
                            cell: {
                                encodeHtml: false
                            }
                        }
                    ]
                }
            ]
        }
    ],
    setSelectPlaces(data) {
        this.selectGroups = data;
    },
    getSelectPlaces() {
        return this.selectGroups;
    },
    controller: {
        alias: 'controller.worker_groups_field',
        onCancelSelect (btn) {
            const tooltip = btn.up('base_tooltip');
            const grid = tooltip.down('grid');
            grid.deselectAll();
            tooltip.hide();
        },
        openItemsGrid(btn) {
            const fieldF = btn.up('wgroupfield');
            const tooltip = fieldF.down('base_tooltip');
            const grid = tooltip.down('grid');
            const store = grid.getStore();
            const grid_sel = grid.getSelectable();
            const rows = fieldF.getSelectPlaces();
            const selectedData = [];
            Ext.Array.each(rows, item => {
                let rec = store.getById(item.id);
                if(rec){
                    selectedData.push(rec);
                }
            });
            grid_sel.select(selectedData);
            tooltip.setTarget(btn);
            tooltip.show();
        },
        onSaveSelected(btn) {
            const fieldF = btn.up('wgroupfield');
            const tooltip = btn.up('base_tooltip');
            const grid = tooltip.down('grid');
            const records = grid.getSelectable().getSelectedRecords();
            fieldF.fireEvent('onSave', fieldF, records, tooltip);
        }
    }
});
