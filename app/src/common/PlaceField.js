Ext.define('Erp.common.PlaceField', {
    extend: 'Ext.field.Container',
    xtype: 'placefield',
    layout: 'hbox',
    requires: [
        'Erp.store.Places'
    ],
    config: {
        selectPlaces: []
    },
    viewModel: {
        data: {
            labelText: i18n.gettext('Points of retail sale'),
            titleT: i18n.gettext('Points of retail sale'),
            btnText: i18n.gettext('Select point of retail sale'),
            closableT: true
        },
        stores: {
            places_store: {
                type: 'placesStore'
            }
        },
    },
    items: [
        {
            xtype: 'button',
            iconCls: 'x-fa fa-map-marker',
            bind: {
                ui: '{btn_type_ui}',
                tooltip: '{btn_tooltip}',
                disabled: '{!can_edit}',
                text: '{btnText}',
            },
            handler: 'openPlaceGrid'
        }, {
            xtype: 'base_tooltip',
            reference: 'places_select_tooltip',
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
                        store: '{places_store}'
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
                            text: i18n.gettext('Select places of retail sale'),
                            flex: 1,
                            tpl: `<b>{title}</b><div>{[i18n.gettext('Contacts')]}:  {params.address} {params.phone} </div>`,
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
        this.selectPlaces = data;
    },
    getSelectPlaces() {
        return this.selectPlaces;
    },
    controller: {
        alias: 'controller.place_field',
        onCancelSelect (btn) {
            const tooltip = btn.up('base_tooltip');
            const grid = tooltip.down('grid');
            grid.deselectAll();
            tooltip.hide();
        },
        openPlaceGrid(btn) {
            const placeF = btn.up('placefield');
            const placeT = placeF.down('base_tooltip');
            const grid = placeT.down('grid');
            const store = grid.getStore();
            const grid_sel = grid.getSelectable();
            const rows = placeF.getSelectPlaces();
            const selectedData = [];
            Ext.Array.each(rows, item => {
                let rec = store.getById(item.id);
                if(rec){
                    selectedData.push(rec);
                }
            });
            grid_sel.select(selectedData);
            placeT.setTarget(btn);
            placeT.show();
        },
        onSaveSelected(btn) {
            const placefield = btn.up('placefield');
            const tooltip = btn.up('base_tooltip');
            const grid = tooltip.down('grid');
            const records = grid.getSelectable().getSelectedRecords();
            placefield.fireEvent('onSave', placefield, records, tooltip);
        }
    }
});
