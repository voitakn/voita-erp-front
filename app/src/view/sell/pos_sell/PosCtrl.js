Ext.define('Erp.view.sell.pos_sell.PosCtrl', {
    extend: 'Erp.view.sell.Ctrl',
    alias: 'controller.pos_sell_ctrl',
    requires: [
        'Erp.common.DeleteConfirm',
        'Erp.util.Nominal',
        'Erp.util.receipt.Spain',
        'Erp.util.receipt.Portugal'
    ],
    bindings: {
        doSearch: '{filter.search}',
        onChangeBarcode: '{filter.barcode}',
        reloadProduceGrid: {
            catalog_id: '{filter.catalog_id}',
            place_id: '{filter.place_id}'
        },
        onChangeRetailType: '{retail_type}',
        catalogSell: '{catalog_selection}',
        reloadProduce: '{filter_catalog_id}'
    },
    all_rendered: false,
    sell_stores: [],
    onViewRender() {
        const me = this;
        const vm = this.getViewModel();
        if (!me.all_rendered) {
            me.all_rendered = true;
        }
        vm.set('filter.place_id', User.defStoreId);
        me.updatePosPlace();
    },
    onViewShow() {
        const me = this;
        if(User.checkPosMode()) {
            me.redirectTo('sell_pos');
        }
        me.updatePosPlace();
        setTimeout(() => {
            me.focusBarcode();
        }, 200);
    },
    focusBarcode() {
        const barcode_field = this.lookup('find_barcode');
        barcode_field.clearValue();
        barcode_field.focus();
    },
    onViewClick() {
        this.focusBarcode();
    },
    onSelectStore() {
        const me = this;
        const vm = me.getViewModel();
        const pos_sell_config = me.lookup('pos_sell_config');
        const placeField = me.lookup('pos_sell_place_combobox');
        if (placeField) {
            placeField.setStore(User.placesStore);
        }
        vm.set('config.place_id', vm.get('filter.place_id'));
        pos_sell_config.show();
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
        const pos_sell = me.lookup('pos_sell');
        let store = vm.getStore('select_by_barcode_produce_store');
        let record = store.getAt(0);
        let store_length = store.data.length;
        if (store_length > 0) {
            if (record && record.isModel) {
                const amount_data = Ext.clone(record.getData());
                amount_data.amount = vm.get('quantity');
                vm.set('amount_data', amount_data);
                pos_sell.setMasked(true);
                me.addProdToOrderByBarcode();
                vm.set('quantity', 1);
                vm.set('new_quantity', '');
                pos_sell.setMasked(false);
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
        const modal = me.lookup('pos_sell_amount');
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
        const modal = me.lookup('pos_sell_amount');
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
        /*const tooltip = Ext.create('Erp.base.ToolTip', {
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
            html: i18n.gettext('Do you want to clear all positions from the list?'),
        });
        tooltip.show();*/

        const confirm = Ext.create('Erp.common.DeleteConfirm', {
            target: btn,
            viewModel: {
                data: {
                    message: i18n.gettext('Do you want to clear all positions from the list?')
                }
            },
            listeners: {
                onConfirm(tooltip) {
                    me.clearBill();
                    tooltip.destroy();
                    me.focusBarcode();
                }
            }
        });
        confirm.show();
    },
    trashBill(btn) {
        const me = this;
        const vm = me.getViewModel();
        const itemsStore = vm.getStore('sell_items_store');
        if (itemsStore.data.length > 0) {
            me.lookup('pos_sell_trash_confirm').show();
        } else {
            me.onTrashReceipt();
        }
    },
    onTrashReceipt(btn) {
        const me = this;
        me.removeItemsStores();
        me.lookup('pos_sell_trash_confirm').hide();
    },
    deleteFromItems(grid, row) {
        const me = this;
        const store = this.getViewModel().getStore('sell_items_store');
        const confirm = Ext.create('Erp.common.DeleteConfirm', {
            target: row.event.target,
            listeners: {
                onConfirm(tooltip) {
                    store.remove(row.record);
                    tooltip.destroy();
                    me.focusBarcode();
                }
            }
        });
        confirm.show();
    },
    payByCard(btn) {
        const me = this;
        const modal = me.lookup('pos_sell_paycard');
        modal.show();
    },
    savePayCard(btn) {
        const me = this;
        const vm = me.getViewModel();
        const modal = me.lookup('pos_sell_paycard');
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
        const me = this;
        const vm = me.getViewModel();
        const modal = me.lookup('pos_sell_paycard');
        const form = modal.down('formpanel');
        form.reset();
        vm.set('sell_data.pay_params', {});
        vm.set('pay_card', {pay_success: false});
        me.focusBarcode();
    },
    saveSellInvoice(cash) {
        const me = this;
        const vm = me.getViewModel();
        let modal = me.lookup('pos_sell_paycard');
        const itemsStore = vm.getStore('sell_items_store');
        const sell_data = vm.get('sell_data');
        let items = [];
        if (cash) {
            modal = me.lookup('pos_sell_paycash');
        }
        const place_id = vm.get('filter.place_id');
        if (place_id) {
            sell_data.place_id = place_id;
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
       //console.('saveSellInvoice', Api.inv.sell_retail_create);
        // Сохраняем продажу
        Ext.Ajax.request({
            url: Api.inv.sell_retail_create,
            jsonData: sell_data,
            method: "POST",
            success(resp, opt) {
               //console.('Api.inv.sell_retail_create->success', resp, opt);
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
            },
            failure(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });
    },
    payByCash(btn) {
        const me = this;
        const modal = me.lookup('pos_sell_paycash');
        modal.show();
    },
    savePayCash(view) {
        const me = this;
        const vm = me.getViewModel();
        const pay_cash = vm.get('pay_cash');
        pay_cash.pay_rest = Ext.util.Format.toFloat(pay_cash.nominal - pay_cash.price_total);
        pay_cash.pay_type = 'cash';
        vm.set('sell_data.pay_params', pay_cash);
        me.saveSellInvoice(true);
        me.focusBarcode();
    },
    onClosePaycash(btn) {
        const me = this;
        const vm = me.getViewModel();
        const modal = me.lookup('pos_sell_paycash');
        const form = modal.down('formpanel');
        form.reset();
        vm.set('sell_data.pay_params', {});
        vm.set('pay_cash', {});
        me.focusBarcode();
    },
    onChangeRetailType() {
        this.focusBarcode();
    },
    catalogSell(catalog) {
       //console.('catalogSell', catalog);
        if (catalog && catalog.isModel) {
            this.getViewModel().set('filter.catalog_id', catalog.get('id'));
        } else {
            this.getViewModel().set('filter.catalog_id', null);
        }
    },
    reloadProduce(filter_catalog_id) {
        if (this.all_rendered) {
            this.getViewModel().getStore('select_produce_store').load();
        } else {
            this.all_rendered = true;
        }
    },
    prevSell() {
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
        const me = this;
        const vm = me.getViewModel();
        const items_store = vm.getStore('sell_items_store');
        me.sell_stores[bill_sell_current - 1] = items_store.getRange();
    },
    loadStore() {
        const me = this;
        const vm = me.getViewModel();
        let store = vm.getStore('sell_items_store');
        let bill_sell_current = vm.get('bill_sell_current') - 1;
        let sell_store_current = me.sell_stores[bill_sell_current];
        if (sell_store_current && sell_store_current.length > 0) {
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
        } else {
            vm.set('prev_button', true);
        }
        if (vm.get('bill_sell_current') < vm.get('bill_sell_total')) {
            vm.set('next_button', false);
        } else {
            vm.set('next_button', true);
        }
    },
    removeItemsStores() {
        const me = this;
        const vm = me.getViewModel();
        let bill_sell_current = vm.get('bill_sell_current');
        if (me.sell_stores.length > 1) {
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
    onStartSell(btn) {
        const me = this;
        const vm = this.getViewModel();
        const pos_sell_config = btn.up('pos_sell_config');
        const place_id = vm.get('config.place_id');
        vm.set('filter.place_id', place_id);
        vm.set('sell_data.place_id', place_id);
        me.updatePosPlace();
        pos_sell_config.hide();
        me.focusBarcode();
    },
    updatePosPlace() {
        const vm = this.getViewModel();
        const place_id = vm.get('filter.place_id');
        const record = User.placesStore.getById(place_id);
        if (record) {
            vm.set('pos_market_place', record.get('title'));
        }
    },
    onPlaceChange(place_id) {
        const vm = this.getViewModel();
        vm.set('sell_data.place_id', place_id);
        vm.set('filter.place_id', place_id);
    },
    deselectCategory(btn) {
        const me = this;
        const tree = me.lookup('pos_sell_catalog_tree');
        tree.getSelectable().deselectAll();
    }
});

