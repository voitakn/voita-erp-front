Ext.define('Erp.view.sell.retail.RetailCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.sellretail',
    requires: [
        'Erp.common.DeleteConfirm',
        'Erp.util.Nominal',
        'Erp.util.receipt.Spain',
        'Erp.util.receipt.Portugal'
    ],
    bindings: {
        doSearch: '{filter.search}',
        onPlaceChange: '{filter.place_id}',
        onChangeBarcode: '{filter.barcode}',
        reloadProduceGrid: '{filter.catalog_id}',
        reloadOnlyAmount: '{filter.only_amount}',
        onChangeRetailType: '{retail_type}',
        onChangeQuantity: '{quantity}',
    },
    all_rendered: false,
    onChangeQuantity(quantity) {
       //console.('onChangeQuantity', quantity);
    },
    onViewRender() {
        const me = this;
        const view = me.getView();
        const vm = me.getViewModel();
        const placeField = me.lookup('retail_place_combobox');
        const sell_retail = me.lookup('sell_retail_ctrl');
       //console.('onViewRender');
        sell_retail.setMasked(false);
        if (placeField) {
            placeField.setStore(User.placesStore);
            vm.set('filter.place_id', User.defStoreId);
        }
    },
    onViewShow() {
       //console.('onViewShow');
        this.focusBarcode();
    },
    onViewClick() {
       //console.('onViewClick');
        this.focusBarcode();
    },
    focusBarcode() {
        const vm = this.getViewModel();
        const barcode_field = this.lookup('find_barcode');
        barcode_field.focus();
        barcode_field.clearValue();
       //console.('focusBarcode', vm.get('filter.barcode'));
    },
    onPlaceChange(place_id) {
        const vm = this.getViewModel();
        vm.set('sell_data.place_id', place_id);
        this.focusBarcode();
    },
    reloadProduceGrid(catalog_id) {
        const vm = this.getViewModel();
        if (vm.get('filter.place_id')) {
            vm.getStore('select_produce_store').load();
        }
    },
    doSearch(search) {
        if (!search || search.length === 0 || search.length > 2) {
            this.reloadProduceGrid();
        }
    },
    reloadBarcodeGrid() {
       //console.('reloadBarcodeGrid()');
        const vm = this.getViewModel();
        if (vm.get('filter.place_id')) {
            vm.getStore('select_by_barcode_produce_store').load();
        }

    },
    onChangeBarcode(search_barcode) {
        const me = this;
        if (search_barcode.length > 2) {
            me.reloadBarcodeGrid();
            me.getViewModel().set('barcode_last', search_barcode);
        }
    },
    onChangeByBarcode(store) {
        const me = this;
        const vm = this.getViewModel();
        const sell_retail = me.lookup('sell_retail_ctrl');
        let record = store.getAt(0);
        let store_length = store.data.length;
       //console.('onChangeByBarcode()', record);
        if (store_length > 0) {
            if (record && record.isModel) {
                const amount_data = Ext.clone(record.getData());
                amount_data.amount = vm.get('quantity');
                vm.set('amount_data', amount_data);
                sell_retail.setMasked(true);
                me.addProdToOrderByBarcode();
                vm.set('quantity', 1);
                vm.set('new_quantity', '');
                vm.set('flow_digits', false);
                vm.set('digits', 0);
                sell_retail.setMasked(false);
                return;
            }
        }
        me.focusBarcode();
    },
    reloadOnlyAmount(only_amount) {
       //console.('reloadOnlyAmount', only_amount);
        this.reloadProduceGrid();
    },

    onProdSelected(grid, row) {
        const me = this;
        const vm = me.getViewModel();
        const items_store = vm.getStore('sell_items_store');
        const record = row.record;
        const target = row.event.target;
        // Запросим цену и ID
        if (record && record.isModel) {
            const price = record.get('price');
            const produce_id = record.get('id');
            const item_prod = items_store.getById(produce_id);

            const amount_data = Ext.clone(record.getData());
            amount_data.amount = 1;
            vm.set('amount_data', amount_data);
            me.showAmount(target);
        }
    },
    showAmount(target) {
        const me = this;
        const tooltip = me.lookup('sell_retail_amount');
        tooltip.setTarget(target);
        tooltip.show();
        const field = tooltip.down('spinnerfield');
        if (field) {
            field.focus();
        }
    },
    onCloseAmount() {
        const me = this;
        const vm = me.getViewModel();
        vm.set('amount_data', null);
        me.focusBarcode();
    },
    addProdToOrder(btn) {
        const me = this;
        const vm = me.getViewModel();
        const items_store = vm.getStore('sell_items_store');
        const tooltip = me.lookup('sell_retail_amount');
        const amount_data = vm.get('amount_data');
        const item_prod = items_store.getById(amount_data.id);
        if (item_prod && item_prod.isModel) {
            // Нашли товар в списке добавлям только количество
            let amount = item_prod.get('amount') + amount_data.amount;
            item_prod.set('amount', amount);
        } else {
            items_store.add(amount_data);
        }
        tooltip.hide();
        me.focusBarcode();
    },
    onProdSelectedByBarcode(grid, row) {
        const me = this;
        const vm = me.getViewModel();
        const record = row.record;
        // Запросим цену и ID
        if (record && record.isModel) {
            const amount_data = Ext.clone(record.getData());
            amount_data.amount = vm.get('quantity');
            vm.set('amount_data', amount_data);
        }
        me.addProdToOrderByBarcode();
    },
    addProdToOrderByBarcode() {
        const me = this;
        const vm = me.getViewModel();
        const items_store = vm.getStore('sell_items_store');
        const amount_data = vm.get('amount_data');
        const item_prod = items_store.getById(amount_data.id);
        if (item_prod && item_prod.isModel) {
            // Нашли товар в списке добавлям только количество
            let amount = item_prod.get('amount') + amount_data.amount;
            item_prod.set('amount', amount);
        } else {
            items_store.add(amount_data);
        }
        me.focusBarcode();
    },
    sellItemsChanged(store) {
        const me = this;
        const vm = me.getViewModel();
        let bill_amount_total = 0.00;
        let bill_price_total = 0.00;
        let bill_tax_total = 0.00;
        let bill_sale_total = 0.00;
        if(store){
            store.each(rec => {
                bill_amount_total += rec.get('amount');
                bill_price_total += rec.get('price_total');
                bill_tax_total += rec.get('tax_total');
                bill_sale_total += rec.get('sale_total');
            });
        }
        vm.set({
            bill_amount_total: bill_amount_total,
            bill_price_total: bill_price_total,
            bill_tax_total: bill_tax_total,
            bill_sale_total: bill_sale_total
        });
    },
    clearBill() {
        const store = this.getViewModel().getStore('sell_items_store');
        store.removeAll();
        this.focusBarcode();
    },
    cancelBill(btn) {
        const me = this;
        const tooltip = Ext.create('Erp.base.ToolTip', {
            target: btn,
            title: i18n.gettext('Attention'),
            align: 't50-b50',
            buttonAlign: 'center',
            buttons: {
                cancel: {
                    margin: '0 15 0 0',
                    iconCls: 'x-fa fa-times red',
                    text: i18n.gettext('Cancel'),
                    handler: (btn) => btn.up('base_tooltip').destroy()
                },
                ok: {
                    iconCls: 'x-fa fa-check green-dark',
                    text: i18n.gettext('Yes!'),
                    handler: (btn) => {
                        me.clearBill();
                        btn.up('base_tooltip').destroy();
                    }
                }
            },
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'container',
                            cls: 'size-16',
                            margin: '10',
                            html: i18n.gettext('Do you really want to delete all positions from the list?'),
                        }
                    ]
                }
            ]
        });
        tooltip.show();
    },
    deleteFromItems(grid, row){
        const store = this.getViewModel().getStore('sell_items_store');
        const confirm = Ext.create('Erp.common.DeleteConfirm', {
            target: row.event.target,
            listeners: {
                onConfirm: (tooltip) => {
                    store.remove(row.record);
                    tooltip.destroy();
                }
            }
        });
        confirm.show();
    },
    payByCard(btn) {
       //console.('payByCard');
        const me = this;
        const tooltip = me.lookup('sell_retail_paycard');
        tooltip.setTarget(btn);
        tooltip.show();
    },
    savePayCard(btn){
        const me = this;
        const vm = me.getViewModel();
        const tooltip = me.lookup('sell_retail_paycard');
        const form = tooltip.down('formpanel');
        if(form.validate()){
            vm.set('sell_data.pay_params', vm.get('pay_card'));
            me.saveSellInvoice();
        }
        me.focusBarcode();
    },

    onClosePayCard(btn) {
       //console.('onClosePaycard');
        const me = this;
        const vm = me.getViewModel();
        const tooltip = me.lookup('sell_retail_paycard');
        const form = tooltip.down('formpanel');
        form.reset();
        vm.set('sell_data.pay_params', {});
        vm.set('pay_card', {pay_success: false});
        me.focusBarcode();
    },

    saveSellInvoice(cash) {
        const me = this;
        const vm = me.getViewModel();
        let tooltip = me.lookup('sell_retail_paycard');
        const bills = me.lookup('common_bills_list');
        const itemsStore = vm.getStore('sell_items_store');
        //const itemsData = items_store.getData();
        const sell_data = vm.get('sell_data');
        let items = [];
        if(cash) {
            tooltip = me.lookup('sell_retail_paycash');
        }
        const places = User.places();
        if(places.length > 0) {
            sell_data.place_id = places[0].id;
        }
        const printItems = [];
        Ext.Array.each(itemsStore.getRange(), (rec)=>{
            let price = rec.get('price');
            items.push({
                id: rec.get('id'),
                price_id: price.id,
                amount: rec.get('amount'),
                tax_rate: rec.get('tax_rate')
            });
            printItems.push(rec.data);
        });
        sell_data.items = items;
        // Сохраняем продажу
        Ext.Ajax.request({
            url: Api.inv.sell_retail_create,
            jsonData: sell_data,
            method: "POST",
            success(resp, opt) {
               //console.('Api.inv.sell_retail_create->success', resp, opt);
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if(result.success) {
                    tooltip.hide();
                    vm.set('pay_card', {pay_success: false});
                    vm.set('pay_cash', {});
                    vm.set('sell_data.pay_params', {});
                    const invoiceData = result.data[0];
                    invoiceData.items = printItems;
                    me.printReceipt(invoiceData);
                }
            },
            failure(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });
    },

    payByCash(btn) {
       //console.('payByCash');
        const me = this;
        const vm = me.getViewModel();
        const tooltip = me.lookup('sell_retail_paycash');
        tooltip.setTarget(btn);
        tooltip.show();
    },
    savePayCash(view) {
        const me = this;
        const vm = me.getViewModel();
       //console.('savePayCash');
        const pay_cash = vm.get('pay_cash');
        pay_cash.pay_rest = Ext.util.Format.toFloat(pay_cash.nominal - pay_cash.price_total);
        pay_cash.pay_type = 'cash';
        vm.set('sell_data.pay_params', pay_cash);
        me.saveSellInvoice(true);
        me.focusBarcode();
    },

    onClosePaycash(btn) {
       //console.('onClosePaycash');
        const me = this;
        const vm = me.getViewModel();
        const tooltip = me.lookup('sell_retail_paycash');
        const form = tooltip.down('formpanel');
        form.reset();
        vm.set('sell_data.pay_params', {});
        vm.set('pay_cash', {});
        me.focusBarcode();
    },
    onChangeRetailType() {
        const me = this;
        me.focusBarcode();
    },
    onQuantityClear(el, input) {
       //console.('onQuantityClear');
        this.getViewModel().set('quantity', '1');
    },

});