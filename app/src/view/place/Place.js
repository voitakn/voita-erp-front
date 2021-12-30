Ext.define('Erp.view.place.Place', {
    extend: 'Erp.base.Module',
    xtype: 'places',
    autoSize: true,
    session: true,
    reference: 'places',
    requires: [
        'Erp.view.place.PlaceCtrl',
        'Erp.view.place.PlaceModel',
        'Erp.view.place.Grid',
        'Erp.view.place.edit.NewPoint',
        'Erp.view.common.MenuCompany',
    ],
    controller: 'places_ctrl',
    viewModel: {
        type: 'places_vm'
    },
    scrollable: 'y',
    listeners: {
        activate: 'afterViewShow'
    },
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
            },
            items: [
                {
                    xtype: 'company_menu',
                },{
                    xtype: 'place_grid',
                    width: 650,
                },{
                    xtype: 'point_create'
                }
            ]
        }
    ]
});
