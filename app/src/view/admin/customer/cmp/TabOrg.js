Ext.define('Erp.view.admin.customer.cmp.TabOrg', {
    extend: 'Ext.Panel',
    xtype: 'admin_customer_taborg',
    bodyPadding: 20,
    autoSize: true,
    scrollable: 'y',
    defaults: {
        xtype: 'fieldset',
        margin: '0 0 20 0',
        padding: 0,
        defaults: {
            xtype: 'displayfield',
            labelAlign: 'left',
            labelWidth: 120,
        }
    },
    bbar: {
        xtype: 'toolbar',
        docked: 'bottom',
        margin: '0 0 0 0',
        items: [{
            xtype: 'button',
            margin: '0 0 0 10',
            text: i18n.gettext('Back'),
            iconCls: 'x-fa fa-arrow-left',
            handler: 'onCancelCard',
        }]
    },
    tbar: {
        xtype: 'toolbar',
        docked: 'bottom',
        margin: '0 0 0 0',
        items: [{
            xtype: 'button',
            margin: '0 0 0 10',
            text: i18n.gettext('Back'),
            iconCls: 'x-fa fa-arrow-left',
            handler: 'onCancelCard',
        }]
    },
    items: [
        {
            title: i18n.gettext('Main information'),
            items: [
                {
                    label: i18n.gettext('Title'),
                    bind: {
                        value: '{theCard.title}'
                    },
                },{
                    label: i18n.gettext('Creation date'),
                    bind: {
                        value: '{theCard.date_create:date("Y-m-d H:i")}',
                    }
                },{

                    label: i18n.gettext('Country'),
                    bind: {
                        value: '{theCard.country_en} ({theCard.country_orig})'
                    },
                },{
                    label: i18n.gettext('Phone'),
                    bind: {
                        value: '{theCard.phone}'
                    }
                },{
                    label: i18n.gettext('Currency'),
                    bind: {
                        value: '{theCard.currency}'
                    }
                },{
                    xtype: 'groupcontainer',
                    label: i18n.gettext('Taxes'),
                    items: [
                        {
                            xtype: 'chipview',
                            bind: {
                                data: '{theCard.params.iva}',
                            },
                            displayField: 'name',
                            closable: false
                        }
                    ]
                },{
                    label: i18n.gettext('Local'),
                    bind: {
                        value: '{theCard.lng}'
                    }
                },{
                    bind: {
                        value: '{theCard.params.tax_number.value}',
                        label: '{theCard.params.tax_number.name}',
                    }
                }

            ]
        },{
            title: i18n.gettext('Administrator data'),
            items: [
                {
                    label: i18n.gettext('Name'),
                    bind: {
                        value: '{theCard.admin.params.name}'
                    },
                }, {
                    label: i18n.gettext('Last name'),
                    bind: {
                        value: '{theCard.admin.params.surname}'
                    },
                },{
                    label: i18n.gettext('E-mail'),
                    bind: {
                        value: '{theCard.admin.login}'
                    },
                },{
                    label: i18n.gettext('Phone'),
                    bind: {
                        value: '{theCard.admin.params.phone}'
                    },
                }
            ]
        },
        /*{
            xtype: 'toolbar',
            docked: 'bottom',
            margin: '0 0 0 0',
            items: [{
                xtype: 'button',
                text: i18n.gettext('Exit'),
                iconCls: 'fi-undo red',
                cls: 'red',
                handler: 'onCancelCard',
            }]
        }*/
    ]
});
