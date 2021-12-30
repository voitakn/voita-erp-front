Ext.define('Erp.base.Head3', {
    extend: 'Ext.Container',
    xtype: 'head3',
    cls: 'head-3',
    docked: 'top',
    padding: '0 0 10 0',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    defaults: {
        xtype: 'button',
        margin: '0 10 0 0',
    },
});
