Ext.define('Erp.view.price_monitor.PriceMonitorModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.price_monitor_vm',
    data: {
        filter: {
            place_id: null,
            by_date: new Date(),
        },
        countPrices: 0
    },
    stores: {
        last_prices_store: {
            extend: 'Erp.data.Store',
            model: 'Erp.model.PriceMonitor',
            autoLoad: false,
            autoSync: false,
            pageSize: 24,
            proxy: {
                type: 'erp_api',
                api: {
                    read: Api.price.last_prices,
                },
                extraParams: {
                    place_id: '{filter.place_id}',
                    date_price: '{filter.by_date}',
                }
            }
        }
    }
});
