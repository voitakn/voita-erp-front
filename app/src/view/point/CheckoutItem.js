Ext.define('Erp.view.point.CheckoutItem', {
    extend: 'Ext.dataview.ListItem',
    xtype: 'checkoutitem',
    autoDestroy: true,
    layout: {type: 'hbox', align: 'center'},
    items: [{
        xtype: 'container',
        cls: 'size-14',
        reference: 'pointCheckoutName',
        flex: 1,
    }, {
        xtype: 'button',
        margin: '0 0 0 10',
        ui: 'alt action',
        iconCls: 'fi-pencil',
        tooltip: i18n.gettext('Edit'),
        handler: 'editCheckout',
        hidden: true,
        bind: {
            hidden: '{no_com_place_save}'
        }
    }, {
        xtype: 'button',
        margin: '0 0 0 10',
        ui: 'alt decline',
        iconCls: 'x-fa fa-times',
        tooltip: i18n.gettext('Delete'),
        handler: 'deleteCheckout',
        hidden: true,
        bind: {
            hidden: '{no_com_place_save}'
        }
    }],
    dataMap: {
        pointCheckoutName: {
            html: 'name'
        }
    }
});