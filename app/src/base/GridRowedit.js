Ext.define('Erp.base.GridRowedit', {
    extend: 'Ext.grid.Grid',
    xtype: 'base_grid_rowedit',
    scrollable: 'y',
    reserveScrollbar: true,
    plugins: {
        rowedit: {
            autoConfirm: false,
            triggerEvent: null,
            buttons: {
                ok: {iconCls: 'fi-check green-dark', text: i18n.gettext('Ок'), handler: 'up.saveAndClose' },
                cancel: {iconCls: 'fi-undo red', text: i18n.gettext('Cancel'), handler: 'editorCancel' },
                revert: false,
                reset: false,
            }
        },
        gridpagingtoolbar: true
    }

});
