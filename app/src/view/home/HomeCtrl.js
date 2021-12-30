Ext.define('Erp.view.home.HomeCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.home_desktop_ctrl',
    bindings: {
        onChangeDatePurchases: {
            dayFrom: '{filter_day_from_purchases}',
            dayTo: '{filter_day_to_purchases}',
        },
        onChangePeriodPurchases: {
            month: '{filter_period_purchases}',
        },
        onChangeDateSales: {
            dayFrom: '{filter_day_from_sales}',
            dayTo: '{filter_day_to_sales}',
        },
        onChangePeriodSales: {
            month: '{filter_period_sales}',
        },
        onChangeDateExpenses: {
            dayFrom: '{filter_day_from_expenses}',
            dayTo: '{filter_day_to_expenses}',
        },
        onChangePeriodExpenses: {
            month: '{filter_period_expenses}',
        },
    
    },
    onViewRender() {
        //console.log('onViewRender');
        const me = this;
        const vm = me.getViewModel();
        const store = vm.getStore('purchases');
    
    },
    onAxisLabelRender: function(axis, label) {
        return Ext.util.Format.number(label, '0.000,00/i');
    },
    onChangePeriodPurchases() {
        const me = this;
        const vm = me.getViewModel();
        const filterDaysFromPurchases = me.lookup('filter_days_from_purchases');
        const filterDaysToPurchases = me.lookup('filter_days_to_purchases');
        let filterDayToPurchases = '';
        let filterDayFromPurchases = '';
        if (vm.get('filter_period_purchases') === 1) {
            filterDayToPurchases = Ext.Date.format(new Date(), 'd M Y');
            filterDayFromPurchases = Ext.Date.format(new Date(new Date().getTime() - (7*24*3600000)), 'd M Y');
            this.onConsoleLogPurchases(filterDayFromPurchases, filterDayToPurchases);
        }
        if (vm.get('filter_period_purchases') === 2) {
            filterDayToPurchases = Ext.Date.format(new Date(), 'd M Y');
            filterDayFromPurchases = Ext.Date.format(new Date(new Date().setDate(1)), 'd M Y');
            this.onConsoleLogPurchases(filterDayFromPurchases, filterDayToPurchases);
        }
        if (vm.get('filter_period_purchases') === 3) {
            filterDayToPurchases = Ext.Date.format(new Date(), 'd M Y');
            filterDayFromPurchases = Ext.Date.format(new Date(new Date().getTime() - (30*24*3600000)), 'd M Y');
            this.onConsoleLogPurchases(filterDayFromPurchases, filterDayToPurchases);
        }
        if (vm.get('filter_period_purchases') === 4) {
            filterDaysFromPurchases.setHidden(false)
            filterDaysToPurchases.setHidden(false)
        } else {
            filterDaysFromPurchases.setHidden(true)
            filterDaysToPurchases.setHidden(true)
        }
        
       //console.log('onChangePeriodPurchases id = ', vm.get('filter_period_purchases'));
    },
    changeDateFromPurchases(field) {
        const me = this;
        const vm = me.getViewModel();
        let filterDayFromPurchases = field.getFormattedValue();
        vm.set('filter_day_from_purchases', filterDayFromPurchases);
        //console.log('changeDateFromPurchases filterDayFromPurchases = ', filterDayFromPurchases);
    
    },
    changeDateToPurchases(field) {
        const me = this;
        const vm = me.getViewModel();
        let filterDayToPurchases = field.getFormattedValue();
        vm.set('filter_day_to_purchases', filterDayToPurchases);
        //console.log('changeDateToPurchases filterDayToPurchases', vm.get('filter_day_to_purchases'));
    
    },
    onChangeDatePurchases() {
        const me = this;
        const vm = me.getViewModel();
    
        //console.log('onChangeDatePurchases');
    
    },
    onConsoleLogPurchases(filterDayFromPurchases, filterDayToPurchases) {
        const me = this;
        const vm = me.getViewModel();
        vm.set('filter_day_from_purchases', filterDayFromPurchases);
        vm.set('filter_day_to_purchases', filterDayToPurchases);
        //console.log('changeDateFromPurchases filterDayFromPurchases = ', filterDayFromPurchases);
        //console.log('changeDateFromPurchases filterDayToPurchases = ', filterDayToPurchases);
    
    },
    onChangePeriodSales() {
        const me = this;
        const vm = me.getViewModel();
        const filterDaysFromSales = me.lookup('filter_days_from_sales');
        const filterDaysToSales = me.lookup('filter_days_to_sales');
        let filterDayToSales = '';
        let filterDayFromSales = '';
        if (vm.get('filter_period_sales') === 1) {
            filterDayToSales = Ext.Date.format(new Date(), 'd M Y');
            filterDayFromSales = Ext.Date.format(new Date(new Date().getTime() - (7*24*3600000)), 'd M Y');
            this.onConsoleLogSales(filterDayFromSales, filterDayToSales);
        }
        if (vm.get('filter_period_sales') === 2) {
            filterDayToSales = Ext.Date.format(new Date(), 'd M Y');
            filterDayFromSales = Ext.Date.format(new Date(new Date().setDate(1)), 'd M Y');
            this.onConsoleLogSales(filterDayFromSales, filterDayToSales);
        }
        if (vm.get('filter_period_sales') === 3) {
            filterDayToSales = Ext.Date.format(new Date(), 'd M Y');
            filterDayFromSales = Ext.Date.format(new Date(new Date().getTime() - (30*24*3600000)), 'd M Y');
            this.onConsoleLogSales(filterDayFromSales, filterDayToSales);
        }
        if (vm.get('filter_period_sales') === 4) {
            filterDaysFromSales.setHidden(false)
            filterDaysToSales.setHidden(false)
        } else {
            filterDaysFromSales.setHidden(true)
            filterDaysToSales.setHidden(true)
        }
        
        //console.log('onChangePeriodSales id = ', vm.get('filter_period_sales'));
    },
    changeDateFromSales(field) {
        const me = this;
        const vm = me.getViewModel();
        let filterDayFromSales = field.getFormattedValue();
        vm.set('filter_day_from_sales', filterDayFromSales);
        //console.log('changeDateFromSales filterDayFromSales = ', filterDayFromSales);
    },
    changeDateToSales(field) {
        const me = this;
        const vm = me.getViewModel();
        let filterDayToSales = field.getFormattedValue();
        vm.set('filter_day_to_sales', filterDayToSales);
        //console.log('changeDateToSales filterDayToSales', vm.get('filter_day_to_sales'));
        
    },
    onChangeDateSales() {
        const me = this;
        const vm = me.getViewModel();
        
        //console.log('onChangeDateSales');
        
    },
    onConsoleLogSales(filterDayFromSales, filterDayToSales) {
        const me = this;
        const vm = me.getViewModel();
        vm.set('filter_day_from_sales', filterDayFromSales);
        vm.set('filter_day_to_sales', filterDayToSales);
        //console.log('changeDateFromSales filterDayFromSales = ', filterDayFromSales);
        //console.log('changeDateFromSales filterDayToSales = ', filterDayToSales);
        
    },
    onChangePeriodExpenses() {
        const me = this;
        const vm = me.getViewModel();
        const filterDaysFromExpenses = me.lookup('filter_days_from_expenses');
        const filterDaysToExpenses = me.lookup('filter_days_to_expenses');
        let filterDayToExpenses = '';
        let filterDayFromExpenses = '';
        if (vm.get('filter_period_expenses') === 1) {
            filterDayToExpenses = Ext.Date.format(new Date(), 'd M Y');
            filterDayFromExpenses = Ext.Date.format(new Date(new Date().getTime() - (7*24*3600000)), 'd M Y');
            this.onConsoleLogExpenses(filterDayFromExpenses, filterDayToExpenses);
        }
        if (vm.get('filter_period_expenses') === 2) {
            filterDayToExpenses = Ext.Date.format(new Date(), 'd M Y');
            filterDayFromExpenses = Ext.Date.format(new Date(new Date().setDate(1)), 'd M Y');
            this.onConsoleLogExpenses(filterDayFromExpenses, filterDayToExpenses);
        }
        if (vm.get('filter_period_expenses') === 3) {
            filterDayToExpenses = Ext.Date.format(new Date(), 'd M Y');
            filterDayFromExpenses = Ext.Date.format(new Date(new Date().getTime() - (30*24*3600000)), 'd M Y');
            this.onConsoleLogExpenses(filterDayFromExpenses, filterDayToExpenses);
        }
        if (vm.get('filter_period_expenses') === 4) {
            filterDaysFromExpenses.setHidden(false)
            filterDaysToExpenses.setHidden(false)
        } else {
            filterDaysFromExpenses.setHidden(true)
            filterDaysToExpenses.setHidden(true)
        }
        
        //console.log('onChangePeriodExpenses id = ', vm.get('filter_period_expenses'));
    },
    changeDateFromExpenses(field) {
        const me = this;
        const vm = me.getViewModel();
        let filterDayFromExpenses = field.getFormattedValue();
        vm.set('filter_day_from_expenses', filterDayFromExpenses);
        //console.log('changeDateFromExpenses filterDayFromExpenses = ', filterDayFromExpenses);
        
    },
    changeDateToExpenses(field) {
        const me = this;
        const vm = me.getViewModel();
        let filterDayToExpenses = field.getFormattedValue();
        vm.set('filter_day_to_expenses', filterDayToExpenses);
        //console.log('changeDateToExpenses filterDayToExpenses', vm.get('filter_day_to_expenses'));
        
    },
    onChangeDateExpenses() {
        const me = this;
        const vm = me.getViewModel();
        
        //console.log('onChangeDateExpenses');
        
    },
    onConsoleLogExpenses(filterDayFromExpenses, filterDayToExpenses) {
        const me = this;
        const vm = me.getViewModel();
        vm.set('filter_day_from_expenses', filterDayFromExpenses);
        vm.set('filter_day_to_expenses', filterDayToExpenses);
        //console.log('changeDateFromExpenses filterDayFromExpenses = ', filterDayFromExpenses);
        //console.log('changeDateFromExpenses filterDayToExpenses = ', filterDayToExpenses);
        
    },
    
});
