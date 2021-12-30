Ext.define('Erp.view.place.edit.CheckoutRow', {
    extend: 'Ext.dataview.ListItem',
    xtype: 'checkoutNewText',
    autoDestroy: true,
    layout: {type: 'hbox', align: 'center'},
    items: [{
        xtype: 'container',
        flex: 1,
        items: [
            {
                xtype: 'textfield',
                required: true,
                labelAlign: 'left',
                label: i18n.gettext('Name'),
                reference: 'placeCheckoutText',
                flex: 1,
                listeners: {
                    change(fld, newValue, oldValue) {
                        fld.up('checkoutNewText').getRecord().set('name', newValue);
                    }
                }
            }
        ]
    },{
        xtype: 'button',
        margin: '0 0 0 10',
        ui: 'alt decline',
        iconCls: 'x-fa fa-times',
        tooltip: i18n.gettext('Delete'),
        handler: 'delCashRegister'
    }],
    dataMap: {
        placeCheckoutText: {
            value: 'name'
        }
    },
    listeners: {
        added(cmp){
            cmp.down('textfield').focus()
        }
    }
});