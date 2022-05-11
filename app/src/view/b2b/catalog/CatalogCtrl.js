Ext.define('Erp.view.b2b.catalog.CatalogCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.b2b_catalog_ctrl',
    requires: [
        'Erp.view.b2b.catalog.TreeList'
    ],
    bindings: {
        onCardId: '{cardId}',
        onCatalogRecord: '{catalogSelected}',
        // onSelectDataRec: '{dataview_rec}',
    },
    onViewShow() {
        const store = this.getViewModel().getStore('select_produce_store');
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
        } else {
            me.clearData();
        }
    },
    clearData() {
        this.lookup('b2b_catalog_tree_container').removeAll(true, true);
        this.getViewModel().getStore('select_produce_store').loadData([]);
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
                let amount = item_prod.get('amount') + item_data.amount;
                item_prod.set('amount', amount);
            } else {
                cart_items_store.add(item_data);
            }
            spinner.setValue(1);
        }
        // console.log('onSelectDataRec cart_items_store', cart_items_store);
    },
    toBack(btn) {
        Ext.util.History.back();
    },
    deselectCategory(btn) {
        this.lookup('b2b_catalog_treelist').setSelection(null);
    },
    onCatalogRecord(catalogRow) {
        // Todo here filter by catalog_id
        console.log('onCatalogRecord', catalogRow);
    }

});
