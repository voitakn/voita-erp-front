Ext.define('Erp.view.movement.add.AddCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.movement_add_ctrl',
    requires: [
        'Erp.common.DeleteConfirm',
        'Erp.util.Nominal',
        'Erp.util.receipt.Spain',
        'Erp.util.receipt.Portugal',
        'Erp.util.receipt.PrintInvoice',
        'Erp.util.receipt.PrintStick'
    ],
    bindings: {
        doSearch: '{filter.search}',
        onChangeBarcode: '{filter.barcode}',
        reloadProduceGrid: {
            catalog_id: '{filter.catalog_id}',
            from_place_id: '{filter.from_place_id}',
        },
        onChangeRetailType: '{retail_type}',
        catalogSell: '{catalog_selection}',
    },
    all_rendered: false,
    sell_stores: [],
    onViewRender() {
        const me = this;
        const vm = this.getViewModel();
        if (!me.all_rendered) {
            me.all_rendered = true;
        }
        vm.set('operator', `${User.data.params.name} ${User.data.params.surname}`);
        me.updatePosPlace();
    },
    onViewShow() {
        const me = this;
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
    reloadProduceGrid(filter) {
        const vm = this.getViewModel();
        const store = vm.getStore('select_produce_store');
        if(store) {
            store.currentPage = 1;
            store.load();
        }
    },
    doSearch(search) {
        if (!search || search.length === 0 || search.length > 2) {
            this.reloadProduceGrid();
        }
    },
    reloadBarcodeGrid() {
        const vm = this.getViewModel();
        vm.getStore('select_by_barcode_produce_store').load();
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
        const movement_add = me.lookup('movement_add');
        let store = vm.getStore('select_by_barcode_produce_store');
        let record = store.getAt(0);
        let store_length = store.data.length;
        if (store_length > 0) {
            if (record && record.isModel) {
                const amount_data = Ext.clone(record.getData());
                amount_data.amount = vm.get('quantity');
                vm.set('amount_data', amount_data);
                vm.set('amount_data.price', amount_data.price);
                movement_add.setMasked(true);
                me.addProdToOrderByBarcode();
                vm.set('quantity', 1);
                vm.set('new_quantity', '');
                movement_add.setMasked(false);
                return;
            }
        }
        me.focusBarcode();
    },
    addProdToOrderByBarcode() {
        const me = this;
        const vm = me.getViewModel();
        const items_store = vm.getStore('sell_items_store');
        const amount_data = vm.get('amount_data');
        const item_prod = items_store.getById(amount_data.id);
        if (item_prod && item_prod.isModel) {
            let amount = Number(item_prod.get('amount')) + Number(amount_data.amount);
            item_prod.set('amount', amount);
        } else {
            items_store.add(amount_data);
        }
        vm.set('quantity', 1);
        me.focusBarcode();
    },
    onProdSelected(grid, row) {
        const me = this;
        const vm = me.getViewModel();
        const record = row.record;
        if (record && record.isModel) {
            const amount_data = Ext.clone(record.getData());
            amount_data.amount = 1;
            vm.set('amount_data', amount_data);
            me.showAmount();
        }
    },
    showAmount() {
        const me = this;
        const modal = me.lookup('movement_add_amount');
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
        const modal = me.lookup('movement_add_amount');
        const items_store = vm.getStore('sell_items_store');
        const amount_data = vm.get('amount_data');
        vm.set('amount_data.price', amount_data.price);
        const item_prod = items_store.getById(amount_data.id);
        if (item_prod && item_prod.isModel) {
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
        if (record && record.isModel) {
            const amount_data = Ext.clone(record.getData());
            amount_data.amount = vm.get('quantity');
            vm.set('amount_data', amount_data);
        }
        me.addProdToOrderByBarcode();
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
            html: i18n.gettext('Do you want to clear all positions from the list?'),
        });
        tooltip.show();
    },
    trashBill(btn) {
        const me = this;
        const vm = me.getViewModel();
        const itemsStore = vm.getStore('sell_items_store');
        if (itemsStore.data.length > 0) {
            me.lookup('move_products_trash_confirm').show();
        } else {
            me.onTrashReceipt();
        }
    },
    onTrashReceipt(btn) {
        const me = this;
        me.removeItemsStores();
        me.lookup('move_products_trash_confirm').hide();
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
    showPrintDialog() {
        const me = this;
        const vm = me.getViewModel();
        const itemsStore = vm.getStore('sell_items_store');
        const operator = vm.get('operator');
        const comment = vm.get('comment');
        const boxes = vm.get('boxes');
        const from_place = {};
        const to_place = {};
        const invoiceData = {};
        let items = [];
        let printItems = [];
        Ext.Array.each(itemsStore.getRange(), (rec) => {
            const price = rec.get('price');
            items.push({
                id: rec.get('id'),
                price: price,
                amount: rec.get('amount'),
                tax_rate: rec.get('tax_rate')
            });
            printItems.push(rec.data);
        });
        from_place.from_place_id = vm.get('filter.from_place_id');
        from_place.title = vm.get('pos_market_place_from');
        from_place.address = vm.get('pos_market_place_from_address');
        from_place.phone = vm.get('pos_market_place_from_phone');
        from_place.postcode = vm.get('pos_market_place_from_postcode');
        from_place.city = vm.get('pos_market_place_from_city');
        to_place.to_place_id = vm.get('filter.to_place_id');
        to_place.title = vm.get('pos_market_place_to');
        to_place.address = vm.get('pos_market_place_to_address');
        to_place.phone = vm.get('pos_market_place_to_phone');
        to_place.postcode = vm.get('pos_market_place_to_postcode');
        to_place.city = vm.get('pos_market_place_to_city');
        invoiceData.company_name = User.data.customer.title;
        invoiceData.company_phone = User.data.customer.phone;
        invoiceData.company_tax = User.data.customer.configs.tax_number;
        invoiceData.company_postcode = User.data.customer.configs.postcode;
        invoiceData.company_city = User.data.customer.configs.city;
        invoiceData.company_address = User.data.customer.configs.address;
        invoiceData.items = printItems;
        invoiceData.from_place = from_place;
        invoiceData.to_place = to_place;
        invoiceData.date_create = Ext.Date.dateFormat(new Date(), 'Y-m-d H:i');
        invoiceData.operator = operator;
        invoiceData.comment = comment;
        invoiceData.bill_price_total = vm.get('bill_price_total');
        invoiceData.bill_products_total = vm.get('bill_products_total');
        invoiceData.boxes = boxes;
        invoiceData.logo = User.data.customer.configs.logo;
        vm.set('invoiceData', invoiceData);
        // me.lookup('print_dialog').show();

        if (from_place.from_place_id && to_place.to_place_id && from_place.from_place_id !== to_place.to_place_id) {
            Ext.Ajax.request({
                url: Api.inv.move_create,
                jsonData: {
                    from_place_id: from_place.from_place_id,
                    to_place_id: to_place.to_place_id,
                    boxes,
                    comment,
                    items,
                    from_place,
                    to_place,
                    operator,
                },
                method: "POST",
                success(resp, opt) {
                    const result = Ext.JSON.decode(resp.responseText);
                    if (result.success) {
                        //Notice.showToast(result);
                        result.data.doc_number = 'MI' + result.data.doc_number;
                        vm.set('result_data', result.data);
                        invoiceData.doc_number = result.data.doc_number;
                        me.lookup('print_dialog').show();

                    }
                },
                failure(resp, opt) {
                    const result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                },
            });
        }
    },
    printStickers() {
        const me = this;
        const vm = this.getViewModel();
        let data = {};
        let result_data = vm.get('result_data');
        data.barcode = result_data.doc_number;
        data.boxes = vm.get('boxes');
        ReceiptPrintStick.htmlRender(data);
    },
    printReceipt(invoiceData) {
        const me = this;
        const vm = this.getViewModel();
        invoiceData = vm.get('invoiceData');
        PrintInvoice.htmlRender(invoiceData);
    },
    onChangeRetailType() {
        this.focusBarcode();
    },
    catalogSell(catalog) {
        if (catalog && catalog.isModel) {
            this.getViewModel().set('filter.catalog_id', catalog.get('id'));
        } else {
            this.getViewModel().set('filter.catalog_id', null);
        }
    },
    onSelectStoreFrom() {
        const me = this;
        const vm = me.getViewModel();
        const move_products_from = me.lookup('move_products_from');
        const placeField = me.lookup('move_products_place_from_combobox');
        if (placeField && vm.get('edit.pos_market_place_from') === null) {
            placeField.setStore(User.placesStore);
            placeField.setValueNotFoundText('Not selected');
        }
        vm.set('edit.pos_market_place_from_address', vm.get('pos_market_place_from_address'));
        vm.set('edit.pos_market_place_from_phone', vm.get('pos_market_place_from_phone'));
        vm.set('edit.pos_market_place_from_postcode', vm.get('pos_market_place_from_postcode'));
        vm.set('edit.pos_market_place_from_city', vm.get('pos_market_place_from_city'));
        vm.set('edit.comment', vm.get('comment'));
        vm.set('edit.boxes', vm.get('boxes'));
        move_products_from.show();
    },
    onCancelPlaceFrom() {
        const me = this;
        const vm = this.getViewModel();
        const move_products_from = me.lookup('move_products_from');
        vm.set('config.from_place_id', null);
        move_products_from.hide();

    },
    onCancelPlaceTo() {
        const me = this;
        const vm = this.getViewModel();
        const move_products_to = me.lookup('move_products_to');
        vm.set('config.to_place_id', null);
        move_products_to.hide();

    },
    onSelectPlaceFrom(btn) {
        const me = this;
        const vm = this.getViewModel();
        const move_products_from = btn.up('move_products_from');
        const from_place_id = vm.get('config.from_place_id');
        vm.set('pos_market_place_from_address', vm.get('edit.pos_market_place_from_address'));
        vm.set('pos_market_place_from_phone', vm.get('edit.pos_market_place_from_phone'));
        vm.set('pos_market_place_from_postcode', vm.get('edit.pos_market_place_from_postcode'));
        vm.set('pos_market_place_from_city', vm.get('edit.pos_market_place_from_city'));
        vm.set('comment', vm.get('edit.comment'));
        vm.set('boxes', vm.get('edit.boxes'));
        vm.set('filter.from_place_id', from_place_id);
        vm.set('edit_from', false);
        me.updatePosPlace();
        // me.clearBill();
        move_products_from.hide();
        me.focusBarcode();
    },
    onSelectStoreTo() {
        const me = this;
        const vm = me.getViewModel();
        const move_products_to = me.lookup('move_products_to');
        const placeField = me.lookup('move_products_place_to_combobox');
        if (placeField && vm.get('edit.pos_market_place_to') === null) {
            placeField.setStore(User.placesStore);
            placeField.setValueNotFoundText('Not selected');
        }
        vm.set('edit.pos_market_place_to_address', vm.get('pos_market_place_to_address'));
        vm.set('edit.pos_market_place_to_phone', vm.get('pos_market_place_to_phone'));
        vm.set('edit.pos_market_place_to_postcode', vm.get('pos_market_place_to_postcode'));
        vm.set('edit.pos_market_place_to_city', vm.get('pos_market_place_to_city'));
        move_products_to.show();
    },
    onSelectPlaceTo(btn) {
        const me = this;
        const vm = this.getViewModel();
        const move_products_to = btn.up('move_products_to');
        const to_place_id = vm.get('config.to_place_id');
        vm.set('pos_market_place_to_address', vm.get('edit.pos_market_place_to_address'));
        vm.set('pos_market_place_to_phone', vm.get('edit.pos_market_place_to_phone'));
        vm.set('pos_market_place_to_postcode', vm.get('edit.pos_market_place_to_postcode'));
        vm.set('pos_market_place_to_city', vm.get('edit.pos_market_place_to_city'));
        vm.set('filter.to_place_id', to_place_id);
        vm.set('edit_to', false);
        me.updatePosPlace();
        move_products_to.hide();
        me.focusBarcode();
    },
    updatePosPlace() {
        const vm = this.getViewModel();
        const from_place_id = vm.get('filter.from_place_id');
        const to_place_id = vm.get('filter.to_place_id');
        const record_from = User.placesStore.getById(from_place_id);
        const record_to = User.placesStore.getById(to_place_id);
        if (record_from) {
            let record_from_params = record_from.data.params;
            vm.set('pos_market_place_from', record_from.get('title'));
            vm.set('pos_market_place_from_address', record_from_params.address || '');
            vm.set('pos_market_place_from_phone', record_from_params.phone || '');
            vm.set('pos_market_place_from_postcode', record_from_params.postcode || '');
            vm.set('pos_market_place_from_city', record_from_params.city || '');
        }
        if (record_from && vm.get('edit_from')) {
            let record_from_params = record_from.data.params;
            vm.set('edit.pos_market_place_from_address', record_from_params.address || '');
            vm.set('edit.pos_market_place_from_phone', record_from_params.phone || '');
            vm.set('edit.pos_market_place_from_postcode', record_from_params.postcode || '');
            vm.set('edit.pos_market_place_from_city', record_from_params.city || '');
        } else {
            vm.set('pos_market_place_from_address', vm.get('edit.pos_market_place_from_address'));
            vm.set('pos_market_place_from_phone', vm.get('edit.pos_market_place_from_phone'));
            vm.set('pos_market_place_from_postcode', vm.get('edit.pos_market_place_from_postcode'));
            vm.set('pos_market_place_from_city', vm.get('edit.pos_market_place_from_city'));
        }
        if (record_to) {
            let record_to_params = record_to.data.params;
            vm.set('pos_market_place_to', record_to.get('title'));
            vm.set('pos_market_place_to_address', record_to_params.address || '');
            vm.set('pos_market_place_to_phone', record_to_params.phone || '');
            vm.set('pos_market_place_to_postcode', record_to_params.postcode || '');
            vm.set('pos_market_place_to_city', record_to_params.city || '');
        }
        if (record_to && vm.get('edit_to')) {
            let record_to_params = record_to.data.params;
            vm.set('edit.pos_market_place_to_address', record_to_params.address || '');
            vm.set('edit.pos_market_place_to_phone', record_to_params.phone || '');
            vm.set('edit.pos_market_place_to_postcode', record_to_params.postcode || '');
            vm.set('edit.pos_market_place_to_city', record_to_params.city || '');
        } else {
            vm.set('pos_market_place_to_address', vm.get('edit.pos_market_place_to_address'));
            vm.set('pos_market_place_to_phone', vm.get('edit.pos_market_place_to_phone'));
            vm.set('pos_market_place_to_postcode', vm.get('edit.pos_market_place_to_postcode'));
            vm.set('pos_market_place_to_city', vm.get('edit.pos_market_place_to_city'));
        }
        if (!from_place_id) {
            vm.set('pos_market_place_from', 'Not selected');
            vm.set('pos_market_place_from_address', '');
            vm.set('pos_market_place_from_phone', '');
            vm.set('pos_market_place_from_postcode', '');
            vm.set('pos_market_place_from_city', '');
            vm.set('comment', '');
        }
        if (!to_place_id) {
            vm.set('pos_market_place_to', 'Not selected');
            vm.set('pos_market_place_to_address', '');
            vm.set('pos_market_place_to_phone', '');
            vm.set('pos_market_place_to_postcode', '');
            vm.set('pos_market_place_to_city', '');
        }
    },
    onSelectedFrom() {
        const me = this;
        const vm = this.getViewModel();
        const from_place_id = vm.get('config.from_place_id');
        vm.set('edit_from', true);
        vm.set('filter.from_place_id', from_place_id);
        me.updatePosPlace();
    },
    onSelectedTo() {
        const me = this;
        const vm = this.getViewModel();
        const to_place_id = vm.get('config.to_place_id');
        vm.set('edit_to', true);
        vm.set('filter.to_place_id', to_place_id);
        me.updatePosPlace();
    },
    resetPlaces(btn) {
        const me = this;
        const vm = this.getViewModel();
        vm.set('config.to_place_id', null);
        vm.set('config.from_place_id', null);
        vm.set('filter.from_place_id', null);
        vm.set('filter.to_place_id', null);
        vm.set('comment', '');
        vm.set('boxes', 1);
        vm.set('barcode_last', null);
        me.clearBill();
        me.updatePosPlace();
        vm.getStore('select_by_barcode_produce_store').loadData([]);
        btn.up('print_dialog').hide();
        // document.getElementById('table_hidden').remove();
    },
    toBack(btn) {
        Ext.util.History.back();
    }
});

