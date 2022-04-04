Ext.define('Erp.common.PlaceBox', {
    extend: 'Ext.field.Container',
    xtype: 'placebox',
    requires: [
        'Erp.store.Places',
    ],

    viewModel: {
        data: {

        },
        stores: {
            places_store: {
                type: 'placesStore',
                listeners: {
                    load: 'onStoreLoad'
                }
            }
        },
    },
    items: [
        {
            xtype: 'combobox',
            autoSelect: true,
            forceSelect: true,
            editable: false,
            queryMode: 'local',
            width: 200,
            label: i18n.gettext('Point of sale'),
            valueField: 'id',
            displayField: 'title',
            // store: 'places_store',
            bind: {
                store: 'places_store',
                value: '{local_place_id}'
            }
        },
    ],
    controller: {
        alias: 'controller.place_box',
        bindings: {
            onFilterPlace: '{local_place_id}'
        },
        onFilterPlace(local_place_id) {
            console.log('onFilterPlace component', local_place_id);
            // const parent = this.getView().getViewModel().getParent();
            // const parent_vm = parent.getView().getViewModel();
            // parent_vm.set('filter_local_place_id', local_place_id);
        },
        onStoreLoad(store, data) {
            console.log('onStoreLoad');
            const me = this;
            const vm = me.getViewModel();
            const placefield = me.getView();
            const place_row = store.getAt(0);
            const local_place_id = store.getAt(0).getId();
            const combobox = placefield.down('combobox');
            combobox.setSelection(place_row);
            // console.log('placefield', placefield);
            // console.log('local_place_id', local_place_id);
            // vm.set('local_place_id', local_place_id);
            placefield.fireEvent('onLoaded', placefield, store, local_place_id);
        },
    }
});
