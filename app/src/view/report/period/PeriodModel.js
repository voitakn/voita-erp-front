Ext.define('Erp.view.report.period.PeriodModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.report_period_vm',
    data: {
        report_mode: 'month',
        filter_year: Number(Ext.Date.format(new Date(), 'Y')),
        filter_month: Ext.Date.format(new Date(), 'm'),
        filter_place_id: null,
        filter_trimester: Number(Ext.Date.format(new Date(), 'm')) < 4 ? '1' :
            Number(Ext.Date.format(new Date(), 'm')) < 7 ? '2' :
                Number(Ext.Date.format(new Date(), 'm')) < 10 ? '3' : '4',
        noneStat: {
            selling: {
                amount: 0.00, count: 0, tax: 0.00, net: 0.00
            },
            purchase: {
                amount: 0.00, count: 0, tax: 0.00, net: 0.00
            }
        },
        reportStat: {
            selling: {
                amount: 0.00, count: 0, tax: 0.00, net: 0.00
            },
            purchase: {
                amount: 0.00, count: 0, tax: 0.00, net: 0.00
            }
        }
    },
    stores: {
        charts_stat_store: {
            extend: 'Erp.data.Store',
            fields: ['xdata', 'sales', 'purchases'],
            autoLoad: false,
            autoSync: false,
            pageSize: 100,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.report.charts_stat,
                },
                extraParams: {
                    mode: '{report_mode}',
                    year: '{filter_year}',
                    month: '{filter_month}',
                    trimester: '{filter_trimester}',
                    place_id: '{filter_place_id}'
                }
            }
        }
    },
    formulas: {
        place_data(get) {
            return User.places();
        },
        years_data(get) {
            const startY = 2021;
            const lastY = Number(Ext.Date.format(new Date(), 'Y'));
            const years = [];
            if (lastY > startY) {
                for (let i=startY;i<=lastY;i++){
                    years.push({id: i});
                }
            } else {
                years.push({id: startY});
            }
            return years;
        }
    }
});
