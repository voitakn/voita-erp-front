Ext.define('Erp.view.purchase.buy.BuyCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.purchase_buy_ctrl',
    routes: {
        'purchase_buy': {action: 'onSupplierId'},
        'purchase_buy/:cardId': {action: 'onSupplierId'},
    },
    bindings: {
        doSearch: '{filter.search}',
        reloadProduceGrid: '{filter.catalog_id}',
        onSupplierId: '{cardId}'
    },
    onSupplierId(cardId) {
        const me = this;
        const vm = me.getViewModel();
        vm.set('buy_data.supplier_id', cardId);
    },
    doSearch(search) {
        if(!search || search.length === 0 || search.length > 2){
            this.reloadProduceGrid();
        }
    },
    reloadProduceGrid(catalog_id) {
        const vm = this.getViewModel();
        const store = vm.getStore('select_produce_store');
        store.load();
    },
    onViewRender() {
        const vm = this.getViewModel();
        // const placeField = this.lookup('purchase_buy_place_combobox');
        // if(placeField) {
        //     placeField.setStore(User.placesStore);
        // }
        //console.log('BuyCtrl.onViewRender');
        // const supplierId = vm.get('supplierId');
        // this.onSupplierId(supplierId);
    },
    afterViewShow() {
        const vm = this.getViewModel();
        let listPlaceId = Ext.clone(User.defStoreId);
        this.lookup('buy_invoice_form').validate();

        const listView = this.getView().up('navigationview').down('purchase_list');
        //console.log('BuyCtrl.afterViewShow', listView);
        if(listView) {
            const listVm = listView.getViewModel();
            //console.log('listVm', listVm);
            if(listVm) {
                const placeId = listVm.get('filter_place_id');
                //console.log('placeId', placeId, User.defStoreId);
                if(placeId && placeId.length === 36) {
                    listPlaceId = placeId;
                }
            }
        }
        vm.set('buy_data.place_id', listPlaceId);

    },
    initViewModel() {
        const vm = this.getViewModel();
        const taxes_store = vm.getStore('taxes_store');
        taxes_store.loadData(User.taxes());
        Ext.Ajax.request({
            url: Api.price.get_retail,
            method: "POST",
            jsonData: {},
            success: function(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                const data = result.data;
                const row = data[0];
                vm.set('price_retail', row);
            },
            failure:  function(resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });
    },
    onProdSelected(grid, row) {
        const vm = this.getViewModel();
        const record = row.record;
        const target = row.event.target;
        const tooltip = this.lookup('buy_edit_amount');
        vm.set('add_record', record.getData());
        tooltip.setTarget(target);
        tooltip.show();
        const form = tooltip.down('formpanel');
        const field = tooltip.down('numberfield');
        if (field) {
            field.focus();
        }
        form.validate();
        //console.log('onProdSelected', record, target);
    },
    addToInvoice(btn) {
        const vm = this.getViewModel();
        const tooltip = this.lookup('buy_edit_amount');
        const produceG = this.lookup('produce_select');
        const form = tooltip.down('formpanel');
        const store = vm.getStore('buy_items_store');
        const row = vm.get('add_record');
        const price_data = vm.get('price_data');
        if(form.validate()){
            store.add({
                id: row.id,
                title: row.title,
                barcode: row.barcode,
                amount: price_data.amount,
                price: price_data.price,
                tax_rate: row.tax_rate
            });
            tooltip.hide();
            vm.set('price_data', {});
            vm.set('add_record', null);
            produceG.getSelectable().deselectAll();
        }
        //console.log('addToInvoice', row, price_data);
    },

    addNewProduct(btn) {
        const me = this;
        const prodNew = me.lookup('buy_edit_produce');
        const form = prodNew.down('formpanel');
        prodNew.setTarget(btn);
        prodNew.show();
        const field = form.down('textfield');
        if (field) {
            field.focus();
        }
        form.validate();
    },

    addNewToInvoice(btn) {
        const vm = this.getViewModel();
        //console.log('addNewToInvoice', vm.get('price_retail'), vm.get('produce'));
        const prodT = this.lookup('buy_edit_produce');
        const form = prodT.down('formpanel');
        if(form.validate()) {
            const store = vm.getStore('buy_items_store');
            const produce = vm.get('produce');
            const retailP = vm.get('price_retail');
            store.add({
                title: produce.title,
                barcode: produce.barcode,
                vendor_code: produce.vendor_code,
                amount: produce.amount,
                price: produce.price,
                retail_id: retailP.cols_id,
                retail_price: produce.retail_price,
                tax_rate: produce.tax_rate
            });

            btn.up('buy_edit_produce').hide();
            vm.set('produce', {});
        }
    },

    editBuyItem(grid, row) {
        grid.getPlugin('rowedit').startEdit(row.record, 0);
    },
    onItemsChanged(store) {
        const vm = this.getViewModel();
        const invoice_total = store.sum('price_total');
        //console.log('onItemsChanged', store, invoice_total);
        vm.set('buy_data.invoice_total', invoice_total);

    },
    editorCancel: function(btn){
        btn.up('roweditor').cancel();
        this.lookup('purchase_buy_items').getStore().rejectChanges();
    },

    deleteFromItems(grid, row) {
        const store = this.getViewModel().getStore('buy_items_store');
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

    clearInvoice(btn) {
        const vm = this.getViewModel();
        const store = vm.getStore('buy_items_store');
        store.removeAll();
        vm.set('buy_data', {
            invoice_total: 0.00,
            paid_params: {
                type: null,
                doc_number: null
            }
        });
        vm.set('buy_doc_date', Ext.Date.dateFormat(new Date(), 'Y-m-d'));
    },

    saveInvoice(btn) {
        const me = this;
        const vm = this.getViewModel();
        const form = this.lookup('buy_invoice_form');
        const store = vm.getStore('buy_items_store');
        const storeSupp = vm.getStore('suppliers_store');
        const dateField = this.lookup('buy_date_field');

        const items = Ext.Array.from(store.getData().items).map((rec) => {
            return rec.data;
        });
        const buy_data = vm.get('buy_data');
        if(buy_data.supplier_id && buy_data.supplier_id.length === 36) {
            let suppRow = storeSupp.getById(buy_data.supplier_id);
            buy_data['supplier_title'] = suppRow.get('title');
        }

        if(form.validate() && items.length > 0) {
            buy_data.doc_date = dateField.getFormattedValue('Y-m-d');
            if(buy_data.paid) {
                buy_data.paid_params.date = Ext.Date.dateFormat(buy_data.paid_params_date, 'Y-m-d');
            }
            buy_data.items = items;

            //console.log('saveInvoice', buy_data);

            Ext.Ajax.request({
                url: Api.inv.buy_create,
                method: 'POST',
                jsonData: buy_data,
                success: function(resp, opt) {
                    const result = Ext.JSON.decode(resp.responseText);
                    if(result.success === true) {
                        Ext.create({
                            xtype: 'dialog',
                            weight: 300,
                            title: i18n.gettext('Successfully'),
                            html: `<b>${Notice.inv.buy_create.info}</b>`,
                            buttons: {
                                toCard: {
                                    text: i18n.gettext('Back to the list'),
                                    handler: (btn)=>{
                                        me.redirectTo('purchase_list');
                                        btn.up('dialog').destroy();
                                    }
                                },
                                toList: {
                                    margin: '0 0 0 10',
                                    text: i18n.gettext('New purchase'),
                                    handler: (btn)=>{
                                        btn.up('dialog').destroy();
                                    }
                                }
                            }
                        }).show();
                        me.clearInvoice();
                    } else {
                        Notice.showToast(result);
                    }
                },
                failure:  function(resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                },
            });

        } else {
            Notice.showToast({code_err: 'all.not_required'});
        }
    }
});