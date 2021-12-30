Ext.define('Erp.base.Head1', {
    extend: 'Ext.Container',
    xtype: 'head1',
    cls: 'head-1 border-bottom',
    docked: 'top',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    padding: '0 0 5 0',
    defaults: {
        xtype: 'button',
        margin: '0 10 0 0',
    },
});
