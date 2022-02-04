Ext.define('Erp.view.produce.ProduceCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.produce_ctrl',
    bindings: {
        onCardId: '{cardId}',
        loadHistory: '{history_mode}'
    },
    onViewRender() {
        const taxField = this.lookup('select_tax_rate');
        if(taxField) {
            taxField.setStore(User.taxesStore);
        }
    },
    onViewShow() {
        const me = this;
        const vm = me.getViewModel();
        const produce_tabs = me.lookup('produce_tabs');
        produce_tabs.setActiveItem(0);
        vm.set('extra', {
            tax_name: '',
            unit_name: ''
        });
    },
    onCardId(cardId) {
        // console.log('onCardId', cardId.length);
        const me = this;
        const vm = me.getViewModel();
        vm.getStore('produce_places_price_store').removeAll();
        if (cardId && cardId.length === 36) {
            me.loadProdCard(cardId, false);
        }
    },
    loadProdCard(cardId, doEdit) {
        // console.log('loadProdCard', cardId, doEdit);
        const me = this;
        const vm = me.getViewModel();
        Ext.Ajax.request({
            url: Api.com.produce_card,
            jsonData: {"id": cardId},
            method: "POST",
            success: function(resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if(result.success) {
                    if(result.data && result.data.length > 0) {
                        const cardData = result.data[0];
                        if (!cardData.catalog_id) {
                            cardData.catalog_id = null;
                        }
                        vm.set('theCardOrigin', cardData);
                        vm.set('theCard', Ext.clone(cardData));
                        vm.set('mainPrice', Ext.clone(cardData.main_price));
                        vm.set('theCardEdit', doEdit);
                        vm.set('theCard_catalog_id', cardData.catalog_id);
                        vm.set('catalogFilter', cardData.serv ? 'serv' : 'prod');
                        me.loadPlacesPrice();
                        // me.loadHistoryRetail();
                        if (!cardData.serv) {
                            me.loadPurchasePrice(cardId);
                        }
                        me.createBarcodeImg();
                        me.renderTaxUnit();
                    }
                }
            },
            failure: function (resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });
    },
    loadPurchasePrice(cardId) {
        // console.log('loadPurchasePrice', cardId);
        const me = this;
        const vm = me.getViewModel();
        Ext.Ajax.request({
            url: Api.price.produce_purchase,
            jsonData: {"produce_id": cardId},
            method: "POST",
            success: function (resp, opt) {
                const result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
                if (result.success) {
                    if (result.data) {
                        const cardData = result.data;
                        if (cardData.price) {
                            vm.set('purchasePrice', cardData);
                            // me.loadPriceRules();
                        } else {
                            vm.set('purchasePrice', {});
                            vm.getStore('rules_price_store').loadData([]);
                        }
                    }
                }
            },
            failure: function (resp, opt) {
                let result = Ext.JSON.decode(resp.responseText);
                Notice.showToast(result);
            },
        });
    },
    loadPlacesPrice() {
        const vm = this.getViewModel();
        const plc_price_store = vm.getStore('produce_places_price_store');
        plc_price_store.load();

    },
    loadPriceRules() {
        const vm = this.getViewModel();
        const rules_price_store = vm.getStore('rules_price_store');
        //console.('loadPlacesPrice', vm.get('price_places'));
        rules_price_store.loadPage(1);
    },
    onShowHistory() {
        this.getViewModel().set('history_mode', 'retail');
    },
    loadHistory() {
        const vm = this.getViewModel();
        vm.getStore('history_store').loadPage(1);
    },
    createBarcodeImg() {
        const me = this;
        const vm = this.getViewModel();
        const barcode = vm.get('theCard.barcode');
        if (barcode) {
            JsBarcode(".produce-barcode-img", barcode);
        }
    },
    renderTaxUnit() {
        const me = this;
        const vm = this.getViewModel();
        const tax = User.taxesStore.getById(vm.get('theCard.tax_rate'));
        const unit = Ext.data.StoreManager.lookup('unitStore').getById(vm.get('theCard.unit_type'));
        vm.set('extra.tax_name', tax.get('name'));
        vm.set('extra.unit_name', `${unit.get('name')} ${unit.get('abr')}`);
    },
    toCatalog(btn) {
        this.redirectTo('catalog');
    },
    toBack(btn) {
        Ext.util.History.back();
    },
    onEditProd(btn) {
        const me = this;
        const vm = this.getViewModel();
        const editTooltip = me.lookup('produce_edit_produce');
        const form = editTooltip.down('formpanel');
        vm.set('theCardEdit', true);
        editTooltip.setTarget(btn);
        editTooltip.show();
        form.validate();
    },
    onCancelEditProd(btn) {
        const me = this;
        const vm = this.getViewModel();
        const origin = vm.get('theCardOrigin');
        const editTooltip = me.lookup('produce_edit_produce');
        vm.set('theCard', Ext.clone(origin));
        vm.set('theCard_catalog_id', origin.catalog_id);
        vm.set('theCardEdit', false);
        editTooltip.hide();
    },
    onSaveProd(btn) {
        const me = this;
        const vm = me.getViewModel();
        const theCard = vm.get('theCard');
        const cardId = vm.get('cardId');
        const editTooltip = me.lookup('produce_edit_produce');
        const form = editTooltip.down('formpanel');
        if(form.validate()) {
            const saveCard = Ext.create('Erp.model.ProduceCard', theCard);
            saveCard.save({
                callback(record, operation, success){
                    if(success) {
                        vm.set('theCardOrigin', Ext.clone(theCard));
                        vm.set('theCard', Ext.clone(theCard));
                        vm.set('mainPrice', Ext.clone(theCard.main_price));
                        vm.set('theCardEdit', false);
                        me.loadProdCard(cardId);
                        editTooltip.hide();
                        me.createBarcodeImg();
                        me.renderTaxUnit();
                    }
                }
            });
        } else {
            Notice.showToast({success:false,code_err:"all.not_required"});
        }
    },
    editPlacePrice(grid, row) {
        //console.log('editPlacePrice', row.record);
        const me = this;
        const vm = me.getViewModel();
        const editor = me.lookup('produce_price_edit');
        vm.set('priceEdit', Ext.clone(row.record.data));
        vm.set('priceEditOrigin', row.record);
        editor.setTarget(row.event.target);
        editor.show();
    },
    cancelPosPriceEdit(btn) {
        //console.log('cancelPriceEdit');
        const vm = this.getViewModel();
        this.lookup('produce_price_edit').hide();
    },
    onClosePriceEdit() {
        //console.log('onClosePriceEdit');
        const vm = this.getViewModel();
        vm.set('priceEdit', false);
        vm.set('priceEditOrigin', false);
    },
    savePriceForPlace(btn) {
        const me = this;
        const vm = this.getViewModel();
        const priceEdit = vm.get('priceEdit');
        const priceEditOrigin = vm.get('priceEditOrigin');
        const priceTooltip = this.lookup('produce_price_edit');
        //console.log('savePriceForPlace', priceEdit);
        if (!priceEdit.price || !priceEdit.price_base || priceEdit.price < 0.01 || priceEdit.price_base < 0.01) {
            Notice.showToast({success:false,code_err:"price.retail_save.error_3"});
            return;
        }
        priceEditOrigin.set(priceEdit);
        priceEditOrigin.save({
            callback(record, operation, success){
                if(success) {
                    me.loadPlacesPrice();
                    priceTooltip.hide();
                }
            }
        });
    },
    onPricePlaceCalc(field) {
        const vm = this.getViewModel();
        const priceEdit = vm.get('priceEdit');
        if(Number(priceEdit.sale_percent ) > 0) {
            priceEdit.sale = priceEdit.sale_percent * priceEdit.price_base / 100;
        } else {
            priceEdit.sale = 0;
        }
        priceEdit.price = Number(priceEdit.price_base) - Number(priceEdit.sale);
        vm.set('priceEdit', priceEdit);
    },
    editMainPrice(btn) {
        //console.log('editMainPrice');
        const me = this;
        const vm = me.getViewModel();
        const priceTooltip = me.lookup('produce_edit_mainprice');
        const priceField = me.lookup('main_price_base_field');
        vm.set('editMainPrice', true);
        const old_price = vm.get('theCard.main_price');
        vm.set('main_price_origin', old_price);
        //console.log('old_main_price', old_price);
        priceTooltip.setTarget(btn);
        priceTooltip.show();
        priceField.focus();
    },
    saveMainPrice(btn) {
        const me = this;
        const vm = this.getViewModel();
        const mainPrice = vm.get('mainPrice');
        const theCardOrigin = vm.get('theCardOrigin');
        const theCard = vm.get('theCard');
        const priceTooltip = me.lookup('produce_edit_mainprice');
        const form = priceTooltip.down('formpanel');
        if(form.validate()) {
            Ext.Ajax.request({
                url: Api.price.retail_save,
                jsonData: mainPrice,
                method: "POST",
                success: function(resp, opt) {
                    const result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    if(result.success) {
                        if(result.data && result.data.id) {
                            theCardOrigin.main_price = mainPrice;
                            theCard.main_price = Ext.clone(mainPrice);
                            vm.set('theCardOrigin', theCardOrigin);
                            vm.set('theCard', theCard);
                            vm.set('editMainPrice', false);
                            priceTooltip.hide();
                            me.loadPlacesPrice();
                        }
                    }
                },
                failure:  function(resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                },
            });
        }
    },
    cancelMainPrice(btn) {
        //console.log('cancelMainPrice');
        const me = this;
        const vm = me.getViewModel();
        const origin = vm.get('theCardOrigin');
        const priceTooltip = me.lookup('produce_edit_mainprice');
        vm.set('mainPrice', Ext.clone(origin.main_price));
        vm.set('editMainPrice', false);
        priceTooltip.hide();
    },

    editPurchasePrice(btn) {
        // console.log('editPurchasePrice');
        const me = this;
        const vm = me.getViewModel();
        const priceTooltip = me.lookup('produce_edit_purchaseprice');
        const priceField = me.lookup('purchase_price_base_field');
        vm.set('editPurchasePrice', true);
        const old_price = vm.get('purchasePrice.price_base');
        console.log('editPurchasePrice purchasePrice.price_base', old_price);
        vm.set('purchase_price_origin', old_price);
        //console.log('old_purchase_price', old_price);
        priceTooltip.setTarget(btn);
        priceTooltip.show();
        priceField.focus();
    },

    cancelPurchasePrice(btn) {
        // console.log('cancelPurchasePrice');
        const me = this;
        const vm = me.getViewModel();
        const origin = vm.get('purchase_price_origin');
        console.log('cancelPurchasePrice purchase_price_origin', origin);
        const priceTooltip = me.lookup('produce_edit_purchaseprice');
        vm.set('purchasePrice.price_base', Ext.clone(origin));
        priceTooltip.hide();
    },

    savePurchasePrice(btn) {
        console.log('savePurchasePrice');
        const me = this;
        const vm = this.getViewModel();
        const purchasePrice = vm.get('purchasePrice');
        const cardId = vm.get('cardId');
        const purchase = {
            id: purchasePrice.id,
            price_base: purchasePrice.price_base,
            produce_id: cardId,
        };
        const priceTooltip = me.lookup('produce_edit_purchaseprice');
        const form = priceTooltip.down('formpanel');
        purchasePrice.produce_id = cardId;
        if (form.validate()) {
            Ext.Ajax.request({
                url: Api.price.purchase_save,
                jsonData: purchase,
                method: "POST",
                success: function (resp, opt) {
                    const result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    if (result.success) {
                        if (result.data && result.data.id) {
                            priceTooltip.hide();
                            me.loadPurchasePrice(cardId);
                        }
                    }
                },
                failure: function (resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                },
            });
        }

    },


    onCalcMainPriceSale(fld) {
        const vm = this.getViewModel();
        const mainPrice = vm.get('mainPrice');
        //console.('onCalcMainPriceSale', mainPrice);
        if (Number(mainPrice.sale_percent) > 0) {
            mainPrice.sale = Number(mainPrice.sale_percent) * mainPrice.price_base / 100;
        } else {
            mainPrice.sale = 0;
        }
        mainPrice.price = Number(mainPrice.price_base) - Number(mainPrice.sale);
        vm.set('mainPrice', mainPrice);
    },
    savePlacesPrices(fld, newVal, oldVal) {
        const vm = this.getViewModel();
        const cardId = vm.get('cardId');
        const theCardOrigin = vm.get('theCardOrigin');
        const theCard = vm.get('theCard');
        if (!!newVal !== !!theCardOrigin.params.places_prices) {
            fld.setDisabled(true);
            Ext.Ajax.request({
                url: Api.price.retail_places_onoff,
                jsonData: {
                    places_prices: newVal,
                    produce_id: cardId
                },
                method: "POST",
                success: function(resp, opt) {
                    const result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    if(result.success) {
                        if(result.data && result.data.id) {
                            theCardOrigin.params.places_prices = newVal;
                            theCard.params.places_prices = Ext.clone(newVal);
                            vm.set('theCardOrigin', theCardOrigin);
                            vm.set('theCard', theCard);
                        }
                    }
                    fld.setDisabled(false);
                },
                failure: function (resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    fld.setDisabled(false);
                },
            });
        }
    },
    onEdit(grid, row) {
        const me = this;
        const vm = me.getViewModel();
        const rules_edit = me.lookup('rules_edit');
        const recordData = row.record.data;
        rules_edit.setTarget(row.event.target);
        rules_edit.show();
        let editRules = {
            id: recordData.price_id,
            active: recordData.price_active,
            price_base: recordData.price,
            cols_id: recordData.id,
            produce_id: vm.get('cardId'),

        };
        vm.set('editRules', editRules);
        vm.set('editActiveRules', recordData.price_active);
    },
    onCancelEditRules(btn) {
        const me = this;
        const vm = this.getViewModel();
        const price_rules_edit = me.lookup('rules_edit');
        price_rules_edit.hide();
    },
    onSaveEdit(btn) {
        const me = this;
        const vm = me.getViewModel();
        const rules_edit = me.lookup('rules_edit');
        const form = me.lookup('rules_form');
        const editRules = vm.get('editRules');
        if (form.validate() && editRules !== vm.get('editActiveRules') && editRules.price_base !== 0) {
            if (!editRules.id) {
                editRules.id = '';
            }
            Ext.Ajax.request({
                url: Api.price.produce_cols_save,
                jsonData: editRules,
                method: "POST",
                success: function (resp, opt) {
                    const result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                    if (result.success) {
                        if (result.data && result.data.id) {
                            rules_edit.hide();
                            me.loadPriceRules();
                        }
                    }
                },
                failure: function (resp, opt) {
                    let result = Ext.JSON.decode(resp.responseText);
                    Notice.showToast(result);
                },
            });
        }
    },
    toRules(btn) {
        this.redirectTo('prices_rules');
    }
});
