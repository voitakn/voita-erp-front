Ext.define('Erp.view.worker.edit.PlacesList', {
    extend: 'Erp.base.ToolTip',
    requires: [
        'Ext.dataview.List'
    ],
    xtype: 'places_list',
    session: true,
    width: 300,
    align: 't-b',
    items: [
        {
            xtype: 'list',
            reference: 'list_places_store',
            height: 150,
            itemTpl: '{title}',
            flex: 1,
            grouped: false,
            onItemDisclosure: 'onSelectPoint'
        }
    ]
});