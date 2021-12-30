Ext.define('Erp.view.company.LogoView', {
    extend: 'Ext.Container',
    xtype: 'company_logo',
    reference: 'company_logo',
    requires: [
        'Ext.draw.Container'
    ],
    width: 200,
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'container',
            height: 200,
            width: 200,
            style: 'border-radius:50%;border: 1px solid #5ba1ca;margin-left: auto; margin-right: auto;',
            layout: 'center',
            margin: '20',
            items: [
                {
                    xtype: 'container',
                    reference: 'company_logo_view',
                }
            ]
        },{
            xtype: 'button',
            text: i18n.gettext('Edit Logo'),
            iconCls: 'fi-pencil blue',
            handler: 'onEditLogo',
            style: 'margin-left: auto; margin-right: auto;',
            hidden: true,
            bind: {
                hidden: '{no_com_customer_save}'
            }
        },{
            xtype: 'logo_edit'
        }
    ]
});