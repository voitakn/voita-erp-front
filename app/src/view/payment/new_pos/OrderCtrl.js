Ext.define('Erp.view.payment.new_pos.OrderCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.payment_order_ctrl',
    /*bindings: {
        onSelPoint: '{order.points_count}',
        onSelTariff: '{order.points_count}'
    },*/
    onViewRender() {
        const me = this;
    },
    onViewHide() {
        const me = this;
        me.renderOrderForm();
    },
    onViewShow() {
        const me = this;
        me.setActiveMenu('billing');
        me.getViewModel().set('order', {
            points_count: 1,
            pay_amount: 0.00,
            pay_interval: 'month',
            email: User.data.customer.email,
        });
    },
    onSelPoint(count) {
       //console.('onSelPoint', count, this.getViewModel().get('order'));
    },
    onSelTariff(tariff) {
       //console.('onSelTariff', tariff, this.getViewModel().get('order'));
    },
    byStoreTariff(btn) {
        const me = this;
        const vm = me.getViewModel();
        const order = vm.get('order');
        Ext.Ajax.request({
            url: '/api/order/payment_v1',
            jsonData: {
                points_count: order.points_count,
                pay_interval: 'month',
                product_type: 'POS',
                email: order.email,
                product_name: i18n.gettext('Subscription')
            },
            method: "POST",
            success: function(resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                if(result.data && result.data.length > 0){
                    vm.set('orderFrame', result.data[0]);
                    me.renderOrderFrame(result.data[0]);
                }
            },
            failure: function(resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });
    },
    renderOrderForm() {
        const me = this;
        const vm = me.getViewModel();
        const form = me.lookup('new_pos_form');
        const payCnt = me.lookup('new_pos_payment');
        const payIframeCnt = me.lookup('new_pos_iframe');
        form.show();
        payIframeCnt.removeAll();
        payCnt.hide();
        vm.set('orderFrame', {
            id: '',
            url: '',
            order_number: ''
        });
        vm.set('order', {
            points_count: 1,
            pay_amount: 0.00,
            pay_interval: 'month'
        });
    },
    renderOrderFrame(payData) {
        const me = this;
        const form = me.lookup('new_pos_form');
        const payCnt = me.lookup('new_pos_payment');
        const payIframeCnt = me.lookup('new_pos_iframe');
        form.hide();
        payIframeCnt.removeAll();
        payIframeCnt.setHtml(`<iframe src="${payData.url}" width="" height="" style="width:100%;height:100%;min-width:860px;min-height:640px;" frameborder="0"></iframe>`);
        payCnt.show();
    }
});
