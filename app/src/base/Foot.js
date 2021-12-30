Ext.define('Erp.base.Foot', {
    extend: 'Ext.Container',
    //extend: 'Ext.Toolbar',
    xtype: 'footbuttons',
    docked: 'bottom',
    layout: {
        type: 'hbox',
        pack: 'center',
        align: 'middle'
    },
    padding: '10',
    defaults: {
        xtype: 'button',
        margin: '0 7',
    },
});
