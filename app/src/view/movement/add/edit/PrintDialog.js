Ext.define('Erp.view.movement.add.edit.PrintDialog', {
    extend: 'Erp.base.Dialog',
    xtype: 'print_dialog',
    reference: 'print_dialog',
    width: 550,
    title: i18n.gettext('Print Documents'),
    items: [
        {
            xtype: 'container',
            cls: 'green-dark size-16',
            bind: {
                html: 'Invoice {result_data.doc_number} successfully created!'
            }
        }
    ],
    buttonAlign: 'center',
    buttons: [
        {
            xtype: 'button',
            margin: '0 10 20 10',
            iconCls: 'x-fa fa-arrow-left',
            text: i18n.gettext('Exit'),
            handler: 'resetPlaces'
        },
        {
            xtype: 'button',
            margin: '0 10 20 10',
            text: i18n.gettext('Print Stickers'),
            handler: 'printStickers'
        },
        {
            xtype: 'button',
            margin: '0 10 20 10',
            text: i18n.gettext('Print Invoice'),
            handler: 'printReceipt'
        },
    ]
});
