Ext.define('Erp.view.payment.new_pos.OrderModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.payment_order_vm',
    data: {
        price: {
            month: 6.00,
            year: 62.60
        },
        order: {
            points_count: 1,
            pay_amount: 0.00,
            pay_interval: 'month'
        },
        orderFrame: {
            id: '',
            url: '',
            order_number: ''
        }
    },
    formulas: {
        order_amount: {
            bind: {
                points_count: '{order.points_count}',
                pay_interval: '{order.pay_interval}'
            },
            get(data) {
                const price = this.get('price');
                const amount = data.points_count * price[data.pay_interval];
               //console.('order_amount', amount);
                this.set('order.pay_amount', amount);
                return amount;
            }
        }
    }
});
