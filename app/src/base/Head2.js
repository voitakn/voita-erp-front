Ext.define('Erp.base.Head2', {
    extend: 'Ext.Container',
    xtype: 'head2',
    cls: 'head-2',
    docked: 'top',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'center'
    },
    padding: '0 0 10 0',
    defaults: {
        xtype: 'button',
        margin: '0 10 0 0',
    },
});
