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
            clearable: false,
            placeholder: false,
            label: i18n.gettext('Point of sale')
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
            flex: 1,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'title',
            bind: {
                store: '{places_store}',
                value: '{place_id}',
                required: '{required}',
                clearable: '{clearable}',
                placeholder: '{placeholder}',
                label: '{label}',
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
