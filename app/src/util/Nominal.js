Ext.define('Erp.util.Nominal', {
    alternateClassName: ['Nominal'],
    singleton: true,
    EUR: {
        paper: '€',
        coin: 'cent',
        papers: [5, 10, 20, 50, 100, 200],
        coins: [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2]
    },
    USD: {
        paper: '$',
        coin: 'cent',
        papers: [1, 2, 5, 10, 20, 50, 100, 500],
        coins: [0.01, 0.05, 0.1, 0.25, 0.5, 1]
    },
    IND: {
        paper: '₹',
        coin: 'paisa',
        papers: [5, 10, 20, 50, 100, 200, 500, 2000],
        coins: [0.5, 1, 2, 5, 10, 20]
    },
    PLN: {
        paper: 'zł',
        coin: 'grosz',
        papers: [10, 20, 50, 100, 200, 500],
        coins: [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5]
    }
});
//'cash', 'card_visa', 'card_master', 'card_other', 'pay_pal'
