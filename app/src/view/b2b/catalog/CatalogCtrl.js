Ext.define('Erp.view.b2b.catalog.CatalogCtrl', {
    extend: 'Erp.view.base.BaseCtrl',
    alias: 'controller.b2b_catalog_ctrl',
    requires: [
        'Erp.view.b2b.catalog.TreeList'
    ],
    bindings: {
        onCardId: '{cardId}',
        onCatalogRecord: '{catalogSelected}'
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
        if(cardId && cardId.length === 36) {
            const partnerKey = localStorage.getItem(cardId);
            if(!partnerKey) {
                Ext.Ajax.request({
                    url: Api.b2b.partner_connect,
                    jsonData: {
                        invite_id: cardId
                    },
                    method: "POST",
                    success(resp, opt) {
                        let result = Ext.JSON.decode(resp.responseText);
                        if(!result.success || !result.data.token) {
                            Notice.showToast(result);
                            return;
                        }
                        localStorage.setItem(cardId, result.data.token);
                        me.catalogInit(result.data.token);
                    },
                    failure(resp, opt) {
                        let result = Ext.JSON.decode(resp.responseText);
                        Notice.showToast(result);
                    },
                });
            } else {
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
