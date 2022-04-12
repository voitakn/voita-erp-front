Ext.define('Erp.view.sell.card.CardCtrl', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sell_card_ctrl',
	bindings: {
		onCardId: '{cardId}',
		loadInvoiceItems: '{show_invoice}'
	},
	onCardId(cardId) {
		//console.log('onCardId', cardId);
		const vm = this.getViewModel();
		if (!cardId || cardId.length !== 36) {
			vm.set('show_invoice', {});
		} else {
			this.loadInvoice(cardId);
		}
	},
	onViewHide() {
		const vm = this.getViewModel();
		vm.set('cardId', null);
	},
	toBack(btn) {
		Ext.util.History.back();
	},
	loadInvoice(onSellCardId) {
		//console.log('loadInvoice', onSellCardId);
		const me = this;
		const vm = this.getViewModel();
		const workers_store = Ext.data.StoreManager.lookup('workersStore');
		const places_store = Ext.data.StoreManager.lookup('placesStore');
		Ext.Ajax.request({
			url: Api.inv.sell_card_by_id,
			jsonData: {"id": onSellCardId},
			method: "POST",
			success: function (resp, opt) {
				const result = Ext.JSON.decode(resp.responseText);
				Notice.showToast(result);
				if (result.success) {
					if (result.data && result.data.length > 0) {
						const invData = result.data[0];
						const worker = workers_store.getById(invData.user_id) || {
							params: User.data.params,
							login: User.data.login
						};
						const place = places_store.getById(invData.place_id);
						// console.log('worker', worker);
						// console.log('place', place);
						invData.user_login = worker.login || "";
						invData.user_data = worker.params || {};
						invData.place_title = place.data.title || "";
						vm.set('show_invoice', invData);
						// console.log('show_invoice', invData);
					}
				}
			},
			failure: function (resp, opt) {
				let result = Ext.JSON.decode(resp.responseText);
				Notice.showToast(result);
			}
		});
	},
	loadInvoiceItems(invoice) {
		const me = this;
		const vm = me.getViewModel();
		const store = vm.getStore('sell_items_store');
		if(store){
			if(invoice.id) {
				store.load();
			} else {
				store.loadData([]);
			}
		}
	},
	onStoreChange(snd, store) {
		//console.log('onStoreChange', store);
		const vm = this.getViewModel();
		const invoice  = vm.get('show_invoice');
		this.loadInvoiceItems(invoice);
	},
	onReturnInvoice(btn) {
		const me = this;
		const tooltip = me.lookup('sell_card_return_invoice');
		tooltip.setTarget(btn);
		tooltip.show();
	},
	saveReturnSelling(btn) {
		const me = this;
		const vm = me.getViewModel();
		const tt = btn.up('sell_card_return_invoice');
		const form = tt.down('formpanel');
		if (form.validate()) {
			Ext.Ajax.request({
				url: Api.inv.sell_revert,
				jsonData: {
					invoice_id: vm.get('show_invoice.id'),
					comment: vm.get('bills_reason')
				},
				method: "POST",
				success(resp, opt) {
					const result = Ext.JSON.decode(resp.responseText);
					Notice.showToast(result);
					if (result.success) {
						tt.hide();
						vm.set('bills_reason', null);
					}
				},
				failure(resp, opt) {
					const result = Ext.JSON.decode(resp.responseText);
					Notice.showToast(result);
				},
			});
		}
	}
});