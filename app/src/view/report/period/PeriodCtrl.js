Ext.define('Erp.view.report.period.PeriodCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.report_period_ctrl',
    bindings: {
        onChangeMode: {
            mode: '{report_mode}',
            year: '{filter_year}',
            month: '{filter_month}',
            trimester: '{filter_trimester}',
            place_id: '{filter_place_id}'
        },
    },
    afterViewShow() {
        const me = this;

    },
    onViewRender() {
        const me = this;
        const vm = me.getViewModel();
    },
    onViewShow() {},
    onChangeMode(reportParams) {
        // console.log('onChangeMode', reportParams);
        const me = this;
        const vm = me.getViewModel();
        const chartsStore = vm.getStore('charts_stat_store');
        vm.set('reportStat', Ext.clone(vm.get('noneStat')));
        Ext.Ajax.request({
            url: Api.report.main_stat,
            jsonData: reportParams,
            method: "POST",
            success(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if(result.success) {
                    if(result.data && result.data.selling) {
                        vm.set('reportStat', result.data);
                    }
                }
            },
            failure(resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            }
        });
        chartsStore.load();
    }
});
