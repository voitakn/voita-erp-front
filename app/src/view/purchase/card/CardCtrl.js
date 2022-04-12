Ext.define('Erp.view.purchase.card.CardCtrl', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.purchase_card_ctrl',
	bindings: {
		onCardId: '{cardId}',
		loadInvoiceItems: '{show_invoice}'
	},
	onCardId(onCardId) {
		const vm = this.getViewModel();
		vm.set('supplier', {});
		//console.log('onCardId', onCardId);
		if (onCardId.length < 36) {
            Ext.util.History.back();
            //console.log('load history');
		}
		if (onCardId && onCardId.length === 36) {
			this.loadInvoice(onCardId);
            //console.log('load invoice');
        }
	},
	toBack(btn) {
		Ext.util.History.back();
	},
	loadInvoice(onCardId) {
		//console.log('loadInvoice', onCardId);
		const me = this;
		const vm = me.getViewModel();
		const workers_store = Ext.data.StoreManager.lookup('workersStore');
		const places_store = Ext.data.StoreManager.lookup('placesStore');
		Ext.Ajax.request({
			url: Api.inv.buy_list_month,
			jsonData: {"id": onCardId},
			method: "POST",
			success(resp, opt) {
				const result = Ext.JSON.decode(resp.responseText);
				Notice.showToast(result);
				if (result.success) {
					if (result.data && result.data.length > 0) {
						let invData = result.data[0];
						const record = workers_store.getById(invData.user_id);
						if (record) {
							invData.user_login = record.login || "";
							invData.user_data = record.params || {};
						} else {
							invData.user_login = User.data.login;
							invData.user_data = User.data.params || {};
						}
						invData.place_title =  places_store.getById(invData.place_id).data.title || "";
						vm.set('show_invoice', invData);
					}
				}
			},
			failure(resp, opt) {
				let result = Ext.JSON.decode(resp.responseText);
				Notice.showToast(result);
			}
		});
	},
	loadInvoiceItems(invoice) {
		const me = this;
		const vm = me.getViewModel();
		const store = vm.getStore('invoice_items_store');
		if(store){
			if(invoice.id) {
				store.load();
			} else {
				store.loadData([]);
			}
		}
	},
	onCloseInvoice(btn) {
		const tooltip = this.lookup('buy_edit_paid');
		tooltip.hide();
	},
	onEditPaid(btn){
		const vm = this.getViewModel();
		const tooltip = this.lookup('buy_edit_paid');
		vm.set('paid_params', {	paid: true});
		tooltip.setTarget(btn);
		tooltip.show();
		const form = tooltip.down('formpanel');
		form.validate();
	},
	savePaidParams(btn) {
		const me = this;
		const vm = me.getViewModel();
		const tooltip = this.lookup('buy_edit_paid');
		const paid_params = vm.get('paid_params');
		const invoice = vm.get('show_invoice');
		const form = tooltip.down('formpanel');
		const dateField = tooltip.down('datefield');
		if(form.validate()) {
			paid_params.paid_date = dateField.getFormattedValue('Y-m-d');
			paid_params.paid = true;
			paid_params.invoice_id = invoice.id;
			paid_params.period = invoice.period;
			invoice.paid = true;
			Ext.Ajax.request({
				url: Api.inv.buy_paid_save,
				method: 'POST',
				jsonData: paid_params,
				success: function(resp, opt) {
					const result = Ext.JSON.decode(resp.responseText);
					Notice.showToast(result);
					if(result.success) {
						if(result.data.paid_params) {
							invoice.paid_params = result.data.paid_params;
							vm.set('show_invoice', invoice);
						}
						tooltip.hide();
					}
				},
				failure:  function(resp, opt) {
					let result = Ext.JSON.decode(resp.responseText);
					Notice.showToast(result);
				}
			});

		} else {
			Notice.showToast({code_err: 'all.not_required'});
		}
	}
});