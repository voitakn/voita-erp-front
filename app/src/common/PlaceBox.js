Ext.define('Erp.common.PlaceBox', {
    extend: 'Ext.field.Container',
    xtype: 'placebox',
    requires: [
        'Erp.store.Places',
    ],
    viewModel: {
        data: {
            autoSelect: false,
            required: false,
            clearable: false
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
            forceSelection: true,
            editable: false,
            width: 240,
            label: i18n.gettext('Point of sale'),
            valueField: 'id',
            displayField: 'title',
            bind: {
                store: '{places_store}',
                value: '{local_place_id}',
                required: '{required}',
                clearable: '{clearable}',
            }
        },
    ],
    controller: {
        alias: 'controller.place_box',
        bindings: {
            onFilterPlace: '{local_place_id}'
        },
        onFilterPlace(local_place_id) {
            const me = this;
            const vm = me.getViewModel();
            const parent = vm.getParent();
            parent.set(vm.get('parent_field'), local_place_id);
        },
        onStoreLoad(store, data) {
            const me = this;
            const vm = me.getViewModel();
            if(!!vm.get('autoSelect')) {
                me.getView().down('combobox').setSelection(store.getAt(0));
            }
        }
    }
});
