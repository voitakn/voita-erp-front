Ext.define('Erp.base.ToolTip', {
    extend: 'Ext.tip.ToolTip',
    xtype: 'base_tooltip',
    align: 'tr',
    closable: true,
    maxWidth: 700,
    autoDestroy: false,
    autoHide: false,
    anchor: true,
    padding: '5 20',
    listeners: {
        hide: function (tt) {
            tt.setTarget(null);
            tt.fireEvent('onCancel', tt);
        }
    }
});
