Ext.define('Erp.view.sell.pos.PosCtrl', {
    extend: 'Erp.view.sell.Ctrl',
    alias: 'controller.pos_ctrl',
    requires: [
        'Erp.common.DeleteConfirm',
        'Erp.util.Nominal',
        'Erp.util.receipt.Spain',
        'Erp.util.receipt.Portugal'
    ],
    bindings: {
        doSearch: '{filter.search}',
        onPlaceChange: '{config_place_id}',
        onChangeBarcode: '{filter.barcode}',
        reloadProduceGrid: '{filter.catalog_id}',
        onChangeRetailType: '{retail_type}',
        catalogSell: '{catalog_selection}',
        reloadProduce: '{filter_catalog_id}'
    },
    all_rendered: false,
    sell_stores: [],
    onViewRender() {
       //console.('PosCtrl.onViewRender');
        const me = this;
        const vm = this.getViewModel();
        if(!me.all_rendered) {
            me.initSelling();
            me.all_rendered = true;
        }
    },
    onViewShow() {
       //console.('PosCtrl.onViewShow');
        const me = this;
        if(!User.checkPosMode()) {
            me.redirectTo('pos_sell');
        }
        if(me.all_rendered) {
            me.initSelling();
        }
        me.updatePosPlace();
        setTimeout(()=>{
            me.focusBarcode();
        }, 200);
    },
    initSelling() {
        const me = this;
        const vm = this.getViewModel();
        const posKey = localStorage.getItem('posKey');
        const posExp = localStorage.getItem('posExp');
        const placeField = me.lookup('pos_place_combobox');
        if (placeField) {
            placeField.setStore(User.placesStore);
        }
        if(!posKey ||
            posKey === '' ||
            (Math.floor((new Date()).getTime() / 1000) > Number(posExp))) {
            me.clearPosStorage();
            me.onStart();
            return;
        }
        me.startPosTimer();
    },
    startPosTimer() {
        const me = this;
        me.timeInterval = Ext.interval(me.posLastTime, 30000, me);
        me.posLastTime();
    },
    posLastTime() {
        const me = this;
        const vm = me.getViewModel();
        const tNow = new Date().getTime()/1000;
        const posExp = localStorage.getItem('posExp');
        if(Number(posExp) > 0) {
            const dt = new Date(0);
            const lastSec = Number(posExp) - tNow;
            dt.setSeconds(lastSec);
            vm.set('pos_last_time', dt.toISOString().substr(11, 5));

            if(lastSec < 300) { // 5 minutes
                vm.set('pos_last_time_bg', 'red-dark-bg');
            } else if(lastSec < 900) { // 15 minutes
                vm.set('pos_last_time_bg', 'orange-bg');
            } else { // More
                vm.set('pos_last_time_bg', 'green-dark-bg');
            }
        } else {
            Ext.uninterval(me.timeInterval);
        }
    },
    onViewHide() {
        this.getView().down('sell_pos_config').hide();
    },
    focusBarcode() {
        const barcode_field = this.lookup('find_barcode');
       //console.('focusBarcode', barcode_field);
        barcode_field.clearValue();
        barcode_field.focus();
    },
    onViewClick() {
       //console.('onViewClick');
        this.focusBarcode();
    },
    onStart() {
        const me = this;
        const vm = me.getViewModel();
        const sell_pos_config = me.lookup('sell_pos_config');
        vm.set('config_place_id', User.defStoreId);
        sell_pos_config.show();
    },
    onStartSell(btn) {
        const me = this;
        const vm = me.getViewModel();
        const sell_pos_config = btn.up('sell_pos_config');
        const cashField = me.lookup('pos_cash_combobox');
        const cashSrore = cashField.getStore();
        let cash_title = '';
        const cash_id = vm.get('filter.cash_register');
        if(cash_id && cash_id.length > 0) {
            const record = cashSrore.getById(cash_id);
            if(record) {
                cash_title = record.get('name');
            }
        }

        Ext.Ajax.request({
            url: Api.inv.cashopen_start,
            jsonData: {
                place_id: vm.get('config_place_id'),
                amount_start: vm.get('cash_amount'),
                hours: vm.get('filter.hours'),
                title: cash_title,
                cash_id: cash_id
            },
            method: "POST",
            success(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success) {
                    if(result.data) {
                        localStorage.setItem('posKey', result.data["posKey"]);
                        localStorage.setItem('posExp', result.data["posExp"]);
                        localStorage.setItem('posPlaceId', result.data["place_id"]);
                        localStorage.setItem('posCheckout', result.data["title"]);
                        sell_pos_config.hide();
                        me.updatePosPlace();
                        me.startPosTimer();
                    }
                }
            },
            failure(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                this.clearPosStorage();
                me.updatePosPlace();
            },
        });
        me.focusBarcode();
    },
    clearPosStorage() {
        const vm = this.getViewModel();
        localStorage.removeItem('posKey');
        localStorage.removeItem('posExp');
        localStorage.removeItem('posPlaceId');
        localStorage.removeItem('posCheckout');
        vm.set('pos_market_place', '');
        vm.set('pos_cash_register', '');
        vm.set('filter.place_id', null);
    },
    updatePosPlace() {
        const vm = this.getViewModel();
        const place_id = localStorage.getItem('posPlaceId');
        const checkout = localStorage.getItem('posCheckout');
        vm.set('pos_market_place', '');
        vm.set('pos_cash_register', '');
        vm.set('filter.place_id', null);
        if(place_id) {
            const record = User.placesStore.getById(place_id);
            if(record) {
                vm.set('pos_market_place', record.get('title'));
                vm.set('filter.place_id', place_id);
            }
        }
        if(checkout && checkout.length > 0) {
            vm.set('pos_cash_register', checkout);
        }
    },
    onPlaceChange(place_id) {
        const vm = this.getViewModel();
        const cashField = this.lookup('pos_cash_combobox');
        const placeRecord = User.placesStore.getById(place_id);
       //console.('onPlaceChange', place_id);
        if(placeRecord) {
            const checkouts = placeRecord.get('params').checkouts;
           //console.('checkouts', checkouts);
            if (cashField && checkouts && checkouts.length > 0) {
                cashField.setStore(checkouts);
                vm.set('filter.cash_register', checkouts[0].id);
                vm.set('sell_data.place_id', place_id);
                vm.set('check_checkout', true);
            } else {
                vm.set('check_checkout', false);
                vm.set('filter.cash_register', null);
            }
        }
    },
    reloadProduceGrid() {
        const vm = this.getViewModel();
        if (vm.get('filter.place_id')) {
            vm.getStore('select_produce_store').loadPage(1);
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
    onChangeByBarcode() {
        const me = this;
        const vm = this.getViewModel();
        const sell_pos = me.lookup('sell_pos');
        let store = vm.getStore('select_by_barcode_produce_store');
        let record = store.getAt(0);
        let store_length = store.data.length;
        if (store_length > 0) {
            if (record && record.isModel) {
                const amount_data = Ext.clone(record.getData());
                amount_data.amount = vm.get('quantity');
                vm.set('amount_data', amount_data);
                sell_pos.setMasked(true);
                me.addProdToOrderByBarcode();
                vm.set('quantity', 1);
                vm.set('new_quantity', '');
                sell_pos.setMasked(false);
                return;
            }
        }
        me.focusBarcode();
    },
    onProdSelected(grid, row) {
        const me = this;
        const vm = me.getViewModel();
        const record = row.record;
        // Запросим цену и ID
        if (record && record.isModel) {
            const amount_data = Ext.clone(record.getData());
            amount_data.amount = 1;
            vm.set('amount_data', amount_data);
            me.showAmount();
        }
    },
    showAmount() {
        const me = this;
        const modal = me.lookup('sell_pos_amount');
        modal.show();
        const field = modal.down('spinnerfield');
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
        const modal = me.lookup('sell_pos_amount');
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
        modal.hide();
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
            let amount = Number(item_prod.get('amount')) + Number(amount_data.amount);
            item_prod.set('amount', amount);
        } else {
            items_store.add(amount_data);
        }
        vm.set('quantity', 1);
        me.focusBarcode();
    },
    sellItemsChanged(store) {
        const me = this;
        const vm = me.getViewModel();
        let bill_amount_total = 0.00;
        let bill_price_total = 0.00;
        let bill_tax_total = 0.00;
        let bill_sale_total = 0.00;
        let bill_products_total = 0;
        if (store) {
            store.each(rec => {
                bill_amount_total += rec.get('amount');
                bill_price_total += rec.get('price_total');
                bill_tax_total += rec.get('tax_total');
                bill_sale_total += rec.get('sale_total');
                bill_products_total++;
            });
        }
        vm.set({
            bill_amount_total: bill_amount_total,
            bill_price_total: bill_price_total,
            bill_tax_total: bill_tax_total,
            bill_sale_total: bill_sale_total,
            bill_products_total: bill_products_total
        });
    },
    clearBill() {
        const me = this;
        const store = this.getViewModel().getStore('sell_items_store');
        store.removeAll();
        me.focusBarcode();
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
    trashBill(btn) {
        const me = this;
        const vm = me.getViewModel();
        const itemsStore = vm.getStore('sell_items_store');
        if(itemsStore.data.length > 0) {
            me.lookup('sell_pos_trash_confirm').show();
        } else {
            me.onTrashReceipt();
        }
    },
    onTrashReceipt(btn) {
        const me = this;
        me.removeItemsStores();
        me.lookup('sell_pos_trash_confirm').hide();
    },
    deleteFromItems(grid, row) {
        const me = this;
        const store = this.getViewModel().getStore('sell_items_store');
        const confirm = Ext.create('Erp.common.DeleteConfirm', {
            target: row.event.target,
            listeners: {
                onConfirm: (tooltip) => {
                    store.remove(row.record);
                    tooltip.destroy();
                    me.focusBarcode();
                }
            }
        });
        confirm.show();
    },
    payByCard(btn) {
       //console.('payByCard');
        const me = this;
        const modal = me.lookup('sell_pos_paycard');
        modal.show();
    },
    savePayCard(btn) {
        const me = this;
        const vm = me.getViewModel();
        const modal = me.lookup('sell_pos_paycard');
        const form = modal.down('formpanel');
        if (form.validate()) {
            let pay_card = vm.get('pay_card');
            vm.set('sell_data.pay_params', vm.get('pay_card'));
            pay_card.pay_type = 'card';
            me.saveSellInvoice();
        }
        me.focusBarcode();
    },
    onClosePayCard(btn) {
       //console.('onClosePaycard');
        const me = this;
        const vm = me.getViewModel();
        const modal = me.lookup('sell_pos_paycard');
        const form = modal.down('formpanel');
        form.reset();
        vm.set('sell_data.pay_params', {});
        vm.set('pay_card', {pay_success: false});
        me.focusBarcode();
    },
    saveSellInvoice(cash) {
        const me = this;
        const vm = me.getViewModel();
        let modal = me.lookup('sell_pos_paycard');
        const itemsStore = vm.getStore('sell_items_store');
        const sell_data = vm.get('sell_data');
        const posKey = localStorage.getItem('posKey');
        const posExp = localStorage.getItem('posExp');

        if(!posKey ||
            posKey === '' ||
            (Math.floor((new Date()).getTime() / 1000) > Number(posExp))) {
            me.clearPosStorage();
            me.onStart();
            return;
        }

        let items = [];
        if (cash) {
            modal = me.lookup('sell_pos_paycash');
        }
        const printItems = [];
        Ext.Array.each(itemsStore.getRange(), (rec) => {
            let price = rec.get('price');
            items.push({
                id: rec.get('id'),
                price_id: price.id,
                amount: rec.get('amount'),
                tax_rate: rec.get('tax_rate')
            });
            printItems.push(rec.data);
        })
        sell_data.items = items;
       //console.('saveSellInvoice', Api.inv.create_pos_sell);
        // Сохраняем продажу
        Ext.Ajax.request({
            url: Api.inv.create_pos_sell,
            jsonData: sell_data,
            method: "POST",
            headers: {
                "PosAuthorization": `Bearer ${posKey}`
            },
            success(resp, opt) {
               //console.('Api.inv.create_pos_sell->success', resp, opt);
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success) {
                    modal.hide();
                    vm.set('pay_card', {pay_success: false});
                    vm.set('pay_cash', {});
                    vm.set('sell_data.pay_params', {});
                    const invoiceData = result.data[0];
                    invoiceData.items = printItems;
                    me.printReceipt(invoiceData);
                    return;
                }
                me.clearPosStorage();
                me.onStart();
            },
            failure(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                me.clearPosStorage();
                me.onStart();
            },
        });
    },
    payByCash(btn) {
       //console.('payByCash');
        const me = this;
        const modal = me.lookup('sell_pos_paycash');
        modal.show();
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
        const modal = me.lookup('sell_pos_paycash');
        const form = modal.down('formpanel');
        form.reset();
        vm.set('sell_data.pay_params', {});
        vm.set('pay_cash', {});
        me.focusBarcode();
    },
    onChangeRetailType() {
       //console.('onChangeRetailType');
        this.focusBarcode();
    },
    catalogSell(catalog){
       //console.('catalogSell', catalog);
        if(catalog && catalog.isModel){
            this.getViewModel().set('filter.catalog_id', catalog.get('id'));
        } else {
            this.getViewModel().set('filter.catalog_id', null);
        }
    },
    reloadProduce(filter_catalog_id){
       //console.('reloadProduce', filter_catalog_id);
        if(this.all_rendered) {
            this.getViewModel().getStore('select_produce_store').load();
        } else {
            this.all_rendered = true;
        }
    },
    prevSell() {
       //console.('prevSell');
        const me = this;
        const vm = me.getViewModel();
        let bill_sell_current = vm.get('bill_sell_current');
        me.saveCurrentStore(bill_sell_current);
        if (bill_sell_current > 1) {
            bill_sell_current--;
            vm.set('bill_sell_current', bill_sell_current);
            vm.set('prev_button', false);
        } else {
            bill_sell_current = 1;
        }
        me.loadStore();
        me.checkDisableButton();
    },
    nextSell() {
       //console.('nextSell');
        const me = this;
        const vm = me.getViewModel();
        let bill_sell_current = vm.get('bill_sell_current');
        me.saveCurrentStore(bill_sell_current);
        let bill_sell_total = vm.get('bill_sell_total');
        if (bill_sell_current < bill_sell_total) {
            bill_sell_current++;
            vm.set('bill_sell_current', bill_sell_current)
            vm.set('next_button', false);
        } else {
            bill_sell_current = bill_sell_total;
        }
        vm.set('bill_sell_current', bill_sell_current);
        me.loadStore();
        me.checkDisableButton();
    },
    addItemsStores() {
       //console.('addItemsStores');
        const me = this;
        const vm = me.getViewModel();
        let bill_sell_current = vm.get('bill_sell_current');
        me.saveCurrentStore(bill_sell_current);
        const items_store = vm.getStore('sell_items_store');
        const data_store = items_store.getRange();
        me.sell_stores.push(data_store);
        vm.set('bill_sell_total', vm.get('bill_sell_total') + 1);
        vm.set('bill_sell_current', vm.get('bill_sell_total'));
        items_store.loadData([]);
        me.checkDisableButton();
    },
    saveCurrentStore(bill_sell_current) {
       //console.('saveCurrentStore');
        const me = this;
        const vm = me.getViewModel();
        const items_store = vm.getStore('sell_items_store');
        me.sell_stores[bill_sell_current - 1] = items_store.getRange();
    },
    loadStore() {
       //console.('loadCurrentStore');
        const me = this;
        const vm = me.getViewModel();
        let store = vm.getStore('sell_items_store');
        let bill_sell_current = vm.get('bill_sell_current') - 1;
        let sell_store_current = me.sell_stores[bill_sell_current];
       //console.('bill_sell_current', bill_sell_current);
        if(sell_store_current && sell_store_current.length > 0) {
            store.loadData(sell_store_current);
        } else {
            store.loadData([]);
        }
        me.checkDisableButton();
    },
    checkDisableButton() {
        const me = this;
        const vm = me.getViewModel();
        if (vm.get('bill_sell_current') > 1) {
            vm.set('prev_button', false);
           //console.('prev_button', false);
        } else {
            vm.set('prev_button', true);
        }
        if (vm.get('bill_sell_current') < vm.get('bill_sell_total')) {
            vm.set('next_button', false);
           //console.('next_button', false);
        } else {
            vm.set('next_button', true);
        }
    },
    removeItemsStores() {
       //console.('removeItemsStores');
        const me = this;
        const vm = me.getViewModel();
        let bill_sell_current = vm.get('bill_sell_current');
        if(me.sell_stores.length > 1)
        {
            me.sell_stores = Ext.Array.remove(me.sell_stores, me.sell_stores[bill_sell_current - 1]);
        } else {
            me.sell_stores[0] = [];
        }
        vm.set('bill_sell_total', me.sell_stores.length);
        if (bill_sell_current > 1) {
            vm.set('bill_sell_current', bill_sell_current - 1);
        } else {
            vm.set('bill_sell_current', 1);
        }
        me.loadStore();
    },
    onPosSellExit(btn) {
        this.redirectTo('sell_bills');
    },
    openFinishDialog(btn) {
        const me = this;
        const vm = me.getViewModel();
        const posKey = localStorage.getItem('posKey');
        const posExp = localStorage.getItem('posExp');
        const dialog = me.lookup('pos_dialog_finish');

        if(!posKey ||
            posKey === '' ||
            (Math.floor((new Date()).getTime() / 1000) > Number(posExp))) {
            me.clearPosStorage();
            me.onStart();
            return;
        }

        Ext.Ajax.request({
            url: Api.inv.cashopen_status,
            headers: {
                "PosAuthorization": `Bearer ${posKey}`
            },
            jsonData: {data: 1},
            method: "POST",
            success(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success) {
                    if(result.data) {
                        vm.set('checkout_amount_end', result.data.amount_end);
                        dialog.show();
                        return;
                    }
                }
                me.clearPosStorage();
                me.onStart();
            },
            failure(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });
    },
    sendFinishRequest(btn) {
        const me = this;
        const vm = me.getViewModel();
        const posKey = localStorage.getItem('posKey');
        const posExp = localStorage.getItem('posExp');
        const dialog = me.lookup('pos_dialog_finish');
        if(!posKey ||
            posKey === '' ||
            (Math.floor((new Date()).getTime() / 1000) > Number(posExp))) {
            me.clearPosStorage();
            me.onStart();
            return;
        }
        Ext.Ajax.request({
            url: Api.inv.cashopen_stop,
            headers: {
                "PosAuthorization": `Bearer ${posKey}`
            },
            jsonData: {data: 1},
            method: "POST",
            success(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success) {
                    vm.set('checkout_amount_end', 0);
                    dialog.hide();
                    me.clearPosStorage();
                    me.onPosSellExit();
                }
            },
            failure(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });
    },
    deselectCategory(btn) {
        const me = this;
        const tree = me.lookup('pos_catalog_tree');
        tree.getSelectable().deselectAll();
    }
});

