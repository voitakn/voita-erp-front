Ext.define('Erp.view.report.period.Charts', {
    extend: 'Ext.Container',
    xtype: 'report_charts',
    layout: 'fit',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Numeric3D',
        'Ext.chart.series.Bar3D'
    ],
    items: [
        {
            xtype: 'cartesian',
            shadow: 'true',
            reference: 'report_charts_chart',
            insetPadding: '10',
            interactions: ['itemhighlight'],
            animation: {
                duration: 200
            },
            bind: {
                store: '{charts_stat_store}',
            },
            captions: {
                title: i18n.gettext('Sales and purchases statistic')
            },
            legend: {
                type: 'sprite'
            },
            axes: [{
                //type: 'numeric3d',
                type: 'numeric',
                position: 'left',
                fields: ['sales', 'purchases'],
                minimum: 0,
                grid: true,
                renderer(axis, label, layoutContext) {
                    return Ext.util.Format.erpMoney(label);
                }
            }, {
                //type: 'category3d',
                type: 'category',
                position: 'bottom',
                fields: 'xdata'
            }],
            series: [{
                //type: 'bar3d',
                type: 'bar',
                stacked: false,
                title: [i18n.gettext('Sales'), i18n.gettext('Purchases')], //,
                yField: ['sales','purchases'],
                xField: 'xdata',
                colors: ['#006B34', '#982500'],
                label: {
                    field: ['sales', 'purchases'],
                    display: 'over',
                    fontWeight: 'bold',
                    renderer(val) {
                        return Number(val) > 0 ? Ext.util.Format.toFloat(val) : '';
                    }
                },
                highlight: {
                    opacity: 0.6
                },
                renderer(sprite, config, data, index){
                    let clr = '#982500';
                    if(sprite.getField() === 'sales') {
                        clr = '#006B34';
                    }
                    return {
                        fillStyle: clr,
                        opacity: 0.9,
                    };
                },
                tooltip: {
                    trackMouse: true,
                    showDelay: 0,
                    dismissDelay: 0,
                    hideDelay: 0,
                    renderer(tooltip, record, item) {
                        let val = record.get(item.field);
                        tooltip.setHtml('');
                        if(Number(val) > 0) {
                            tooltip.setHtml(`${i18n.gettext('Amount')}: ${Ext.util.Format.erpMoney(val)}`);
                        } else {
                            tooltip.setHtml(`${i18n.gettext('Amount')}: ${Ext.util.Format.erpMoney(0)}`);
                        }
                    }
                },
            }]
        }
    ]
});