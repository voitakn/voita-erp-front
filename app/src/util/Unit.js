Ext.define('Erp.util.Unit', {
    alternateClassName: ['Unit'],
    singleton: true,
    EUR: {
        paper: '€',
        coin: 'cent',
        papers: [5, 10, 20, 50, 100, 200],
        coins: [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2]
    }
});
//'cash', 'card_visa', 'card_master', 'card_other', 'pay_pal'
