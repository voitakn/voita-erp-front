Ext.define('Erp.view.report.period.Stat', {
    extend: 'Ext.Container',
    xtype: 'report_stat',
    layout: {
        type: 'hbox'
    },
    items: [
        {
            xtype: 'container',
            margin: '0 20 0 0',
            width: 220,
            items: [
                {
                    xtype: 'container',
                    margin: '10 0',
                    items: [
                        {
                            xtype: 'label',
                            cls: 'bolder size-16',
                            html: i18n.gettext('Main statistic')
                        }
                    ]
                },
                {
                    xtype: 'label',
                    cls: 'bolder size-14',
                    html: i18n.gettext('Point of sale')
                },
                {
                    xtype: 'combobox',
                    reference: 'report_period_pos_combobox',
                    autoSelect: true,
                    forceSelection: true,
                    editable: false,
                    clearable: true,
                    queryMode: 'local',
                    placeholder: i18n.gettext('All points of sale'),
                    valueField: 'id',
                    displayField: 'title',
                    store: {},
                    bind: {
                        value: '{filter_place_id}',
                        store: '{place_data}'
                    }
                }
            ]
        }, {
            xtype: 'container',
            margin: '0 20 0 0',
            items: [
                {
                    xtype: 'container',
                    cls: 'border-bottom',
                    items: [
                        {
                            xtype: 'label',
                            margin: '15 0 5 0',
                            cls: 'bolder size-15 green-dark',
                            html: i18n.gettext('Sales')
                        }
                    ]
                },{
                    xtype: 'containerfield',
                    label: `${i18n.gettext('Invoices number')}`,
                    labelWidth: 200,
                    labelAlign: 'left',
                    layout: {
                        type: 'hbox',pack: 'end', align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'green-dark bolder',
                            bind: {html: '{reportStat.selling.count}'}
                        }
                    ]
                },{
                    xtype: 'containerfield',
                    label: `${i18n.gettext('Net amount')}`,
                    labelWidth: 200,
                    labelAlign: 'left',
                    layout: {
                        type: 'hbox',pack: 'end', align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'green-dark bolder',
                            bind: {html: '{reportStat.selling.net:erpMoney}'}
                        }
                    ]
                },{
                    xtype: 'containerfield',
                    label: `${i18n.gettext('VAT amount')}`,
                    labelWidth: 200,
                    labelAlign: 'left bolder',
                    layout: {
                        type: 'hbox',pack: 'end', align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'green-dark bolder',
                            bind: {html: '{reportStat.selling.tax:erpMoney}'}
                        }
                    ]
                },{
                    xtype: 'containerfield',
                    label: `${i18n.gettext('Total amount')}`,
                    labelWidth: 200,
                    labelAlign: 'left',
                    layout: {
                        type: 'hbox',pack: 'end', align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'green-dark bolder size-16',
                            bind: {html: '{reportStat.selling.amount:erpMoney}'}
                        }
                    ]
                }
            ]
        },{
            xtype: 'container',
            margin: '0 20 0 0',
            items: [
                {
                    xtype: 'container',
                    cls: 'border-bottom',
                    items: [
                        {
                            xtype: 'label',
                            margin: '15 0 5 0',
                            cls: 'bolder size-15 red',
                            html: i18n.gettext('Purchases')
                        }
                    ]
                },{
                    xtype: 'containerfield',
                    label: `${i18n.gettext('Invoices number')}`,
                    labelWidth: 200,
                    labelAlign: 'left',
                    layout: {
                        type: 'hbox',pack: 'end', align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'red bolder',
                            bind: {html: '{reportStat.purchase.count}'}
                        }
                    ]
                },{
                    xtype: 'containerfield',
                    label: `${i18n.gettext('Net amount')}`,
                    labelWidth: 200,
                    labelAlign: 'left',
                    layout: {
                        type: 'hbox',pack: 'end', align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'red bolder',
                            bind: {html: '{reportStat.purchase.net:erpMoney}'}
                        }
                    ]
                },{
                    xtype: 'containerfield',
                    label: `${i18n.gettext('VAT amount')}`,
                    labelWidth: 200,
                    labelAlign: 'left',
                    layout: {
                        type: 'hbox',pack: 'end', align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'red bolder',
                            bind: {html: '{reportStat.purchase.tax:erpMoney}'}
                        }
                    ]
                },{
                    xtype: 'containerfield',
                    label: `${i18n.gettext('Total amount')}`,
                    labelWidth: 200,
                    labelAlign: 'left',
                    layout: {
                        type: 'hbox',pack: 'end', align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'red bolder size-16',
                            bind: {html: '{reportStat.purchase.amount:erpMoney}'}
                        }
                    ]
                }
            ]
        }
    ]
});