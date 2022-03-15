Ext.define('Erp.view.produce.edit.MarketHtml', {
    extend: 'Erp.base.ToolTip',
    xtype: 'market_edit_html',
    reference: 'market_edit_html',
    title: i18n.gettext('Edit market html'),
    //align: 't50-b50',
    autoSize: true,
    session: true,
    listeners: {
        onCancel: 'onCancelEditHtml'
    },
    items: [
        {
            xtype: 'formpanel',
            width: 500,
            buttonAlign: 'center',
            buttons: [
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-times red',
                    margin: '0 10',
                    text: i18n.gettext('Cancel'),
                    handler: 'onCancelEditHtml'
                }, {
                    xtype: 'button',
                    ui: 'alt confirm',
                    iconCls: 'fi-save',
                    margin: '0 10',
                    text: i18n.gettext('Save'),
                    handler: 'onSaveHtmlProd'
                }
            ],
            items: [
                {
                    xtype: 'textfield',
                    required: true,
                    label: i18n.gettext('Title'),
                    bind: {
                        value: '{theCard.params.html.title}',
                    },
                },
                {
                    xtype: 'textfield',
                    required: true,
                    label: i18n.gettext('H1'),
                    bind: {
                        value: '{theCard.params.html.h1}',
                    },
                },

                {
                    xtype: 'textareafield',
                    label: i18n.gettext('Description'),
                    maxRows: 5,
                    clearable: true,
                    bind: {
                        value: '{theCard.params.html.desc}',
                    },
                },
                {
                    xtype: 'textareafield',
                    label: i18n.gettext('Keywords'),
                    maxRows: 5,
                    clearable: true,
                    bind: {
                        value: '{theCard.params.html.key}',
                    },
                },
            ]
        }
    ],
});
