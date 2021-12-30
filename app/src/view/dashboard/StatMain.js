Ext.define('Erp.view.dashboard.StatMain', {
    extend: 'Ext.Container',
    xtype: 'dashboard_statmain',
    items: [
        {
            xtype: 'container',
            margin: '10 0 0 0',
            scrollable: 'x',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                xtype: 'container',
                bodyCls: 'shadow-sm bg-white border border-1 rounded margin-sh',
                padding: '10 15',
                flex: 1,
                minWidth: 250,
                hidden: true,
                bind: {hidden: '{no_desk_main_stat}'},
                defaults: {
                    xtype: 'container',
                    cls: 'size-14',
                    margin: '5 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        xtype: 'label',
                    }
                }
            },
            items: [
                {
                    hidden: false,
                    bind: {
                        flex: '{no_desk_main_stat}',
                        hidden: false
                    },
                    items: [
                        {
                            bodyCls: 'size-15 bolder',
                            html: i18n.gettext('Company information'),
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Title'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right',
                                    bind: {html: '{company.title}'}
                                }
                            ]
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Address'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right',
                                    bind: {html: '{company.address}'}
                                }
                            ]
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Location'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right',
                                    bind: {html: '{company.postcode} {company.city} {company.country_en}'}
                                }
                            ]
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Phone'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right',
                                    bind: {html: '{company.phone}'}
                                }
                            ]
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Email'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right',
                                    bind: {html: '{company.email}'}
                                }
                            ]
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Number of POS'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder',
                                    bind: {html: '{company.pos_number}'}
                                }
                            ]
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Number of users'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder',
                                    bind: {html: '{company.user_number}'}
                                }
                            ]
                        }
                    ]
                },
                {

                    items: [
                        {
                            xtype: 'container',
                            cls: 'size-15 bolder',
                            html: i18n.gettext('Today'),
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Sales amount'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder green-dark',
                                    bind: {html: '{mainData.today.selling:erpMoney}'}
                                }
                            ]
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Number of sales'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder green-dark',
                                    bind: {html: '{mainData.today.sell_number}'}
                                }
                            ]
                        },{
                            cls: 'border-top',
                            margin: '10 0',
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Purchases amount'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder blue',
                                    bind: {html: '{mainData.today.purchase:erpMoney}'}
                                }
                            ]
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Number of purchases'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder blue',
                                    bind: {html: '{mainData.today.buy_number}'}
                                }
                            ]
                        },{
                            cls: 'border-top',
                            margin: '10 0',
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Expenses amount'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder red',
                                    bind: {html: '{mainData.today.expense:erpMoney}'}
                                }
                            ]
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Number of expenses'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder red',
                                    bind: {html: '{mainData.today.exp_number}'}
                                }
                            ]
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'container',
                            cls: 'size-15 bolder',
                            html: i18n.gettext('This month'),
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Sales amount'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder green-dark',
                                    bind: {html: '{mainData.period.selling:erpMoney}'}
                                }
                            ]
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Number of sales'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder green-dark',
                                    bind: {html: '{mainData.period.sell_number}'}
                                }
                            ]
                        },{
                            cls: 'border-top',
                            margin: '10 0',
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Purchases amount'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder blue',
                                    bind: {html: '{mainData.period.purchase:erpMoney}'}
                                }
                            ]
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Number of purchases'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder blue',
                                    bind: {html: '{mainData.period.buy_number}'}
                                }
                            ]
                        },{
                            cls: 'border-top',
                            margin: '10 0',
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Expenses amount'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder red',
                                    bind: {html: '{mainData.period.expense:erpMoney}'}
                                }
                            ]
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Number of expenses'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder red',
                                    bind: {html: '{mainData.period.exp_number}'}
                                }
                            ]
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'container',
                            cls: 'size-15 bolder',
                            html: i18n.gettext('Previous month'),
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Sales amount'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder green-dark',
                                    bind: {html: '{mainData.period_past.selling:erpMoney}'}
                                }
                            ]
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Number of sales'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder green-dark',
                                    bind: {html: '{mainData.period_past.sell_number}'}
                                }
                            ]
                        },{
                            cls: 'border-top',
                            margin: '10 0',
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Purchases amount'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder blue',
                                    bind: {html: '{mainData.period_past.purchase:erpMoney}'}
                                }
                            ]
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Number of purchases'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder blue',
                                    bind: {html: '{mainData.period_past.buy_number}'}
                                }
                            ]
                        },{
                            cls: 'border-top',
                            margin: '10 0',
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Expenses amount'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder red',
                                    bind: {html: '{mainData.period_past.expense:erpMoney}'}
                                }
                            ]
                        },{
                            items: [
                                {
                                    html: i18n.gettext('Number of expenses'),
                                    margin: '0 15 0 0',
                                },{
                                    flex: 1,
                                    cls: 'text-right bolder red',
                                    bind: {html: '{mainData.period_past.exp_number}'}
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
