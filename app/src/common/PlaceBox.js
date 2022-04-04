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
            queryMode: 'local',
            label: i18n.gettext('Point of sale'),
            valueField: 'id',
            displayField: 'title',
            bind: {
                store: '{places_store}',
                value: '{place_id}',
                required: '{required}',
                clearable: '{clearable}',
            }
        },
    ],
    controller: {
        alias: 'controller.place_box',
        bindings: {
            onSelectPlace: '{place_id}'
        },
        onSelectPlace(place_id) {
            const me = this;
            const vm = me.getViewModel();
            const parent = vm.getParent();
            if(!!vm.get('parent_field')) {
                parent.set(vm.get('parent_field'), place_id);
            }
        },
        onStoreLoad(store) {
            const me = this;
            const vm = me.getViewModel();
            if(!!vm.get('autoSelect')) {
                me.getView().down('combobox').setSelection(store.getAt(0));
            }
        }
    }
});
