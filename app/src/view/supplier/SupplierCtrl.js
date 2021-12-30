Ext.define('Erp.view.supplier.SupplierCtrl', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.supplier_ctrl',
	routes: {
		'supplier': {action: 'onCardId'},
		'supplier/:cardId': {action: 'onCardId'},
	},
	bindings: {
		onCardId: '{cardId}',
		onTheCard: '{theCardView}',
		doSearch: '{filter_search}'
	},
	onViewRender() {
		const me = this;
		const vm = me.getViewModel();
	},
	onViewShow() {
		const me = this;
		const vm = me.getViewModel();
	},
	onTheCard(theCard) {
		const me = this;
		const vm = me.getViewModel();
			if (User.checkAccess('com.supplier_save') && theCard && theCard.isModel) {
				this.redirectTo('supplier/' + theCard.get('id'));
				vm.set('editCard', true);
			}
	},
	onCardId(cardId) {
		const me = this;
		const vm = me.getViewModel();
		const supplier_card = me.lookup('supplier_card');
		const itemsStore = vm.getStore('buy_list_supplier_store');
		if (cardId && cardId.length === 36) {
			const store = vm.getStore('suppliers_store');
			const record = store.getById(cardId);
			if (record) {
				supplier_card.setActiveItem(1);
			}
			vm.set('cardId', cardId);
			if(itemsStore) {
				itemsStore.load();
			}
		} else {
			supplier_card.setActiveItem(0);
			let grid = me.lookup('supplier_card_grid');
			grid.getSelectable().deselectAll();
		}
	},
	onLoadFirst(store) {
		const me = this;
		const vm = me.getViewModel();
		const cardId = vm.get('cardId');
		if(!me.supLoaded) {
			me.supLoaded = true;
			if(cardId && cardId.length === 36) {
				me.onCardId(cardId);
			}
		}
	},
	toList(btn) {
		const me = this;
		const vm = me.getViewModel();
		const supplierEdit = me.lookup('supplier_edit');
		supplierEdit.hide();
		vm.set('editCard', false);
		vm.set('cardId', null);
		let list = me.lookup('supplier_card_grid');
		list.getSelectable().deselectAll();
		vm.getStore('buy_list_supplier_store').loadData([]);
		me.redirectTo('supplier');
	},
	addNewSupplier(btn) {
		const me = this;
		const vm = me.getViewModel();
		const supplierNewTooltip = me.lookup('supplier_new');
		const field = supplierNewTooltip.down('textfield');
		const form = supplierNewTooltip.down('formpanel');
	//	vm.set('editCard', false);
		supplierNewTooltip.setTarget(btn);
		supplierNewTooltip.show();
		if (field) {
			field.focus();
		}
		form.validate();
	},
	onCancelNew(btn) {
		//console.log('onCancelNew');
		const me = this;
		const vm = this.getViewModel();
		vm.set('newSupplier', {invite: true});
	},
	onSaveNew(btn) {
		//console.log('onSaveNew');
		const me = this;
		const vm = this.getViewModel();
		//vm.set('newSupplier', {});
		const newSupplier = vm.get('newSupplier');
		const form = btn.up('formpanel');
		const supplierNewTooltip = me.lookup('supplier_new');
		const store = vm.getStore('suppliers_store');
		//const theCardNew = vm.get('theCardView');
		newSupplier.country_id = User.data.customer.country_id;
		const newSupSave = Ext.create('Erp.model.Supplier', newSupplier);
		
		if (form.validate() && newSupSave.isValid()) {
			newSupSave.save({
				callback(record, operation, success) {
					//console.log('onSave', success, record);
					if (success) {
						supplierNewTooltip.hide();
						store.add(record);
					}
				}
			});
		}
		//console.log('isValid', newSupSave.isValid());
	},
	onEditSupplier(btn) {
		const me = this;
		const vm = me.getViewModel();
		const editSupplier = me.lookup('supplier_edit');
		const theCardEdit = vm.get('theCardView');
		vm.set('theCardEdit', theCardEdit);
		theCardEdit.beginEdit();
		editSupplier.setTarget(btn);
		editSupplier.show();
	},
	onEditSupplierPen(grid, row) {
		//console.log('onEditSupplierPen', row);
		const me = this;
		const vm = me.getViewModel();
		const editSupplier = me.lookup('supplier_edit');
		editSupplier.setTarget(row.event.target);
		editSupplier.show();
		row.record.beginEdit();
		vm.set('theCardEdit', row.record);
	},
	onCancelEdit(btn) {
		//console.log('onCancelEdit');
		const me = this;
		const vm = this.getViewModel();
		const theCardEdit = vm.get('theCardEdit');
		theCardEdit.cancelEdit();
		vm.set('theCardEdit', {});
	},
	onSaveEdit(btn) {
		//console.log('onSaveEdit');
		const me = this;
		const vm = me.getViewModel();
		const supplierEdit = me.lookup('supplier_edit');
		const form = btn.up('formpanel');
		const theCardEdit = vm.get('theCardEdit');
		if (theCardEdit.modified) {
			if (form.isValid()) {
				theCardEdit.save({
					callback(record, operation, success) {
						//console.log('onSave', success, record);
						if (success) {
							supplierEdit.hide();
						}
					}
				});
			}
		} else {
			supplierEdit.hide();
		}
	},
	doSearch(search) {
		//console.log('doSearch', search);
		if (!search || search.length === 0 || search.length > 2) {
			if (this.all_rendered) {
				this.getViewModel().getStore('suppliers_store').load();
			} else {
				this.all_rendered = true;
			}
		}
	},
	addNewPurchase(btn) {
		const vm = this.getViewModel();
		const theCardView = vm.get('theCardView');
		if(theCardView && theCardView.isModel) {
			const supplierId = theCardView.get('id');
			if(supplierId && supplierId.length === 36) {
				this.redirectTo(`purchase_buy/${supplierId}`);
				return;
			}
		}
		this.redirectTo(`purchase_buy`);
	},
	onStoreChange(snd, store) {
		const vm = this.getViewModel();
		const cardId = vm.get('cardId');
		//console.log('onStoreChange', cardId)
		if(store && cardId && cardId.length === 36) {
			store.load();
		} else {
			store.loadData([], false);
		}
	}
});
