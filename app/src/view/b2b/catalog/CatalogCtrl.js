Ext.define('Erp.view.b2b.catalog.CatalogCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.b2b_catalog_ctrl',
    requires: [
        'Erp.view.b2b.catalog.TreeList'
    ],
    bindings: {
        onCardId: '{cardId}',
        onCatalogRecord: '{catalogSelected}',
        reloadStore: '{filter.catalog_id}',
    },
    onViewShow() {
        const store = this.getViewModel().getStore('market_produce_store');
        if (store) {
            store.loadPage(1);
        }
    },
    onViewHide(cmp) {
        this.getViewModel().set('cardId', null);
    },
    onCardId(cardId) {
        const me = this;
        const vm = me.getViewModel();
        if(cardId && cardId.length === 36) {
            const partnerKey = localStorage.getItem(cardId);
            vm.set('connId', cardId);
            if(!partnerKey) {
                Ext.Ajax.request({
                    url: Api.b2b.partner_token,
                    jsonData: {
                        invite_id: cardId
                    },
                    method: "POST",
                    success(resp, opt) {
                        let result = Ext.JSON.decode(resp.responseText);
                        if(!result.success || !result.data.token) {
                            Notice.showToast(result);
                            me.toBack();
                            return;
                        }
                        localStorage.setItem(cardId, result.data.token);
                        vm.set('partner', result.data.partner);
                        me.catalogInit(result.data.token);
                    },
                    failure(resp, opt) {
                        let result = Ext.JSON.decode(resp.responseText);
                        Notice.showToast(result);
                        me.toBack();
                    },
                });
            } else {
                Ext.Ajax.request({
                    url: Api.b2b.partner_data,
                    jsonData: {
                        invite_id: cardId
                    },
                    method: "POST",
                    success(resp, opt) {
                        let result = Ext.JSON.decode(resp.responseText);
                        if(!result.success || !result.data.partner) {
                            Notice.showToast(result);
                            me.toBack();
                            return;
                        }
                        vm.set('partner', result.data.partner);
                    },
                    failure(resp, opt) {
                        let result = Ext.JSON.decode(resp.responseText);
                        Notice.showToast(result);
                        me.toBack();
                    },
                });
                me.catalogInit(partnerKey);
            }
            me.reloadStore();
            let key = 'cart' + cardId;
            // if (!localStorage.getItem(key)) {
            //     vm.getStore('cart_items_store').loadData([]);
            // } else {
            //     vm.getStore('cart_items_store').loadData([localStorage.getItem(key)]);
            // }
        } else {
            me.clearData();
        }
    },
    clearData() {
        this.lookup('b2b_catalog_tree_container').removeAll(true, true);
        this.getViewModel().getStore('market_produce_store').loadData([]);
    },
    catalogInit(token) {
        const me = this;
        const vm = me.getViewModel();
        const tokenSplit = token.split('.');
        const tokenData = Ext.JSON.decode(atob(tokenSplit[1]));
        const container = me.lookup('b2b_catalog_tree_container');
        vm.set('tokenData', tokenData);
        container.add({
            xtype: 'b2b_catalog_treelist',
        });
        const treeStore = vm.getStore('b2bTreeCatalog');
        treeStore.load();
    },
    addProdToCart(btn) {
        const me = this;
        const vm = me.getViewModel();
        const record = btn.up('dataitem').getRecord();
        const cart_items_store = vm.getStore('cart_items_store');
        if (record && record.isModel) {
            const record_data = record.getData();
            const spinner = btn.up('container').down('spinnerfield');
            const item_data = Ext.clone(record_data);
            item_data.amount = spinner.getValue();
            const item_prod = cart_items_store.getById(item_data.id);
            if (item_prod && item_prod.isModel) {
                item_data.amount = item_prod.get('amount') + item_data.amount;
                item_prod.set('amount', item_data.amount);
            } else {
                cart_items_store.add(item_data);
            }
            Ext.Ajax.request({
                url: Api.markets.order_create,
                jsonData: {
                    connId: vm.get('cardId'),
                    item: {
                        barcode: item_data.barcode,
                        id: item_data.id,
                        price: item_data.price_total,
                        serv: item_data.serv,
                        tax_rate: item_data.tax_rate,
                        title: item_data.title,
                        unit_type: item_data.unit_type,
                        amount: item_data.amount,
                    }
                },
                method: "POST",
                success(resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    if(result.success || result.data) {
                        console.log('result data', result.data)
                    }
                },
                failure(resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                },
            });

            spinner.setValue(1);
        }
    },
    saveOrder() {
        const me = this;
        const vm = me.getViewModel();
        const cart_items_store = vm.getStore('cart_items_store');
        const items_data = cart_items_store.getRange();
        const items = [];
        console.log('data', items_data);
        items_data.forEach((el) => {
            console.log('el', el);
            let item = {
                serv: el.data.serv,
                title: el.data.title,
                price: el.data.prices.price,
                barcode: el.data.barcode,
                tax_rate: el.data.tax_rate,
                parent_id: el.data.parent_id,
                unit_type: el.data.unit_type,
                amount: el.data.amount,
                price_total: el.data.price_total,
            }
            items.push(item);
        })
        console.log('items', items);
        Ext.Ajax.request({
            url: Api.markets.order_save,
            jsonData: {
                connId: vm.get('cardId'),
                items
            },
            method: "POST",
            success(resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if(result.success || result.data) {
                    console.log('result data', result.data)
                }
            },
            failure(resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });

    },
    toBack(btn) {
        Ext.util.History.back();
    },
    deselectCategory(btn) {
        const me = this;
        const vm = me.getViewModel();
        this.lookup('b2b_catalog_treelist').setSelection(null);
        vm.set('filter.catalog_id', null);
    },
    reloadStore() {
        const me = this;
        const vm = me.getViewModel();
        const store = vm.getStore('market_produce_store');
        if (store) {
            store.loadPage(1);
        }
    },
    onCatalogRecord(record) {
        const me =this;
        const vm = me.getViewModel();
        if (record) {
            vm.set('filter.catalog_id', record.data.id);
        }
    },
    cartItemsChanged(store) {
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
            let key = 'cart' + vm.get('cardId');
            // localStorage.setItem(key, vm.get('cardId'));
            // localStorage.setItem(key, store.getRange());
        }
        vm.set({
            bill_amount_total: bill_amount_total,
            bill_price_total: bill_price_total,
            bill_tax_total: bill_tax_total,
            bill_sale_total: bill_sale_total,
            bill_products_total: bill_products_total
        });
    },
    onRemoveFromCart(btn, row) {
        const me = this;
        const store = this.getViewModel().getStore('cart_items_store');
        const record = btn.up('dataitem').getRecord();
        const confirm = Ext.create('Erp.common.DeleteConfirm', {
            target: row.event.target,
            listeners: {
                onConfirm(tooltip) {
                    store.remove(record);
                    tooltip.destroy();
                }
            }
        });
        confirm.show();
    },
});
