Ext.define('Erp.view.report.period.Head', {
    extend: 'Ext.Container',
    xtype: 'report_head',
    docked: 'top',
    items: [
        {
            xtype: 'head1',
            items: [
                {
                    xtype: 'label',
                    cls: 'title',
                    html: i18n.gettext('Report')
                },{
                    xtype: 'segmentedbutton',
                    reference: 'report_period_mode',
                    margin: '0 0 0 15',
                    defaults: {
                        ui: 'default',
                    },
                    bind: {
                        value: '{report_mode}'
                    },
                    items: [
                        {text: i18n.gettext('By month'), value: 'month'},
                        {text: i18n.gettext('By trimester'), value: 'trimester'},
                        {text: i18n.gettext('By year'), value: 'year'}
                    ]
                }
            ]
        },{
            xtype: 'container',
            margin: '0 0 15 0',
            items: [
                {
                    xtype: 'containerfield',
                    label: i18n.gettext('Choose year and period'),
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            margin: '0 15 0 0',
                            autoSelect: true,
                            forceSelection: true,
                            editable: false,
                            queryMode: 'local',
                            width: 100,
                            height: 34,
                            valueField: 'id',
                            displayField: 'id',
                            bind: {
                                value: '{filter_year}',
                                store: '{years_data}'
                            }
                        },{
                            xtype: 'segmentedbutton',
                            reference: 'report_period_month',
                            hidden: true,
                            defaults: {
                                ui: 'default',
                            },
                            bind: {
                                value: '{filter_month}',
                                hidden: '{report_mode != "month"}'
                            },
                            items: [
                                {tooltip: i18n.gettext('January'), text: i18n.gettext('Jan'), value: '01'},
                                {tooltip: i18n.gettext('February'), text: i18n.gettext('Feb'), value: '02'},
                                {tooltip: i18n.gettext('March'), text: i18n.gettext('Mar'), value: '03'},
                                {tooltip: i18n.gettext('April'), text: i18n.gettext('Apr'), value: '04'},
                                {tooltip: i18n.gettext('May'), text: i18n.gettext('May'), value: '05'},
                                {tooltip: i18n.gettext('June'), text: i18n.gettext('Jun'), value: '06'},
                                {tooltip: i18n.gettext('July'), text: i18n.gettext('Jul'), value: '07'},
                                {tooltip: i18n.gettext('August'), text: i18n.gettext('Aug'), value: '08'},
                                {tooltip: i18n.gettext('September'), text: i18n.gettext('Sep'), value: '09'},
                                {tooltip: i18n.gettext('October'), text: i18n.gettext('Oct'), value: '10'},
                                {tooltip: i18n.gettext('November'), text: i18n.gettext('Nov'), value: '11'},
                                {tooltip: i18n.gettext('December'), text: i18n.gettext('Dec'), value: '12'}
                            ]
                        },{
                            xtype: 'segmentedbutton',
                            reference: 'report_period_trimester',
                            hidden: true,
                            defaults: {
                                ui: 'default',
                            },
                            bind: {
                                value: '{filter_trimester}',
                                hidden: '{report_mode != "trimester"}'
                            },
                            items: [
                                {text: i18n.gettext('January - March'), value: '1'},
                                {text: i18n.gettext('April - June'), value: '2'},
                                {text: i18n.gettext('July - September'), value: '3'},
                                {text: i18n.gettext('October - December'), value: '4'}
                            ]
                        },{
                            xtype: 'container',
                            height: 34,
                            html: '&nbsp;'
                        }
                    ]
                }
            ]
        }
    ]
});