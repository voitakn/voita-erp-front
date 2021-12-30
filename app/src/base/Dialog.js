Ext.define('Erp.base.Dialog', {
    extend: 'Ext.Dialog',
    xtype: 'base_dialog',
    width: 800,
    maxHeight: 600,
    bodyPadding: '0 20 20 20',
    closeAction: 'hide',
    session: true,
    closable: false,
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [],
    buttonAlign: 'center',
    buttons: [ {
        text: i18n.gettext('Back'),
        iconCls: 'x-fa fa-arrow-left',
        bind: {
            text: '{btn_text_cancel}'
        },
        handler(btn) {
            let win = btn.up('dialog');
            win.fireEvent('onCancel', win);
            win.hide();
        }
    }, {
        text: i18n.gettext('Save'),
        margin: '0 0 0 10',
        iconCls: 'fi-save',
        cls: 'green-dark',
        handler(btn) {
            let win = btn.up('dialog');
            win.fireEvent('onSave', win);
        },
        bind: {
            text: '{btn_text_save}'
        }
    }]
});
